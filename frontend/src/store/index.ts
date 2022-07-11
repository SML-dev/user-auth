import { configureStore, createSlice } from '@reduxjs/toolkit'

export interface LoginState {
  isLoggedIn: boolean
}
const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
    },
  },
})

export const authAction = authSlice.actions

export const store = configureStore({
  reducer: authSlice.reducer,
})
