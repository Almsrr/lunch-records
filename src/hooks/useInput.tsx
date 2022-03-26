import { ChangeEvent, useState } from "react";

import { Hook } from "../types/Hook";

type validationFunction = (value: string) => boolean;

export const useInput: Hook<validationFunction> = validationFunction => {
  const [value, setValue] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const invalidValue = validationFunction(value);
  const invalidInput = invalidValue && isConfirmed;

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const blurInput = (e: any) => {
    setIsConfirmed(true);
  };

  const resetInput = () => {
    setValue("");
    setIsConfirmed(false);
  };

  return [value, invalidInput, changeInput, blurInput, resetInput];
};
