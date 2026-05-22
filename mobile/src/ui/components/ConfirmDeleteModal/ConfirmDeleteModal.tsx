import { Modal } from 'react-native';
import { Button } from '../Button/Button';
import { Text } from '../Text';
import {
  CancelButton,
  Description,
  DragHandle,
  Overlay,
  OverlayTouchable,
  Sheet,
  Title,
} from './styles';

interface ConfirmDeleteModalProps {
  open: boolean;
  title: string;
  description?: string;
  isLoading: boolean;
  onClose(): void;
  onConfirm(): void;
}

export function ConfirmDeleteModal({
  open,
  title,
  description,
  isLoading,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <Modal visible={open} animationType="slide" transparent statusBarTranslucent>
      <Overlay>
        <OverlayTouchable activeOpacity={1} onPress={onClose} />
        <Sheet>
          <DragHandle />
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
          <Button onPress={onConfirm} loading={isLoading}>
            Sim, deletar
          </Button>
          <CancelButton onPress={onClose}>
            <Text weight="600" color="#087f5b">
              Cancelar
            </Text>
          </CancelButton>
        </Sheet>
      </Overlay>
    </Modal>
  );
}
