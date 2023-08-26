import { FC } from "react";
import Select, { SingleValue } from "react-select";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFilter } from "../../redux/games/selectors";
import { filterGames } from "../../redux/games/api-actions";
import actions from "../../redux/games/games-slice";
import { sortOptions } from "../../const";

const { changeFilterSorting } = actions;

export const Sorting: FC = () => {
  const dispatch = useAppDispatch();

  const { sorting } = useAppSelector(getFilter);
  const sortingOption = sortOptions.filter(
    (option) => option.value === sorting
  );

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
        placeholder="Select Sorting"
        onChange={changeSelectHandler}
        value={sortingOption}
      />
    </>
  );
};
