import styled from "styled-components/native";

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
  margin-bottom: 32px;
`;

export const HeaderSpacer = styled.View`
  width: 24px;
`;

export const SectionTitle = styled.View``;

export const YearRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

export const YearSection = styled.View`
  margin-top: 32px;
`;

export const ButtonSection = styled.View`
  margin-top: 40px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: #f1f3f5;
`;

export const AccountItem = styled.TouchableOpacity`
  padding-top: 14px;
  padding-bottom: 14px;
`;
