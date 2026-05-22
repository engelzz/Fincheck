import { Text, TouchableOpacity, View } from 'react-native';
import { ToastConfigParams } from 'react-native-toast-message';
import { CancelIcon } from '../Icons/CancelIcon';
import { CheckCircleIcon } from '../Icons/CheckCircleIcon';
import { ToastStyles } from './styles';

type ToasterProps = ToastConfigParams<{
  Icon?: () => React.ReactNode;
  imageUrl?: string;
}>;

export const toastConfig = {
  success: ({
    text1,
    text2,
    hide,
    props: { Icon = () => <CheckCircleIcon /> },
  }: ToasterProps) => (
    <View style={ToastStyles.container}>
      <TouchableOpacity style={ToastStyles.toast} onPress={hide} activeOpacity={0.8}>
        <View style={ToastStyles.iconContainer}>
          <Icon />
        </View>
        <View style={ToastStyles.textContainer}>
          <Text style={ToastStyles.text1}>{text1}</Text>
          <Text style={ToastStyles.text2}>{text2}</Text>
        </View>
      </TouchableOpacity>
    </View>
  ),
  error: ({
    text1,
    text2,
    hide,
    props: { Icon = () => <CancelIcon /> },
  }: ToasterProps) => (
    <View style={ToastStyles.container}>
      <TouchableOpacity style={ToastStyles.toast} onPress={hide} activeOpacity={0.8}>
        <View style={ToastStyles.iconContainer}>
          <Icon />
        </View>
        <View style={ToastStyles.textContainer}>
          <Text style={ToastStyles.errorText1}>{text1}</Text>
          <Text style={ToastStyles.text2}>{text2}</Text>
        </View>
      </TouchableOpacity>
    </View>
  ),
  default: ({ text1, text2, hide }: ToasterProps) => (
    <View style={ToastStyles.container}>
      <TouchableOpacity style={ToastStyles.toast} onPress={hide} activeOpacity={0.8}>
        <View style={ToastStyles.textContainer}>
          <Text style={ToastStyles.text1}>{text1}</Text>
          <Text numberOfLines={2} style={ToastStyles.text2}>
            {text2}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  ),
};
