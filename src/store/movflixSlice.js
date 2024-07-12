import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bannerData : [],
    imageURL : ""
  }

  export const movflixSlice = createSlice({
    name : 'movflix',
    initialState,
    reducers : {
        setBannerData : (state,action) => {
            state.bannerData = action.payload
        },
        setImageURL : (state, action) => {
            state.imageURL = action.payload
        }
    }
  })

  export const { setBannerData, setImageURL } = movflixSlice.actions
  export default movflixSlice.reducer