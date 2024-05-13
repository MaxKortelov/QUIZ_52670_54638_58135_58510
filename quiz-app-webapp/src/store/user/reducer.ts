import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileModel } from 'utils/dto/profile';

export const { reducer: isLogged, actions: isLoggedActions } = createSlice({
  name: 'currentUser/isLogged',
  initialState: null as boolean | null,
  reducers: {
    setIsLogged: (_, action: PayloadAction<boolean>) => action.payload,
  },
});

interface InitState {
  user: ProfileModel;
}

export const { reducer: data, actions: userActions } = createSlice({
  name: 'currentUser',
  initialState: {} as InitState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { reducer: isLoading, actions: userIsLoadingActions } = createSlice({
  name: 'currentUser/isLoading',
  initialState: false,
  reducers: {
    setIsLoading: (_, action: PayloadAction<boolean>) => action.payload,
  },
});

export const currentUser = combineReducers({
  isLogged,
  data,
  isLoading,
});
