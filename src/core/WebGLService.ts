import {Md5} from 'md5-typescript';

interface WebGLResult {
  hash: string;
  rawData: string;
}

const getWebGlCanvas = () => {
  const canvas = document.createElement('canvas');
  let gl;
  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('webgl2');
  } catch (e) {
    console.log('fail webGL');
  }
  return gl || null;
}

export default function (): WebGLResult {
  let gl: any = null;
  const fa2s = (fa: any): string => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    return '[' + fa[0] + ', ' + fa[1] + ']'
  }
  const maxAnisotropy = (gl: any): number | null => {
    const ext = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic')
    if (ext) {
      let anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
      if (anisotropy === 0) {
        anisotropy = 2
      }
      return anisotropy
    } else {
      return null
    }
  }

  gl = getWebGlCanvas();
  if (!gl) return {
    hash: '',
    rawData: ''
  };

  // WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
  // First it draws a gradient object with shaders and convers the image to the Base64 string.
  // Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
  // Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.

  const result = []
  const vShaderTemplate = 'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'
  const fShaderTemplate = 'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}'
  const vertexPosBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)
  const vertices = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0])
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  vertexPosBuffer.itemSize = 3
  vertexPosBuffer.numItems = 3
  const program = gl.createProgram()
  const vshader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vshader, vShaderTemplate)
  gl.compileShader(vshader)
  const fshader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(fshader, fShaderTemplate)
  gl.compileShader(fshader)
  gl.attachShader(program, vshader)
  gl.attachShader(program, fshader)
  gl.linkProgram(program)
  gl.useProgram(program)
  program.vertexPosAttrib = gl.getAttribLocation(program, 'attrVertex')
  program.offsetUniform = gl.getUniformLocation(program, 'uniformOffset')
  gl.enableVertexAttribArray(program.vertexPosArray)
  gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0)
  gl.uniform2f(program.offsetUniform, 1, 1)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems)
  try {
    result.push(gl.canvas.toDataURL())
  } catch (e) {
    /* .toDataURL may be absent or broken (blocked by extension) */
  }

  return {
    hash: Md5.init(result[0]),
    rawData: result[0]
  };
}
