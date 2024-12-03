import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/type";
import { getPosts, updatePost } from "../travelApi/travelApi";

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
    addLike(state, action: PayloadAction<string>) {
        const post = state.posts.find(post => post.id === action.payload);
        if (post) {
          post.likes += 1;
        }
      },

      addComment: (state, action: PayloadAction<{ postId: string; comment: { text: string; authorId: string } }>) => {
        const { postId, comment } = action.payload;
        const post = state.posts.find(post => post.id === postId);
        if (post) {
          const commentId = (post.comments.length ? parseInt(post.comments[post.comments.length - 1].id) + 1 : 1).toString();
          post.comments.push({ ...comment, id: commentId });
        }
      },
      
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
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
        state.error = action.error.message || "Misslyckades att hämta inlägg";
      });
  },
});

export const { addPost, addLike, addComment, setLoading, setError } = postsSlice.actions;
export default postsSlice.reducer;
