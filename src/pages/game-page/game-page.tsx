import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

export const GamePage: FC = () => {
  const { gameID } = useParams();

  return <div>{gameID}</div>;
};
