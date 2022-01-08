import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './global.css';
import styled from 'styled-components';
import Head from './components/Head';
import Grid from './components/Grid';
import Filters from './components/Filters';
import HeroSlider from './components/HeroSlider';
import { getFeed, getRandomImage } from './store/socialActions';
import { getSocialFeed, sortFeed, filterFeed } from './store/filtersActions';
import { StateModel } from './store';
import PostModel from './models/Post.model';

function App() {
  const dispatch = useDispatch();
  const loadMore = useSelector((state: StateModel) => state.socials.loadMore);
  const temporalFeed = useSelector((state: StateModel) => state.socials.temporalFeed);
  const socialFeed = useSelector((state: StateModel) => state.socials.socialFeed);

  const unfilterFeed = useSelector((state: StateModel) => state.filteredSocials.socialFeed);
  const filters = useSelector((state: StateModel) => state.filteredSocials.filters);
  const sort = useSelector((state: StateModel) => state.filteredSocials.sort);

  useEffect(() => {
    dispatch(getFeed());
  }, [loadMore, dispatch]);

  useEffect(() => {
    temporalFeed.forEach((post: PostModel, i: number) => {
      if (post.service_slug === 'twitter') return;
      dispatch(getRandomImage(post.item_id, i));
    });
  }, [temporalFeed, dispatch]);

  useEffect(() => {
    dispatch(getSocialFeed(socialFeed));
  }, [socialFeed, dispatch]);

  useEffect(() => {
    dispatch(filterFeed());
    dispatch(sortFeed());
  }, [unfilterFeed, filters, sort, dispatch]);

  return (
    <>
      <Head
        title="Social Feed"
        description="Latest Instagram & Twitter Posts for the upcoming event"
      />
      <Wrapper className="App">
        <HeroSlider />
        <Filters />
        <Grid />
      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  margin-bottom: 15rem;
`;
