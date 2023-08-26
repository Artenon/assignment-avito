import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Carousel, Image } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchGame } from "../../redux/current-game/api-actions";
import {
  getCurrentGame,
  getIsLoading,
} from "../../redux/current-game/selectors";
import { Spinner } from "../../components/spinner/spinner";
import { formatDate } from "../../utils/format-date";
import { LightText } from "../../components/light-text/light-text";

export const GamePage: FC = () => {
  const dispatch = useAppDispatch();
  const { gameID } = useParams();

  const currentGame = useAppSelector(getCurrentGame);
  const isLoading = useAppSelector(getIsLoading);

  const playClickHandler = (url: string) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (gameID) {
      dispatch(fetchGame(gameID));
    }
  }, [dispatch, gameID]);

  return isLoading ? (
    <Spinner />
  ) : !currentGame ? (
    <Row className="text-light">
      <h3>Ничего не найдено :(</h3>
    </Row>
  ) : (
    <div className="text-light">
      <Row>
        <Col md={4}>
          <Image
            src={currentGame.thumbnail}
            className="w-100 mb-2"
            style={{ minHeight: 120 }}
            rounded
          />
          <div className="d-grid">
            <Button
              variant="secondary text-uppercase bold pt-2 pb-2 d-flex align-items-center justify-content-center gap-1 mb-2"
              onClick={() => playClickHandler(currentGame.game_url)}
            >
              Play now
              <FaSignInAlt />
            </Button>
          </div>
          <div>
            <LightText text="Genre: " />
            {currentGame.genre}
          </div>
          <div>
            <LightText text="Publisher: " />
            {currentGame.publisher}
          </div>
          <div>
            <LightText text="Developer: " />
            {currentGame.developer}
          </div>
          <div>
            <LightText text="Release: " />
            {formatDate(currentGame.release_date)}
          </div>
        </Col>
        <Col md={8}>
          <h1>{currentGame.title}</h1>

          <Row>
            <h4 className="text-white-50">Screenshots</h4>
            <Carousel fade>
              {currentGame.screenshots.map((screenshot) => (
                <Carousel.Item key={screenshot.id}>
                  <Image
                    src={screenshot.image}
                    className="w-100"
                    style={{ minHeight: 255 }}
                    rounded
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Row>

          <Row></Row>
        </Col>
      </Row>
      {currentGame.minimum_system_requirements && (
        <Row className="mt-4">
          <Col md={{ offset: 4 }}>
            <h4 className="text-white-50">Minimum System Requirements:</h4>
            <Row>
              <Col>
                <div className="d-flex flex-column">
                  <LightText text="OS" />
                  {currentGame.minimum_system_requirements.os}
                </div>
                <div className="d-flex flex-column">
                  <LightText text="Memory" />
                  {currentGame.minimum_system_requirements.memory}
                </div>
                <div className="d-flex flex-column">
                  <LightText text="Storage" />
                  {currentGame.minimum_system_requirements.storage}
                </div>
              </Col>
              <Col>
                <div className="d-flex flex-column">
                  <LightText text="Processor" />
                  {currentGame.minimum_system_requirements.processor}
                </div>
                <div className="d-flex flex-column">
                  <LightText text="Graphics" />
                  {currentGame.minimum_system_requirements.graphics}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};
