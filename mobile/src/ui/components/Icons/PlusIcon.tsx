import { SvgXml } from "react-native-svg"

export function PlusIcon() {
  const markup = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 6.97058L13 6.97058M7 0.970581L7 12.9706" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`

  return <SvgXml xml={markup} />
}