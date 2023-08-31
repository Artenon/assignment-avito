import { FC, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchGames, filterGames } from "../../redux/games/api-actions";
import {
  getFilter,
  getGames,
  getIsLoading,
  getIsFilterLoading,
  getError,
} from "../../redux/games/selectors";
import { Spinner } from "../../components/spinner/spinner";
import { GameCard } from "../../components/game-card/game-card";
import { FilterPlatform, FilterGenre, Sorting } from "../../components/filter";
import { SideBar } from "../../components/sidebar/sidebar";
import { Pagination } from "../../components/pagination/pagination";
import { Game } from "../../types/types";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  const [currentItems, setCurrentItems] = useState<Game[]>([]);

  const games = useAppSelector(getGames);
  const isLoading = useAppSelector(getIsLoading);
  const error = useAppSelector(getError);
  const isFilterLoading = useAppSelector(getIsFilterLoading);
  const { sorting, categories, platform } = useAppSelector(getFilter);

  useEffect(() => {
    const controller = new AbortController();

    if (sorting || platform || categories.length !== 0) {
      dispatch(filterGames(controller.signal));
    } else {
      dispatch(fetchGames(controller.signal));
    }

    return () => controller.abort();
  }, [categories.length, dispatch, platform, sorting]);

  return (
    <div data-testid="main-page">
      <SideBar />

      <Row data-testid="filters">
        <Col md={4} className="d-none d-md-block">
          <FilterPlatform light={false} />
        </Col>
        <Col md={4} className="d-none d-md-block">
          <FilterGenre light={false} />
        </Col>
        <Col md={4} className="d-none d-md-block">
          <Sorting light={false} />
        </Col>
      </Row>
      {isLoading || isFilterLoading ? (
        <Spinner />
      ) : (
        <Row className="g-4 pt-0 pt-md-4">
          {error || games.length === 0 ? (
            <h3 className="text-white">Ничего не найдено :(</h3>
          ) : (
            <>
              {currentItems.map((game) => (
                <Col key={game.id} lg={4} sm={6} xs={12}>
                  <GameCard game={game} />
                </Col>
              ))}
              <Col md={12}>
                <Pagination games={games} setCurrentItems={setCurrentItems} />
              </Col>
            </>
          )}
        </Row>
      )}
    </div>
  );
};
