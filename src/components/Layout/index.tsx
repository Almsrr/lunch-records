import { FC } from "react";
import styled from "styled-components";

export const Layout: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
  min-height: 100vh;
  background-color: #f5f5f5;
`;
