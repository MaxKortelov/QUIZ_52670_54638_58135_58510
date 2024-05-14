import { TStore } from 'store/index';

export const getIsLogged = (store: TStore) => store.currentUser?.isLogged;

export const getCurrentUser = (store: TStore) => store.currentUser?.data?.user;
export const getCurrentUserIsLoading = (store: TStore) => store.currentUser?.isLoading;
