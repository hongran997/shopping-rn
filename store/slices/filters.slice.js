import { createSlice, nanoid } from '@reduxjs/toolkit'
const initialState = { value: 0 }
const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = filtersSlice.actions
export default filtersSlice.reducer