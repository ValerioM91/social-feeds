import { socialActions } from './socialSlice';
import { Dispatch } from '@reduxjs/toolkit';

export const getFeed = () => {
  return async (dispatch: Dispatch) => {
    dispatch(socialActions.socialFeedStart());

    const fetchData = async () => {
      const response = await fetch('https://private-cc77e-aff.apiary-mock.com/posts');
      const data = response.json();
      return data;
    };

    try {
      const data = await fetchData();
      dispatch(socialActions.getSocialFeed({ data }));
    } catch (err) {
      console.error(err);
      dispatch(socialActions.socialFeedError());
    }
  };
};

export const getRandomImage = (postId: string, i: number) => {
  return async (dispatch: Dispatch) => {
    const fetchImage = async () => {
      const response = await fetch(
        `https://api.unsplash.com/photos/random/?sig=${i}&query=fashion&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      );
      const data = response.json();
      return data;
    };
    try {
      const data = await fetchImage();
      dispatch(socialActions.getRandomImage({ postId, data }));
    } catch (err) {
      console.error(err);
    }
  };
};
export const loadMoreHandler = () => {
  return (dispatch: Dispatch) => {
    dispatch(socialActions.loadMore());
  };
};
