import { createSlice, nanoid } from '@reduxjs/toolkit'
const initialState = { value: 0 }
const cartSlice = createSlice({
  name: 'cart',
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

export const { increment, decrement, incrementByAmount } = cartSlice.actions
export default cartSlice.reducer