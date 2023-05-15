import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./saga";
import rootReducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: 'root',
    storage: storage,

}
const pReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: pReducer,
    middleware: [sagaMiddleware],

})
sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)
export default store;