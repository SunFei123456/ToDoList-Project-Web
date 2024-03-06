// 生成随机亮色鲜艳颜色函数
function getRandomBrightColor(): string {
    // 随机生成色相值
    const hue = Math.floor(Math.random() * 360);
  
    // 固定饱和度和明度，可以调整这两个值以获取不同的颜色效果
    const saturation = 80;
    const lightness = 70;
  
    // 转换为 RGB 格式
    const rgbColor = hslToRgb(hue / 360, saturation / 100, lightness / 100);
  
    // 转换为十六进制格式
    const hexColor = rgbToHex(rgbColor);
  
    return hexColor;
  }
  
  // HSL to RGB 转换函数
  function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l; // 饱和度为 0 时，即灰色
    } else {
      const hueToRgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
  
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }
  
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
  
  // RGB to 十六进制转换函数
  function rgbToHex(rgb: [number, number, number]): string {
    const [r, g, b] = rgb;
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
  }
  
  export default getRandomBrightColor
  