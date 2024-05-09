import { createSlice, nanoid } from '@reduxjs/toolkit'
const initialState = { value: 0 }
const userSlice = createSlice({
  name: 'user',
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

export const { increment, decrement, incrementByAmount } = userSlice.actions
export default userSlice.reducer