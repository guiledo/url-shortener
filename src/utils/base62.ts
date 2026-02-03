const CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = CHARSET.length;

export function encode(num: number): string {
  if (num === 0) return CHARSET[0];
  let s = '';
  while (num > 0) {
    s = CHARSET[num % BASE] + s;
    num = Math.floor(num / BASE);
  }
  return s;
}

export function decode(str: string): number {
  let num = 0;
  for (const char of str) {
    num = num * BASE + CHARSET.indexOf(char);
  }
  return num;
}
