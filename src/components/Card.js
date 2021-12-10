import styled from 'styled-components';
import CardIcon from './CardIcon';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import relativeTimestamps from '../utils/relativeTimestamps';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ManualPost from './ManualPost';
import TwitterPost from './TwitterPost';
import InstagramPost from './InstagramPost';

const Card = ({ post }) => {
  const { service_slug: type, item_published: date, item_name: title, random_image } = post;

  const image = random_image?.image;
  const thumb = random_image?.thumb;

  return (
    <Wrapper className={`card${!image ? ' padding-top' : ''}`}>
      <CardIcon type={type} />
      {image && (
        <LazyLoadImage
          className="image"
          src={image}
          alt={title}
          effect="blur"
          placeholderSrc={thumb}
        />
      )}
      {type === 'manual' ? (
        <ManualPost post={post} />
      ) : type === 'twitter' ? (
        <TwitterPost post={post} />
      ) : type === 'instagram' ? (
        <InstagramPost post={post} />
      ) : null}
      <p className="date">{relativeTimestamps(date)}</p>
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.div`
  padding: 2.5rem;
  border: 1px solid var(--grey-2);
  border-radius: var(--border-radius);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &.padding-top {
    padding-top: 5.5rem;
  }

  .image {
    width: 100%;
    height: 20rem;
    object-fit: cover;
    margin-bottom: 2rem;
  }

  p {
    margin-bottom: 1rem;
  }

  .date {
    color: var(--grey-2);
  }

  @media screen and (min-width: 900px) {
  }
`;
