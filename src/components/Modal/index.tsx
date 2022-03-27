import { FC, Fragment } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import { Spinner } from "../Spinner";

interface ModalProps {
  type: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  onSuccess?: () => void;
}

export const Modal: FC<ModalProps> = ({
  type,
  message,
  onClose,
  onConfirm,
  onSuccess,
}) => {
  const root = document.getElementById("modal-root")!;

  switch (type) {
    case "loading":
      const loadingModal = (
        <Fragment>
          <Blur onClick={onClose}></Blur>
          <SpinnerCont>
            <Spinner />
            <Text>{message}</Text>
          </SpinnerCont>
        </Fragment>
      );
      return createPortal(loadingModal, root);
    case "warning":
      const warningModal = (
        <Fragment>
          <Blur onClick={onClose}></Blur>
          <Container>
            <Img src="/images/warning.png" alt="warning" />
            <Text>{message}</Text>
            <Button type="button" onClick={onConfirm}>
              Ok
            </Button>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
          </Container>
        </Fragment>
      );
      return createPortal(warningModal, root);
    case "error":
      const errorModal = (
        <Fragment>
          <Blur onClick={onClose}></Blur>
          <Container>
            <Img src="/images/error.webp" alt="error" />
            <Text>{message}</Text>
            <Button type="button" onClick={onClose}>
              Ok
            </Button>
          </Container>
        </Fragment>
      );
      return createPortal(errorModal, root);
    default:
      const modal = (
        <Fragment>
          <Blur onClick={onClose}></Blur>
          <Container>
            <Img src="/images/success.png" alt="success" />
            <Text>{message}</Text>
            <Button type="button" onClick={onSuccess || onClose}>
              Ok
            </Button>
          </Container>
        </Fragment>
      );
      return createPortal(modal, root);
  }
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
  background-color: #d3d3d3;
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

const Text = styled.p`
  text-align: center;
`;
