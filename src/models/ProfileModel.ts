export interface Profile {
  id?: number;
  uuid: number;
  audioHash?: string;
  webGLHash?: string;
  canvasHash?: string;
  userAgent?: string;
  fonts?: string;
}
