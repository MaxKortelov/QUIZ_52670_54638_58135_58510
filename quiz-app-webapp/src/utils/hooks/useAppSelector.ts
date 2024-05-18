import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { TStore, AppDispatch } from 'store';

export const useAppSelector: TypedUseSelectorHook<TStore> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
