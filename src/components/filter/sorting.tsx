import { FC } from "react";
import Select, { SingleValue } from "react-select";
import { useAppDispatch } from "../../hooks";
import { filterGames } from "../../redux/games/api-actions";
import actions from "../../redux/games/games-slice";
import { sortOptions } from "../../const";

const { changeFilterSorting } = actions;

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
    <>
      <h5 className="text-white">Sort by:</h5>
      <Select
        options={sortOptions}
        placeholder="Select Platform"
        onChange={changeSelectHandler}
      />
    </>
  );
};
