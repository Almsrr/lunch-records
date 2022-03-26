import { FC } from "react";
import styled, { keyframes } from "styled-components";

export const Spinner: FC = () => {
  return <LoadingSpinner></LoadingSpinner>;
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 5px solid black;
  border-color: transparent black black black;
  animation: ${rotate} 1.2s ease-in-out infinite;
`;
