import { SvgXml } from "react-native-svg";

interface CancelIconProps {
  color?: string;
  size?: number;
}

export function CancelIcon({ color = "#e03131", size = 24 }: CancelIconProps) {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`;

  return <SvgXml xml={markup} />;
}
