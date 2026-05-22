import styled from 'styled-components/native';

export const Container = styled.View``;

export const DateButton = styled.TouchableOpacity<{ hasError?: boolean }>`
  border-width: 1px;
  border-color: ${({ hasError }) => (hasError ? '#c92a2a' : '#ced4da')};
  border-radius: 8px;
  height: 52px;
  padding-horizontal: 16px;
  justify-content: center;
`;

export const DateText = styled.Text`
  font-family: GeneralSans-400;
  font-size: 16px;
  color: #212529;
`;

export const ErrorText = styled.Text`
  color: #c92a2a;
  font-family: GeneralSans-400;
  font-size: 12px;
  margin-top: 4px;
`;

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

export const OverlayTouchable = styled.TouchableOpacity`
  flex: 1;
`;

export const Sheet = styled.View`
  background-color: #fff;
  padding-left: 24px;
  padding-right: 24px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding-top: 20px;
  padding-bottom: 40px;
`;

export const DragHandle = styled.View`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: #dee2e6;
  align-self: center;
  margin-bottom: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const HeaderSpacer = styled.View`
  width: 24px;
`;

export const PickerSection = styled.View`
  margin-bottom: 20px;
`;

export const PickerSectionTitle = styled.Text`
  font-family: GeneralSans-600;
  font-size: 16px;
  color: #212529;
  margin-bottom: 12px;
`;

export const PickerRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MonthItem = styled.TouchableOpacity<{ isSelected: boolean }>`
  padding-vertical: 8px;
  padding-horizontal: 12px;
  border-radius: 8px;
  background-color: ${({ isSelected }) => (isSelected ? '#e6fcf5' : 'transparent')};
  margin-right: 8px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: #087f5b;
  border-radius: 8px;
  height: 52px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;
