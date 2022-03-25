import { FC } from "react";

export const Layout: FC = ({ children }) => {
  return (
    <div>
      <p>Layout</p>
      {children}
    </div>
  );
};
