import { filterActions } from './filterSlice';
import { Dispatch } from '@reduxjs/toolkit';
import PostModel from '../models/Post.model';

export const getSocialFeed = (socialFeed: PostModel[]) => {
  return (dispatch: Dispatch) => {
    dispatch(filterActions.getSocialFeed(socialFeed));
  };
};

export const updateFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
  return (dispatch: Dispatch) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(filterActions.updateFilters({ name, value }));
  };
};

export const updateSort = (e: React.ChangeEvent<HTMLInputElement>) => {
  return (dispatch: Dispatch) => {
    const value = e.target.value;
    dispatch(filterActions.updateSort({ value }));
  };
};

export const clearText = () => {
  return (dispatch: Dispatch) => {
    dispatch(filterActions.clearText());
  };
};

export const sortFeed = () => {
  return (dispatch: Dispatch) => {
    dispatch(filterActions.sortPosts());
  };
};

export const filterFeed = () => {
  return (dispatch: Dispatch) => {
    dispatch(filterActions.filterFeed());
  };
};
