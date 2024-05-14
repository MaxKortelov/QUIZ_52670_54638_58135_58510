import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const { reducer: submitIsLoading, actions: submitIsLoadingActions } = createSlice({
  name: 'submit/isLoading',
  initialState: false,
  reducers: {
    setSubmitIsLoading: (_, action: PayloadAction<boolean>) => action.payload,
  },
});

export const submit = combineReducers({
  submitIsLoading,
});

export const submitActions = {
  ...submitIsLoadingActions,
};
