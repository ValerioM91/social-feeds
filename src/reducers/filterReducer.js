import {
  GET_SOCIAL_FEED,
  UPDATE_FILTERS,
  CLEAR_TEXT,
  FILTER_FEED,
  UPDATE_SORT,
  SORT_POSTS,
} from '../actions';
import formatDate from '../utils/formatDate';

const reducer = (state, action) => {
  if (action.type === GET_SOCIAL_FEED) {
    return {
      ...state,
      socialFeed: action.payload,
    };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: { ...state.filters, [name]: value },
    };
  }

  if (action.type === UPDATE_SORT) {
    const value = action.payload;
    return { ...state, sort: value };
  }

  if (action.type === SORT_POSTS) {
    const { sort, filteredFeed } = state;
    let tempFeed = [...filteredFeed];
    if (sort === 'latest') {
      tempFeed = filteredFeed.sort(
        (a, b) => formatDate(b.item_published) - formatDate(a.item_published)
      );
      return { ...state, filteredFeed: tempFeed };
    }
    if (sort === 'oldest') {
      tempFeed = filteredFeed.sort(
        (a, b) => formatDate(a.item_published) - formatDate(b.item_published)
      );
      return { ...state, filteredFeed: tempFeed };
    }
    if (sort === 'a-z') {
      tempFeed = filteredFeed.sort((a, b) => a.service_slug.localeCompare(b.service_slug));
      return { ...state, filteredFeed: tempFeed };
    }
    if (sort === 'z-a') {
      tempFeed = filteredFeed.sort((a, b) => b.service_slug.localeCompare(a.service_slug));
      return { ...state, filteredFeed: tempFeed };
    }
    return {
      ...state,
    };
  }

  if (action.type === FILTER_FEED) {
    const {
      socialFeed,
      filters: { text, type },
    } = state;

    let tempFilteredFeed = [...socialFeed];

    if (text) {
      tempFilteredFeed = tempFilteredFeed.filter((post) => {
        const input = text.toLowerCase();
        const name = post.item_name.toLowerCase();

        let postText = '';
        let postAuthor = '';
        if (post.service_slug === 'manual') {
          postText = post.item_data.text;
        }

        if (post.service_slug === 'twitter') {
          postText = post.item_data.tweet;
          postAuthor = post.item_data.user.username;
        }

        if (post.service_slug === 'instagram') {
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

    return { ...state, filteredFeed: tempFilteredFeed };
  }

  if (action.type === CLEAR_TEXT) {
    const {
      filters: { type },
    } = state;

    return { ...state, filters: { text: '', type } };
  }

  return state;
};

export default reducer;
