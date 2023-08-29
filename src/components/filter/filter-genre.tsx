import { FC, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFilter } from "../../redux/games/selectors";
import { filterGames } from "../../redux/games/api-actions";
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

  useEffect(() => {
    const controller = new AbortController();

    if (categories.length > 0) {
      dispatch(filterGames(controller.signal));
    }

    return () => controller.abort();
  }, [dispatch, categories.length]);

  return (
    <>
      <h5 className={`${light ? "text-muted" : "text-white"}`}>Genres:</h5>
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
