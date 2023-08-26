import { FC } from "react";
import Select, { SingleValue } from "react-select";
import { useAppDispatch } from "../../hooks";
import { filterGames } from "../../redux/games/api-actions";
import actions from "../../redux/games/games-slice";
import { platforms } from "../../const";

const { changeFilterPlatform } = actions;

export const FilterPlatform: FC = () => {
  const dispatch = useAppDispatch();

  const changeSelectHandler = (
    newValue: SingleValue<{ value: string; label: string }>
  ) => {
    if (newValue) {
      dispatch(changeFilterPlatform(newValue.value));
      dispatch(filterGames());
    }
  };

  return (
    <>
      <h5 className="text-white">Platform:</h5>
      <Select
        options={platforms}
        placeholder="Select Platform"
        onChange={changeSelectHandler}
      />
    </>
  );
};
