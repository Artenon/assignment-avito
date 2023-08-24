import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { State, AppDispatch } from "../types/types";

export const fetchSMTH = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(``, async (_arg, { dispatch, extra: api }) => {});
