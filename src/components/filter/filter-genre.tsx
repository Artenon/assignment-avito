import { FC } from "react";
import Select, { MultiValue } from "react-select";
import { useAppDispatch } from "../../hooks";
import { filterGames } from "../../redux/games/api-actions";
import actions from "../../redux/games/games-slice";
import { genres } from "../../const";

const { changeFilterGenres } = actions;

export const FilterGenre: FC = () => {
  const dispatch = useAppDispatch();

  const changeSelectHandler = (
    newValues: MultiValue<{ value: string; label: string }>
  ) => {
    if (newValues) {
      dispatch(changeFilterGenres(newValues.map((value) => value.value)));
      dispatch(filterGames());
    }
  };

  return (
    <>
      <h5 className="text-white">Genres:</h5>
      <Select
        options={genres.map((genre) => ({ value: genre, label: genre }))}
        placeholder="Select Genre"
        onChange={changeSelectHandler}
        isMulti
      />
    </>
  );
};
