import styled from 'styled-components';
import parseInstagramPost from '../utils/parseInstagramPost';

const InstagramPost = ({ post }) => {
  const {
    item_data: {
      caption,
      link,
      user: { username },
    },
  } = post;

  return (
    <Wrapper>
      <a href={link} className="link">
        <h5>{username}</h5>
      </a>
      <p>{parseInstagramPost(caption)}</p>
    </Wrapper>
  );
};

export default InstagramPost;

const Wrapper = styled.div`
  .link {
    color: var(--black);
    text-decoration: none;
  }
`;
