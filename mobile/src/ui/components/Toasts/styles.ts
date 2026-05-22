import { StyleSheet } from 'react-native';

export const ToastStyles = StyleSheet.create({
  container: {
    paddingTop: 10,
    width: '100%',
  },
  toast: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
    borderRadius: 8,
    marginHorizontal: 45,
    padding: 12,
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    color: '#099268',
    fontFamily: 'GeneralSans-600',
    fontSize: 14,
  },
  errorText1: {
    color: '#e03131',
    fontFamily: 'GeneralSans-600',
    fontSize: 14,
  },
  text2: {
    color: '#495057',
    fontFamily: 'GeneralSans-400',
    fontSize: 13,
    marginTop: 2,
  },
});
