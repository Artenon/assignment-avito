import { FC } from "react";
import Select, { SingleValue } from "react-select";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFilter } from "../../redux/games/selectors";
import actions from "../../redux/games/games-slice";
import { sortOptions } from "../../const";

const { changeFilterSorting } = actions;

export const Sorting: FC<{ light: boolean }> = ({ light }) => {
  const dispatch = useAppDispatch();

  const { sorting } = useAppSelector(getFilter);
  const sortingOption = sortOptions.filter(
    (option) => option.value === sorting
  )[0];

  const changeSelectHandler = (
    newValue: SingleValue<{ value: string; label: string }>
  ) => {
    if (newValue) {
      dispatch(changeFilterSorting(newValue.value));
    }
  };

  return (
    <>
      <h5 className={`${light ? "text-white-50" : "text-white"}`}>Sort by:</h5>
      <Select
        options={sortOptions}
        placeholder="Select Sorting"
        onChange={changeSelectHandler}
        value={sortingOption}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "#717171",
          }),
          option: (base, { isFocused }) => ({
            ...base,
            color: "#dbdbdb",
            backgroundColor: isFocused ? "#717171" : undefined,
          }),
          indicatorSeparator: (base) => ({
            ...base,
            backgroundColor: "#717171",
          }),
          dropdownIndicator: (base, { isFocused }) => ({
            ...base,
            color: isFocused ? "#9d9d9d" : "#717171",
          }),
          clearIndicator: (base, { isFocused }) => ({
            ...base,
            color: isFocused ? "#9d9d9d" : "#717171",
          }),
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#9d9d9d",
            primary50: "#515151",
            neutral0: "#262626",
            neutral10: "#4f4f4f",
            neutral80: "#dbdbdb",
          },
        })}
      />
    </>
  );
};
