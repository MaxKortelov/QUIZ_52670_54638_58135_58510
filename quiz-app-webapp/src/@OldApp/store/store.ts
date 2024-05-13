import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./reducers";
import reduxThunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

const configureStore = (preloadedState: object) =>
  createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(reduxThunk)));

const store = configureStore({});

export default store;
