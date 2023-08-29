import { FC, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchGames } from "../../redux/games/api-actions";
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

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openHandler = () => setIsOpen(true);

  useEffect(() => {
    const controller = new AbortController();

    if (!platform && !sorting && categories.length === 0) {
      dispatch(fetchGames(controller.signal));
    }

    return () => controller.abort();
  }, [categories.length, dispatch, platform, sorting]);

  return (
    <>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <Button
        variant="secondary"
        onClick={openHandler}
        className="d-md-none mb-3"
      >
        <div className="d-flex align-items-center gap-2">
          <FaFilter />
          Filter
        </div>
      </Button>

      <Row>
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
          {error ? (
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
    </>
  );
};
