import { useContext, createContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/filterReducer';
import useSocialFeedContext from './SocialFeed';
import {
  GET_SOCIAL_FEED,
  UPDATE_FILTERS,
  CLEAR_TEXT,
  FILTER_FEED,
  UPDATE_SORT,
  SORT_POSTS,
} from '../actions';

const FilterContext = createContext();
const initialState = {
  socialFeed: [],
  filteredFeed: [],
  feedType: ['all'],
  sort: '',
  filters: {
    text: '',
    type: 'all',
  },
};

export const FilterProvider = ({ children }) => {
  const { socialFeed } = useSocialFeedContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: GET_SOCIAL_FEED, payload: socialFeed });
  }, [socialFeed]);

  useEffect(() => {
    dispatch({ type: FILTER_FEED });
    dispatch({ type: SORT_POSTS });
  }, [socialFeed, state.filters, state.sort]);

  const updateFilters = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const clearText = () => {
    dispatch({ type: CLEAR_TEXT });
  };

  return (
    <FilterContext.Provider value={{ ...state, updateFilters, updateSort, clearText }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => useContext(FilterContext);
export default useFilterContext;
