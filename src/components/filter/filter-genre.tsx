import { FC } from "react";
import Select, { MultiValue } from "react-select";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFilter } from "../../redux/games/selectors";
import actions from "../../redux/games/games-slice";
import { genres } from "../../const";

const { changeFilterGenres } = actions;

export const FilterGenre: FC<{ light: boolean }> = ({ light }) => {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector(getFilter);

  const changeSelectHandler = (
    newValues: MultiValue<{ value: string; label: string }>
  ) => {
    if (newValues) {
      dispatch(changeFilterGenres(newValues.map((value) => value.value)));
    }
  };

  return (
    <>
      <h5 className={`${light ? "text-white-50" : "text-white"}`}>Genres:</h5>
      <Select
        options={genres.map((genre) => ({ value: genre, label: genre }))}
        placeholder="Select Genre"
        onChange={changeSelectHandler}
        isMulti
        value={categories.map((genre) => ({ value: genre, label: genre }))}
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
