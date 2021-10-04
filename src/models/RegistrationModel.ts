export interface Registration {
  id?: number;
  email: string;
  password: string;
  name: string;
  cellphone: string;
  audioHash?: string;
  webGLHash?: string;
  canvasHash?: string;
  userAgent?: string;
  fonts?: string;
}
