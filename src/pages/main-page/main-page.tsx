import { FC, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchGames } from "../../redux/api-actions";
import { getGames, getIsLoading } from "../../redux/selectors";
import { Spinner } from "../../components/spinner/spinner";
import { GameCard } from "../../components/game-card/game-card";
import { FilterPlatform } from "../../components/filter/filter-platform";
import { FilterGenre } from "../../components/filter/filter-genre";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  const games = useAppSelector(getGames);
  const isLoading = useAppSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <FilterPlatform />
        </Col>
        <Col>
          <FilterGenre />
        </Col>
      </Row>
      {isLoading ? (
        <Spinner />
      ) : (
        <Row lg={3} sm={2} xs={1} className="g-4 py-4">
          {games.map((game) => (
            <Col key={game.id}>
              <GameCard game={game} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
