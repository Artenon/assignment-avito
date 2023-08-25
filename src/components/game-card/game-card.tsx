import { FC } from "react";
import { Card, Badge } from "react-bootstrap";
import { Game } from "../../types/types";

type GameCardProps = {
  game: Game;
};

const dateFormat = (date_str: string): string => {
  return new Date(date_str).toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const GameCard: FC<GameCardProps> = ({ game }) => {
  return (
    <Card bg="dark" text="white" style={{ height: "100%" }}>
      <Card.Img variant="top" src={game.thumbnail} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>{game.title}</Card.Title>
          <Card.Subtitle>{game.developer}</Card.Subtitle>
        </div>
        <Card.Text className="d-flex justify-content-between pt-2">
          {dateFormat(game.release_date)}
          <Badge bg="light" text="dark" className="d-flex align-items-center">
            {game.genre}
          </Badge>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
