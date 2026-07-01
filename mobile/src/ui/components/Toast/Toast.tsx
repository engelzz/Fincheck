import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CancelIcon } from "../Icons/CancelIcon";
import { CheckCircleIcon } from "../Icons/CheckCircleIcon";

type ToastType = "success" | "error";

interface ShowParams {
  type: ToastType;
  text1: string;
  visibilityTime?: number;
}

const VISIBILITY_TIME = 3500;

let _show: ((params: ShowParams) => void) | null = null;
let _hide: (() => void) | null = null;

export const Toast = {
  show: (params: ShowParams) => _show?.(params),
  hide: () => _hide?.(),
};

export const showToast = {
  success: (text1: string) =>
    Toast.show({ type: "success", text1, visibilityTime: VISIBILITY_TIME }),
  error: (text1: string) =>
    Toast.show({ type: "error", text1, visibilityTime: VISIBILITY_TIME }),
};

function ToastView() {
  const { top } = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [params, setParams] = useState<ShowParams>({
    type: "success",
    text1: "",
  });
  const [showKey, setShowKey] = useState(0);
  const pendingTime = useRef(VISIBILITY_TIME);
  const translateY = useRef(new Animated.Value(-120)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const animRef = useRef<Animated.CompositeAnimation | null>(null);
  // true after onShow fires; reset to false when modal hides
  const modalReadyRef = useRef(false);

  const slideOut = useCallback(() => {
    modalReadyRef.current = false;
    clearTimeout(timerRef.current);
    animRef.current?.stop();
    animRef.current = Animated.timing(translateY, {
      toValue: -120,
      duration: 220,
      useNativeDriver: true,
    });
    animRef.current.start(({ finished }) => {
      if (finished) setVisible(false);
    });
  }, [translateY]);

  const slideIn = useCallback(() => {
    animRef.current?.stop();
    translateY.setValue(-120);
    animRef.current = Animated.spring(translateY, {
      toValue: 0,
      damping: 20,
      stiffness: 280,
      useNativeDriver: true,
    });
    animRef.current.start();
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(slideOut, pendingTime.current);
  }, [translateY, slideOut]);

  useEffect(() => {
    _show = (newParams) => {
      pendingTime.current = newParams.visibilityTime ?? VISIBILITY_TIME;
      setParams(newParams);
      setVisible(true);
      setShowKey((k) => k + 1);
    };
    _hide = slideOut;
    return () => {
      _show = null;
      _hide = null;
    };
  }, [slideOut]);

  // Fires when the modal is already open and show() is called again
  useEffect(() => {
    if (showKey === 0 || !modalReadyRef.current) return;
    slideIn();
  }, [showKey, slideIn]);

  // onShow fires after the native Modal has fully presented — safe to animate
  const handleModalShow = useCallback(() => {
    modalReadyRef.current = true;
    slideIn();
  }, [slideIn]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={slideOut}
      onShow={handleModalShow}
    >
      <Animated.View
        style={[
          styles.container,
          { top: top + 8, transform: [{ translateY }] },
        ]}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          style={[styles.toast, params.type === "error" && styles.errorBorder]}
          onPress={slideOut}
          activeOpacity={0.85}
        >
          <View style={styles.iconContainer}>
            {params.type === "success" ? (
              <CheckCircleIcon size={22} />
            ) : (
              <CancelIcon size={22} />
            )}
          </View>
          <Text
            style={[
              styles.text,
              params.type === "success" ? styles.successText : styles.errorText,
            ]}
          >
            {params.text1}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}

export function ToastContainer() {
  return <ToastView />;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
  },
  toast: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },
  errorBorder: {
    borderLeftWidth: 3,
    borderLeftColor: "#e03131",
  },
  iconContainer: {
    marginRight: 12,
  },
  text: {
    flex: 1,
    fontFamily: "GeneralSans-600",
    fontSize: 14,
    lineHeight: 20,
  },
  successText: {
    color: "#099268",
  },
  errorText: {
    color: "#e03131",
  },
});
