import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from './store'
import {publicFetch} from '../util/fetch'

enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  FAILED = 'failed'
}

interface InitialState {
  isAuthenticated: boolean
  token: string
  status: Status.IDLE | Status.LOADING | Status.FAILED
  userInfo: {
    firstName: string
    lastName: string
    email: string
    role: string
  }
}

const initialState: InitialState = {
  isAuthenticated: false,
  token: '',
  status: Status.IDLE,
  userInfo: {
    firstName: '',
    lastName: '',
    role: '',
    email: '',
  },
}

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (credentials: any) => {
    try {
      const {data} = await publicFetch.post(`signup`, credentials)
      console.log({data})
      return data
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.response.data)
      return error.response.data
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.status = Status.IDLE
      state.isAuthenticated = true
      state.token = JSON.stringify(action.payload)
    })
    builder.addCase(signupUser.pending, (state) => {
      state.status = Status.LOADING
    })
    builder.addCase(signupUser.rejected, (state) => {
      state.status = Status.FAILED
    })
  },
})

export const authSelector = (state: RootState) => state.auth
