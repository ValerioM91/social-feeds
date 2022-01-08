import { createSlice } from '@reduxjs/toolkit';
import nextId from 'react-id-generator';

import PostModel from '../models/Post.model';

export interface SocialState {
  socialFeed: PostModel[];
  temporalFeed: PostModel[];
  feedTypes: string[];
  socialFeedLoading: boolean;
  socialFeedError: boolean;
  loadMore: number;
}

const initialState: SocialState = {
  socialFeed: [],
  temporalFeed: [],
  feedTypes: ['all'],
  socialFeedLoading: true,
  socialFeedError: false,
  loadMore: 0,
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    socialFeedStart(state: SocialState) {
      state.socialFeedLoading = true;
    },
    getSocialFeed(state: SocialState, action: { payload: { data: { items: PostModel[] } } }) {
      const newSocialFeed = action.payload.data.items.map((post: PostModel) => {
        post.item_id = nextId();
        return post;
      });
      const oldSocialFeed = state.socialFeed;
      const types = action.payload.data.items.map((item: PostModel) => item.service_slug);
      const typesSet = new Set([...state.feedTypes, ...types]);

      state.socialFeedLoading = false;
      state.socialFeed = [...oldSocialFeed, ...newSocialFeed];
      state.temporalFeed = [...newSocialFeed];
      state.feedTypes = Array.from(typesSet);
    },
    socialFeedError(state: SocialState) {
      state.socialFeedLoading = false;
      state.socialFeedError = true;
    },
    getRandomImage(
      state: SocialState,
      action: { payload: { postId: string; data: { urls: { regular: string; thumb: string } } } }
    ) {
      const feed = [...state.socialFeed];
      const postIndex = feed.findIndex((post) => post.item_id === action.payload.postId);
      const post = { ...feed[postIndex] };
      post.random_image = {
        image: action.payload.data.urls.regular,
        thumb: action.payload.data.urls.thumb,
      };
      feed[postIndex] = post;

      state.socialFeed = feed;
    },
    loadMore(state: SocialState) {
      state.loadMore = state.loadMore + 1;
    },
  },
});

export const socialActions = socialSlice.actions;

export default socialSlice;
