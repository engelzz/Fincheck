import React from 'react';
import { Modal, ScrollView, TouchableOpacity } from 'react-native';
import { CloseIcon } from '../Icons/CloseIcon';
import { Text } from '../Text';
import { DragHandle, Header, HeaderSpacer, Overlay, OverlayTouchable, Sheet } from './styles';

interface BottomSheetModalProps {
  open: boolean;
  title: string;
  onClose(): void;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
}

export function BottomSheetModal({
  open,
  title,
  onClose,
  children,
  rightAction,
}: BottomSheetModalProps) {
  return (
    <Modal visible={open} animationType="slide" transparent statusBarTranslucent>
      <Overlay>
        <OverlayTouchable activeOpacity={1} onPress={onClose} />
        <Sheet>
          <DragHandle />
          <Header>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <CloseIcon />
            </TouchableOpacity>
            <Text weight="600" size={16} color="#212529">
              {title}
            </Text>
            {rightAction ?? <HeaderSpacer />}
          </Header>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {children}
          </ScrollView>
        </Sheet>
      </Overlay>
    </Modal>
  );
}
