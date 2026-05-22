import styled from 'styled-components/native';

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
  max-height: 85%;
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
