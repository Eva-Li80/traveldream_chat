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
    comments: Comment[];
  }
 
  export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    country: string;
    image: string
  }
  
  export interface Data {
    users: User[];
    posts: Post[];
  }

  export type RootStackParamList = {
    AllPosts: undefined;
    PostDetails: {id: string}
    Home: undefined
    Profile: undefined
  }
  