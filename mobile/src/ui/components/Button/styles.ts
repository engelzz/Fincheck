import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background: ${({ disabled }) => disabled ? '#999' : '#087f5b'};
  border-radius: 16px;  
  padding: 14px 24px;
  align-items: center;
  justify-content: center;
  height: 58px;
  width: 100%;
  margin-top: 16px;
`