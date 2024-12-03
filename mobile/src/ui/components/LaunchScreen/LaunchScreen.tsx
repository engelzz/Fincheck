import { Modal, View } from "react-native";
import { Logo } from "../Icons/Logo";
import { Spinner } from "../Icons/Spinner";

interface LaunchScreenProps {
  isLoading: boolean
}

export function LaunchScreen({ isLoading }: LaunchScreenProps) {
  return (
   <Modal>
     <View style={{backgroundColor: '#087f5b', top: 0, left: 0, width: '100%', height: '100%'}}>
      <View style={{alignItems: 'center', gap: 16, flexDirection: 'column'}}>
        <Logo />
        <Spinner />
      </View>
    </View>
   </Modal>
  )
}

// className="bg-teal-900 fixed top-0 left-0 w-full h-full grid place-items-center">
//       <View className="flex flex-col items-center gap-4"></View>