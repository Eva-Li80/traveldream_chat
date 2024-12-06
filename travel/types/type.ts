export interface Comment {
  id: string;
  text: string;
  authorId: string;
}

export interface Post {
  id: string;
  title: string;
  text: string;
  authorId: string;
  likes: number;
  country: string;
  city: string;
  image: string
  comments: Comment[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  country: string;
}

export type RootStackParamList = {
  Home: undefined
  Profiles: undefined
  Profile: { user: { id: string; name: string; email: string; avatar: string; country: string} | null} 
  AllPosts: { user: User | null };
  ChooseProfile: undefined
  NewPost: undefined
  AddProfile: undefined
  PostDetail: { post: Post }; 
}

