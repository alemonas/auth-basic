import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from './store'
import {publicFetch} from '../util/fetch'

export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  REJECTED = 'rejected',
  RESOLVED = 'resolved',
}

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

interface UserInfo {
  firstName: string
  lastName: string
  email: string
  role: string
  bio?: string
}
interface InitialState {
  isAuthenticated: boolean
  status: Status.IDLE | Status.PENDING | Status.REJECTED | Status.RESOLVED
  isAdmin?: boolean
  token?: string | null
  expiresAt?: string | null
  error?: string | null
  userInfo?: UserInfo | {}
}

const initialState: InitialState = {
  isAuthenticated: false,
  status: Status.IDLE,
}

export const login = createAsyncThunk(
  'auth/login',
  async (loginCredentials: any, thunkAPI) => {
    try {
      const response = await publicFetch.post('authenticate', loginCredentials)
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

export const fetchAuthUser = createAsyncThunk('auth/fetchUser', async () => {
  const token = localStorage.getItem('token') || null
  const userInfo = localStorage.getItem('userInfo') || {}
  const expiresAt = localStorage.getItem('expiresAt') || null

  const isAuthenticated = token && expiresAt ? true : false

  return {
    isAuthenticated,
    token,
    userInfo,
    expiresAt,
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: (state) => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      const {userInfo} = action.payload
      state.status = Status.RESOLVED
      state.isAuthenticated = true
      state.token = JSON.stringify(action.payload.token)
      state.userInfo = userInfo
      state.isAdmin = userInfo.role === UserRoles.ADMIN
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
    builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated
      state.token = JSON.stringify(action.payload.token)
      state.userInfo = action.payload.userInfo
      state.expiresAt = action.payload.expiresAt
    })

    builder.addCase(login.fulfilled, (state, action) => {
      const {userInfo} = action.payload
      state.status = Status.RESOLVED
      state.isAuthenticated = true
      state.token = JSON.stringify(action.payload.token)
      state.userInfo = userInfo
      state.isAdmin = userInfo.role === UserRoles.ADMIN
      state.expiresAt = action.payload.expiresAt
    })
    builder.addCase(login.pending, (state) => {
      state.status = Status.PENDING
    })
    builder.addCase(login.rejected, (state, {payload}: any) => {
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
