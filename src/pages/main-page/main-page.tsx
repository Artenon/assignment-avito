import { FC, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getGames, getFilter } from "../../redux/games/selectors";
import { Spinner } from "../../components/spinner/spinner";
import { GameCard } from "../../components/game-card/game-card";
import { FilterPlatform, FilterGenre, Sorting } from "../../components/filter";
import { SideBar } from "../../components/sidebar/sidebar";
import { Pagination } from "../../components/pagination/pagination";
import { ToTheTopButton } from "../../components/to-the-top-button/to-the-top-button";
import { Game } from "../../types/types";
import {
  useLazyFetchGamesQuery,
  useLazyFilterGamesQuery,
} from "../../services/games-service";
import actions from "../../redux/games/games-slice";

const { changeGames } = actions;

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  const [currentItems, setCurrentItems] = useState<Game[]>([]);

  const games = useAppSelector(getGames);
  const { categories, platform, sorting } = useAppSelector(getFilter);

  const [fetchGames, { isLoading, isError, data }] = useLazyFetchGamesQuery();
  const [
    filterGames,
    {
      isFetching: isFilterFetching,
      data: filteredGames,
      isError: isFilterError,
    },
  ] = useLazyFilterGamesQuery();

  useEffect(() => {
    if (filteredGames && filteredGames?.status !== 0) {
      dispatch(changeGames(filteredGames));
    } else if (data && data?.status !== 0) {
      dispatch(changeGames(data));
    }
  }, [data, filteredGames, dispatch]);

  useEffect(() => {
    if (sorting || platform || categories.length !== 0) {
      filterGames({ categories, platform, sorting });
    } else {
      fetchGames();
    }
  }, [categories, platform, sorting, fetchGames, filterGames]);

  return (
    <div data-testid="main-page">
      <SideBar />
      <ToTheTopButton />

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
      {isLoading || isFilterFetching ? (
        <Spinner />
      ) : (
        <Row className="g-4 pt-0 pt-md-4">
          {isError ||
          isFilterError ||
          !games ||
          data?.status === 0 ||
          filteredGames?.status === 0 ? (
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
