import { FC } from "react";
import Select, { MultiValue } from "react-select";
import { useAppDispatch } from "../../hooks";
import { filterGames } from "../../redux/api-actions";
import { genres } from "../../const";

export const FilterGenre: FC = () => {
  const dispatch = useAppDispatch();

  const changeSelectHandler = (
    newValue: MultiValue<{ value: string; label: string }>
  ) => {
    if (newValue) {
      /* dispatch(filterGames(newValue[0].value)); */
    }
  };

  return (
    <Select
      options={genres.map((genre) => ({ value: genre, label: genre }))}
      placeholder="Select Genre"
      onChange={changeSelectHandler}
      isMulti
    />
  );
};
