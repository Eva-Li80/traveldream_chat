import { Post } from "../types/type";

const API_URL_USERS = 'http://10.0.2.2:3001/users';
const API_URL_POST = 'http://10.0.2.2:3001/posts';

export const getUsers = async () => {
  try {
    const response = await fetch(API_URL_USERS); 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); 
    return data;
  } catch (error) {
    throw error;
  }
};
export const addUsers = async (users: { name: string; email: string; avatar: string, country: string}) => {
    try {
      const response = await fetch(API_URL_USERS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(users),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const getPosts = async () => {
    try {
      const response = await fetch(API_URL_POST); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); 
      return data;
    } catch (error) {
      throw error;
    }
  };

  
export const addPoster = async (poster: Post) => {
  try {
    const response = await fetch(API_URL_POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(poster),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (poster: Post) => {
  try {
    const response = await fetch(`${API_URL_POST}/${poster.id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(poster),
    });

    if (!response.ok) {
       throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

  
