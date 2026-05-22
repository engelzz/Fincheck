import styled from "styled-components/native";

export const FabButton = styled.TouchableOpacity`
  background: #087f5b;
  border-radius: 99px;
  height: 56px;
  width: 56px;
  align-items: center;
  justify-content: center;
`;

export const FabMenu = styled.View`
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
  background-color: #fff;
  border-radius: 16px;
`;

export const FabMenuRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
`;

export const FabMenuIconCircle = styled.View`
  background-color: #fff;
  border-radius: 99px;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
`;

export const FabMenuLabel = styled.View`
  background-color: #fff;
  border-radius: 8px;
  padding: 8px 12px;
`;
