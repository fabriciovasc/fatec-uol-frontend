import {Md5} from 'md5-typescript';

interface AudioResult {
  hash: string;
  rawData: string;
}

interface AudioOptions {
  audio: {
    timeout: number,
    excludeIOS: boolean
  }
}

export default function (options: AudioOptions = {audio: {timeout: 1000, excludeIOS: true}}): Promise<any> {
  return new Promise((done, reject) => {
    const audioOptions = options.audio;

    if (audioOptions.excludeIOS && navigator.userAgent.match(/OS 11.+Version\/11.+Safari/)) {
      // See comment for excludeUserAgent and https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
      return done({hash: '', rawData: ''});
    }

    const AudioContext: any = window.OfflineAudioContext;

    if (!AudioContext) {
      return done('')
    }

    let context: any = new AudioContext(1, 44100, 44100);

    const oscillator = context.createOscillator();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(10000, context.currentTime);

    const compressor = context.createDynamicsCompressor() as any;

    const items = [
      ['threshold', -50],
      ['knee', 40],
      ['ratio', 12],
      ['reduction', -20],
      ['attack', 0],
      ['release', 0.25]
    ];

     items.forEach((item) => {
       if (compressor[item[0]] !== undefined && typeof compressor[item[0]].setValueAtTime === 'function') {
         compressor[item[0]].setValueAtTime(item[1], context.currentTime)
       }
     });

    oscillator.connect(compressor);
    compressor.connect(context.destination);
    oscillator.start(0);
    context.startRendering();

    const audioTimeoutId = setTimeout(() => {
      console.warn('Audio fingerprint timed out. Please report bug at https://github.com/Valve/fingerprintjs2 with your user agent: "' + navigator.userAgent + '".')
      context.oncomplete = () => {
        console.log('completed')
      }
      context = null
      return done({hash: '', rawData: ''})
    }, audioOptions.timeout)

    context.oncomplete = (event: any) => {
      let fingerprint
      try {
        clearTimeout(audioTimeoutId)
        fingerprint = event.renderedBuffer.getChannelData(0)
          .slice(4500, 5000)
          .reduce((acc: any, val: any) => {
            return acc + Math.abs(val)
          }, 0)
          .toString()
        oscillator.disconnect()
        compressor.disconnect()
      } catch (error) {
        done({hash: '', rawData: ''})
        return
      }
      done({hash: Md5.init(fingerprint), rawData: fingerprint})
    }
  });
}
