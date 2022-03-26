import { FC, Fragment, ReactElement } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import { Spinner } from "../Spinner";

interface ModalProps {
  loading?: boolean;
  error?: boolean;
  message: ReactElement;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ message, error, onClose, loading }) => {
  const root = document.getElementById("modal-root")!;
  console.log(loading);

  if (loading) {
    const modal = (
      <Fragment>
        <Blur onClick={onClose}></Blur>
        <SpinnerCont>
          <Spinner />
          {message}
        </SpinnerCont>
      </Fragment>
    );
    return createPortal(modal, root);
  }

  if (error) {
    const modal = (
      <Fragment>
        <Blur onClick={onClose}></Blur>
        <Container>
          <Img src="/images/error.webp" alt="success" />
          {message}
          <Button type="button" onClick={onClose}>
            Ok
          </Button>
        </Container>
      </Fragment>
    );
    return createPortal(modal, root);
  }

  const modal = (
    <Fragment>
      <Blur onClick={onClose}></Blur>
      <Container>
        <Img src="/images/success.png" alt="success" />
        {message}
        <Button type="button" onClick={onClose}>
          Ok
        </Button>
      </Container>
    </Fragment>
  );
  return createPortal(modal, root);
};

const Blur = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 100vw;
  max-width: 350px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: auto;
  background-color: #fff;
  border-radius: 0.25rem;
  padding: 2rem;
`;

const Button = styled.button`
  display: block;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  color: #000;
  background-color: #f5f5f5;
  font-weight: 700;
  margin-top: 1rem;
  width: 80%;
`;

const Img = styled.img`
  display: block;
  width: 80px;
  height: auto;
`;

const SpinnerCont = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
