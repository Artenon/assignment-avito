import { FC, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchGames, filterGames } from "../../redux/games/api-actions";
import { getFilter, getGames, getIsLoading } from "../../redux/games/selectors";
import { Spinner } from "../../components/spinner/spinner";
import { GameCard } from "../../components/game-card/game-card";
import { FilterPlatform, FilterGenre, Sorting } from "../../components/filter";
import { SideBar } from "../../components/sidebar/sidebar";

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  const games = useAppSelector(getGames);
  const isLoading = useAppSelector(getIsLoading);
  const { sorting, categories, platform } = useAppSelector(getFilter);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openHandler = () => setIsOpen(true);

  useEffect(() => {
    if (sorting || platform || categories.length !== 0) {
      dispatch(filterGames());
    } else {
      dispatch(fetchGames());
    }
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
      {isLoading ? (
        <Spinner />
      ) : (
        <Row className="g-4 py-4 pt-0 pt-md-4">
          {games.length === 0 ? (
            <h3 className="text-white">Ничего не найдено :(</h3>
          ) : (
            games.map((game) => (
              <Col key={game.id} lg={4} sm={6} xs={12}>
                <GameCard game={game} />
              </Col>
            ))
          )}
        </Row>
      )}
    </>
  );
};
