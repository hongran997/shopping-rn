import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist'
import { setupListeners } from '@reduxjs/toolkit/query'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cart.slice.js'
import filtersReducer from './slices/filters.slice'
import userReducer from './slices/user.slice'
import apiSlice from '../services/api.js'
console.log(JSON.stringify(apiSlice));
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage
}

export default store = configureStore(
  {
    reducer: {
      user: persistReducer(persistConfig, userReducer),
      cart: persistReducer(persistConfig, cartReducer),
      filters: persistReducer(persistConfig, filtersReducer)
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
  }
)
setupListeners(store.dispatch)
