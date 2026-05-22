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
`;

export const DragHandle = styled.View`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: #dee2e6;
  align-self: center;
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  font-family: GeneralSans-600;
  font-size: 20px;
  color: #212529;
  text-align: center;
  margin-bottom: 12px;
`;

export const Description = styled.Text`
  font-family: GeneralSans-400;
  font-size: 14px;
  color: #6c757d;
  text-align: center;
  margin-bottom: 32px;
  line-height: 20px;
`;

export const CancelButton = styled.TouchableOpacity`
  margin-top: 16px;
  height: 52px;
  align-items: center;
  justify-content: center;
`;
