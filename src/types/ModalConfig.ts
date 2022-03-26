import { ReactElement } from "react";

export interface ModalConfig {
  show: boolean;
  error?: boolean;
  loading?: boolean;
  message: ReactElement;
}
