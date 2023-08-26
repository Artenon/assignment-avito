import { FC, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchGames, filterGames } from "../../redux/games/api-actions";
import { getFilter, getGames, getIsLoading } from "../../redux/games/selectors";
import { Spinner } from "../../components/spinner/spinner";
import { GameCard } from "../../components/game-card/game-card";
import { FilterPlatform } from "../../components/filter/filter-platform";
import { FilterGenre } from "../../components/filter/filter-genre";
import { Sorting } from "../../components/filter/sorting";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  const games = useAppSelector(getGames);
  const isLoading = useAppSelector(getIsLoading);
  const { sorting, categories, platform } = useAppSelector(getFilter);

  useEffect(() => {
    if (sorting || platform || categories.length !== 0) {
      dispatch(filterGames());
    } else {
      dispatch(fetchGames());
    }
  }, [categories.length, dispatch, platform, sorting]);

  return (
    <>
      <Row>
        <Col>
          <FilterPlatform />
        </Col>
        <Col>
          <FilterGenre />
        </Col>
        <Col>
          <Sorting />
        </Col>
      </Row>
      {isLoading ? (
        <Spinner />
      ) : (
        <Row lg={3} sm={2} xs={1} className="g-4 py-4">
          {games.length === 0 ? (
            <h3 className="text-white">Ничего не найдено :(</h3>
          ) : (
            games.map((game) => (
              <Col key={game.id}>
                <GameCard game={game} />
              </Col>
            ))
          )}
        </Row>
      )}
    </>
  );
};
