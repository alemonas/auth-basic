import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from './store'
import {publicFetch} from '../util/fetch'

interface InitialState {
  isAuthenticated: boolean
  token: string
  status: 'idle' | 'loading' | 'failed'
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
  status: 'idle',
  userInfo: {
    firstName: '',
    lastName: '',
    role: '',
    email: '',
  },
}

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (credentials, thunkAPI) => {
    try {
      const {data} = await publicFetch.post(`signup`, credentials)
      console.log({data})
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
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.status = 'idle'
      state.isAuthenticated = true
      state.token = JSON.stringify(action.payload)
    })
    builder.addCase(signupUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(signupUser.rejected, (state) => {
      state.status = 'failed'
    })
  },
})

export const authSelector = (state: RootState) => state.auth
