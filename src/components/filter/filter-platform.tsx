import { FC } from "react";
import Select, { SingleValue } from "react-select";
import { useAppDispatch } from "../../hooks";
import { filterGames } from "../../redux/api-actions";
import { platforms } from "../../const";

export const FilterPlatform: FC = () => {
  const dispatch = useAppDispatch();

  const changeSelectHandler = (
    newValue: SingleValue<{ value: string; label: string }>
  ) => {
    if (newValue) {
      dispatch(filterGames(newValue.value));
    }
  };

  return (
    <Select
      options={platforms}
      placeholder="Select Platform"
      onChange={changeSelectHandler}
    />
  );
};
