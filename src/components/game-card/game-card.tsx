import { FC } from "react";
import { Link } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Game } from "../../types/types";
import { AppRoute } from "../../const";
import { formatDate } from "../../utils/format-date";

import s from "./game-card.module.css";

type GameCardProps = {
  game: Game;
};

export const GameCard: FC<GameCardProps> = ({ game }) => {
  return (
    <Link to={`${AppRoute.Game}/${game.id}`}>
      <Card bg="dark" text="white" className={`h-100 border-0 ${s.card}`}>
        <LazyLoadImage src={game.thumbnail} style={{ minHeight: 140 }} />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title>{game.title}</Card.Title>
            <Card.Subtitle>{game.developer}</Card.Subtitle>
          </div>
          <Card.Text className="d-flex justify-content-between pt-2">
            {formatDate(game.release_date)}
            <Badge bg="light" text="dark" className="d-flex align-items-center">
              {game.genre}
            </Badge>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};
