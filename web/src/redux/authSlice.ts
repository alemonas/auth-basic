import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from './store'
import {publicFetch} from '../util/fetch'

export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  REJECTED = 'rejected',
  RESOLVED = 'resolved',
}

interface InitialState {
  isAuthenticated: boolean
  status: Status.IDLE | Status.PENDING | Status.REJECTED | Status.RESOLVED
  token?: string | null
  expiresAt?: string | null
  error?: string | null
  userInfo?: {
    firstName: string
    lastName: string
    email: string
    role: string
  } | null
}

const initialState: InitialState = {
  isAuthenticated: false,
  status: Status.IDLE,
}

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: any, thunkAPI) => {
    try {
      const response = await publicFetch.post(`signup`, credentials)
      const {data} = response

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(data)
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
      localStorage.setItem('expiresAt', data.expiresAt)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: (state) => {
      state.token = null
      state.isAuthenticated = false
      state.status = Status.IDLE
      state.userInfo = null
      state.expiresAt = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.status = Status.RESOLVED
      state.isAuthenticated = true
      state.token = JSON.stringify(action.payload.token)
      state.userInfo = action.payload.userInfo
      state.expiresAt = action.payload.expiresAt
    })
    builder.addCase(signup.pending, (state) => {
      state.status = Status.PENDING
    })
    builder.addCase(signup.rejected, (state, {payload}: any) => {
      return {
        ...state,
        status: Status.REJECTED,
        error: payload.message,
      }
    })
  },
})

export const authSelector = (state: RootState) => state.auth

export const {clearState} = authSlice.actions
