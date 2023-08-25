import { FC } from "react";
import Select, { SingleValue } from "react-select";
import { useAppDispatch } from "../../hooks";
import { filterGames } from "../../redux/api-actions";
import { changeFilterSorting } from "../../redux/reducer";
import { sortOptions } from "../../const";

export const Sorting: FC = () => {
  const dispatch = useAppDispatch();

  const changeSelectHandler = (
    newValue: SingleValue<{ value: string; label: string }>
  ) => {
    if (newValue) {
      dispatch(changeFilterSorting(newValue.value));
      dispatch(filterGames());
    }
  };

  return (
    <Select
      options={sortOptions}
      placeholder="Select Platform"
      onChange={changeSelectHandler}
    />
  );
};
