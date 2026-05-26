import styled from "styled-components/native";

export const Transactions = styled.View`
  background-color: #e9ecef;
  border-radius: 24px;
  width: 100%;
  height: 100%;
  padding: 32px 16px;
  overflow: visible;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  z-index: 10;
`;

export const TransactionCard = styled.View`
  margin-top: 8px;
  background-color: white;
  padding: 16px;
  border-radius: 16px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 12px;
`;

export const TransactionDetails = styled.View`
  flex: 1;
`;
