import Actions from '../actions';
import nextId from 'react-id-generator';
import State from '../models/Social-context.model';
import Post from '../models/Post.model';

const socialsReducer = (state: State, action: { type: string; payload?: any }): State => {
  if (action.type === Actions.GET_SOCIAL_FEED_START) {
    return { ...state, socialFeedLoading: true };
  }

  if (action.type === Actions.GET_SOCIAL_FEED) {
    const newSocialFeed = action.payload.data.items.map((post: Post) => {
      post.item_id = nextId();
      return post;
    });
    const oldSocialFeed = state.socialFeed;
    const types = action.payload.data.items.map((item: Post) => item.service_slug);
    const typesSet = new Set([...state.feedTypes, ...types]);

    return {
      ...state,
      socialFeedLoading: false,
      socialFeed: [...oldSocialFeed, ...newSocialFeed],
      temporalFeed: [...newSocialFeed],
      feedTypes: Array.from(typesSet),
    };
  }

  if (action.type === Actions.GET_SOCIAL_FEED_ERROR) {
    return { ...state, socialFeedLoading: false, socialFeedError: true };
  }

  if (action.type === Actions.GET_RANDOM_IMAGE) {
    const feed = [...state.socialFeed];
    const postIndex = feed.findIndex((post) => post.item_id === action.payload.postId);
    const post = { ...feed[postIndex] };
    post.random_image = {
      image: action.payload.data.urls.regular,
      thumb: action.payload.data.urls.thumb,
    };
    feed[postIndex] = post;

    return {
      ...state,
      socialFeed: [...feed],
    };
  }

  if (action.type === Actions.LOAD_MORE) {
    return { ...state, loadMore: state.loadMore + 1 };
  }

  return state;
};
export default socialsReducer;
