import { createSlice } from '@reduxjs/toolkit';
import formatDate from '../utils/formatDate';

import PostModel from '../models/Post.model';

export interface FilterState {
  socialFeed: PostModel[];
  filteredFeed: PostModel[];
  feedType: string[];
  sort: string;
  filters: {
    text: string;
    type: string;
  };
}

const initialState: FilterState = {
  socialFeed: [],
  filteredFeed: [],
  feedType: ['all'],
  sort: '',
  filters: {
    text: '',
    type: 'all',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    getSocialFeed(state: FilterState, action: { payload: PostModel[] }) {
      state.socialFeed = action.payload;
    },
    updateFilters(state: FilterState, action: { payload: { name: string; value: string } }) {
      const { name, value } = action.payload;
      state.filters = { ...state.filters, [name]: value };
    },
    updateSort(state: FilterState, action: { payload: { value: string } }) {
      const { value } = action.payload;
      state.sort = value;
    },
    clearText(state: FilterState) {
      state.filters.text = '';
    },
    sortPosts(state: FilterState) {
      const { sort, filteredFeed } = state;
      let tempFeed = [...filteredFeed];
      switch (sort) {
        case 'latest':
          tempFeed = filteredFeed.sort(
            (a, b) => formatDate(b.item_published) - formatDate(a.item_published)
          );
          state.filteredFeed = tempFeed;
          break;
        case 'oldest':
          tempFeed = filteredFeed.sort(
            (a, b) => formatDate(a.item_published) - formatDate(b.item_published)
          );
          state.filteredFeed = tempFeed;
          break;
        case 'a-z':
          tempFeed = filteredFeed.sort((a, b) => a.service_slug.localeCompare(b.service_slug));
          state.filteredFeed = tempFeed;
          break;
        case 'z-a':
          tempFeed = filteredFeed.sort((a, b) => b.service_slug.localeCompare(a.service_slug));
          state.filteredFeed = tempFeed;
          break;

        default:
          break;
      }
    },
    filterFeed(state: FilterState) {
      const {
        socialFeed,
        filters: { text, type },
      } = state;

      let tempFilteredFeed = [...socialFeed];

      if (text) {
        tempFilteredFeed = tempFilteredFeed.filter((post) => {
          const input = text.toLowerCase();
          const name = post.item_name.toLowerCase();

          let postText: string = '';
          let postAuthor = '';
          if (post.service_slug === 'manual' && post.item_data.text) {
            postText = post.item_data.text;
          }

          if (
            post.service_slug === 'twitter' &&
            post.item_data.tweet &&
            post.item_data.user?.username
          ) {
            postText = post.item_data.tweet;
            postAuthor = post.item_data.user.username;
          }

          if (
            post.service_slug === 'instagram' &&
            post.item_data.caption &&
            post.item_data.user?.username
          ) {
            postText = post.item_data.caption;
            postAuthor = post.item_data.user.username;
          }

          return (
            name.includes(input) ||
            postText.toLowerCase().includes(input) ||
            postAuthor.toLowerCase().includes(input)
          );
        });
      }

      if (type !== 'all') {
        tempFilteredFeed = tempFilteredFeed.filter((post) => post.service_slug === type);
      }

      state.filteredFeed = tempFilteredFeed;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice;
