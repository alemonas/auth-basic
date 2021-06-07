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
  // isIdle: boolean
  // isLoading: boolean
  // isError: boolean
  // isSuccess: boolean
  token?: string | null
  expiresAt?: string
  error?: string | null
  userInfo?: {
    firstName: string
    lastName: string
    email: string
    role: string
  }
}

const initialState: InitialState = {
  isAuthenticated: false,
  // token: '',
  status: Status.IDLE,
  // isIdle: true,
  // isLoading: false,
  // isError: false,
  // isSuccess: false,
  // error: '',
  // userInfo: {
  //   firstName: '',
  //   lastName: '',
  //   role: '',
  //   email: '',
  // },
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
  reducers: {},
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
      // state.status = Status.REJECTED
      // // state.isError = true
      // state.error = payload.message
    })
  },
})

export const authSelector = (state: RootState) => state.auth
