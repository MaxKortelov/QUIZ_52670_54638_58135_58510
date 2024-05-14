import { TStore } from 'store/index';

export const getSubmitIsLoading = (store: TStore) => store.submit?.submitIsLoading;
