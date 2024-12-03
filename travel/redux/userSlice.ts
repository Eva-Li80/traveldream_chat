import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/type";
import { getUsers } from "../travelApi/travelApi";

interface UserState {
  users: User[];
  activeUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [] ,
  activeUser: null,
  loading: false, 
  error: null
};

export const fetchUsers = createAsyncThunk("users/fetchUsers",
  async (_, thunkAPI) => {
    try{
     const data = await getUsers();
     return data
    }catch(error)
    {
      if (error instanceof Error)
    return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<User | null>) => {
      state.activeUser = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );
    },

    updateUser: (state, action: PayloadAction<User>) => {
      const { id, name, email, avatar, country} = action.payload;
      const users = state.users.find((user) => user.id === id);
      if (users) {
        users.name = name;
        users.email = email;
        users.avatar = avatar;
        users.country = country;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setActiveUser, addUser, removeUser, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
