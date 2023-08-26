import { FC } from "react";

export const LightText: FC<{ text: string }> = ({ text }) => {
  return <span className="text-white-50">{text}</span>;
};
