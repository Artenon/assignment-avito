import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchGame } from "../../redux/current-game/api-actions";
import {
  getCurrentGame,
  getIsLoading,
} from "../../redux/current-game/selectors";
import { Spinner } from "../../components/spinner/spinner";

export const GamePage: FC = () => {
  const dispatch = useAppDispatch();
  const { gameID } = useParams();

  const currentGame = useAppSelector(getCurrentGame);
  const isLoading = useAppSelector(getIsLoading);

  useEffect(() => {
    if (gameID) {
      dispatch(fetchGame(gameID));
    }
  }, [dispatch, gameID]);

  return isLoading ? (
    <Spinner />
  ) : (
    <Row>
      <Col>{currentGame?.title}</Col>
    </Row>
  );
};
