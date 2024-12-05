import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/type";
import { addPoster, getPosts, updatePost } from "../travelApi/travelApi";
import { addLogBoxLog } from "react-native-reanimated/lib/typescript/logger";
import { updateUser } from "./userSlice";

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
    
        updatePost(post) 
          .then(updatedPost => {
            const index = state.posts.findIndex(p => p.id === updatedPost.id);
            if (index !== -1) {
              state.posts[index] = updatedPost;
            }
          })
          .catch((error) => {
            console.error('Error updating post:', error);
          });
      } else {
        console.error('Post not found!');
      }
    },
    addComment(state, action: PayloadAction<{ postId: string; comment: { text: string; authorId: string } }>) {
      const { postId, comment } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        const commentId = (post.comments.length ? parseInt(post.comments[post.comments.length - 1].id) + 1 : 1).toString();
        post.comments.push({ ...comment, id: commentId });
    
        updatePost(post)  
          .then(updatedPost => {
            const index = state.posts.findIndex(p => p.id === updatedPost.id);
            if (index !== -1) {
              state.posts[index] = updatedPost;
            }
          })
          .catch((error) => {
            console.error('Error updating post:', error);
          });
      } else {
        console.error('Post not found!');
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
        state.error = action.error.message || "Error geting post";
      });
  },
});

export const { addPost, addLike, addComment, setLoading, setError } = postsSlice.actions;
export default postsSlice.reducer;
