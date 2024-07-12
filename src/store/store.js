import { configureStore } from '@reduxjs/toolkit'
import movflixReducer from './movflixSlice'

export const store = configureStore({
  reducer: {
    movflixData : movflixReducer
  },
})