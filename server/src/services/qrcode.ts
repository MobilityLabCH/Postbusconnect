import QRCode from 'qrcode';
export async function toDataURL(text: string) {
  return QRCode.toDataURL(text, { margin: 1, scale: 4 });
}
