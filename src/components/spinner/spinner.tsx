import { FC } from "react";
import { Spinner as ReactSpinner } from "react-bootstrap";

import s from "./spinner.module.css";

export const Spinner: FC = () => {
  return (
    <div className={s.spinner}>
      <ReactSpinner variant="light" />
    </div>
  );
};
