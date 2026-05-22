import { SvgXml } from "react-native-svg";

interface CheckCircleIconProps {
  color?: string;
  size?: number;
}

export function CheckCircleIcon({ color = "#099268", size = 24 }: CheckCircleIconProps) {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;

  return <SvgXml xml={markup} />;
}
