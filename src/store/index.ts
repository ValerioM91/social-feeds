import { configureStore } from '@reduxjs/toolkit';

import socialSlice, { SocialState } from './socialSlice';
import filterSlice, { FilterState } from './filterSlice';

const store = configureStore({
  reducer: { socials: socialSlice.reducer, filteredSocials: filterSlice.reducer },
});

export default store;

export interface StateModel {
  socials: SocialState;
  filteredSocials: FilterState;
}
