import styled from "styled-components/native";

export const Container = styled.View`
  height: 52px;
  z-index: 999;
`;

export const SelectButton = styled.TouchableOpacity<{
  hasError?: boolean;
  isOpen?: boolean;
}>`
  border-width: 1px;
  border-color: ${({ hasError, isOpen }) => {
    if (hasError) return "#c92a2a";
    if (isOpen) return "#087f5b";
    return "#ced4da";
  }};
  border-radius: ${({ isOpen }) => (isOpen ? "8px 8px 0px 0px" : "8px")};
  height: 52px;
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
`;

export const SelectText = styled.Text<{ hasValue: boolean }>`
  font-family: GeneralSans-400;
  font-size: 16px;
  color: ${({ hasValue }) => (hasValue ? "#212529" : "#adb5bd")};
  flex: 1;
`;

export const DropdownList = styled.View<{ hasError?: boolean }>`
  position: absolute;
  top: 52px;
  left: 0;
  right: 0;
  z-index: 999;
  max-height: 220px;
  border-width: 1px;
  border-top-width: 0px;
  border-color: ${({ hasError }) => (hasError ? "#c92a2a" : "#087f5b")};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #fff;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const OptionItem = styled.TouchableOpacity<{ isSelected: boolean }>`
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ isSelected }) => (isSelected ? "#e6fcf5" : "#fff")};
`;

export const Separator = styled.View`
  height: 1px;
  background-color: #f1f3f5;
  margin-left: 16px;
  margin-right: 16px;
`;

export const ErrorText = styled.Text`
  color: #c92a2a;
  font-family: GeneralSans-400;
  font-size: 12px;
  margin-top: 4px;
`;
