import { createStore,combineReducers } from "redux";

import booksReducer from "./reducers/booksReducer";
import categoriesReducer from "./reducers/categoriesReducer";

const rootReducer=combineReducers({
    booksState:booksReducer,
    categoriesState:categoriesReducer
})

const store=createStore(rootReducer)

export default store