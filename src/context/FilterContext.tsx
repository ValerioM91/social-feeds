import React, { useContext, createContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/filterReducer';
import useSocialFeedContext from './SocialFeed';
import Actions from '../actions';
import FilterContextModel from '../models/Filter-context.model';

const FilterContext = createContext({});
const initialState: FilterContextModel = {
  socialFeed: [],
  filteredFeed: [],
  feedType: ['all'],
  sort: '',
  filters: {
    text: '',
    type: 'all',
  },
};

export const FilterProvider: React.FC = ({ children }) => {
  const { socialFeed } = useSocialFeedContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: Actions.GET_SOCIAL_FEED, payload: socialFeed });
  }, [socialFeed]);

  useEffect(() => {
    dispatch({ type: Actions.FILTER_FEED });
    dispatch({ type: Actions.SORT_POSTS });
  }, [socialFeed, state.filters, state.sort]);

  const updateFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: Actions.UPDATE_FILTERS, payload: { name, value } });
  };

  const updateSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: Actions.UPDATE_SORT, payload: value });
  };

  const clearText = () => {
    dispatch({ type: Actions.CLEAR_TEXT });
  };

  return (
    <FilterContext.Provider value={{ ...state, updateFilters, updateSort, clearText }}>
      {children}
    </FilterContext.Provider>
  );
};

interface ContextInterface extends FilterContextModel {
  updateFilters(): void;
  updateSort(): void;
  clearText(): void;
}

const useFilterContext = () => useContext(FilterContext) as ContextInterface;
export default useFilterContext;
