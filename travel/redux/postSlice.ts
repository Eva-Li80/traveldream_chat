import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/type";
import { getPosts } from "../travelApi/travelApi";

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const posts = await getPosts();  
    return posts;
  } catch (error) {
    throw error;
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      state.posts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error getting post";
      });
  },
});

export const { addPost,} = postsSlice.actions;
export default postsSlice.reducer;
