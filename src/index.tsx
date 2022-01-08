import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SocialFeedProvider } from './context/SocialFeed';
import { FilterProvider } from './context/FilterContext';

ReactDOM.render(
  <React.StrictMode>
    <SocialFeedProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </SocialFeedProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
