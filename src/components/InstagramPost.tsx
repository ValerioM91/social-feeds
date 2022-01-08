import styled from 'styled-components';
import parseInstagramPost from '../utils/parseInstagramPost';
import PostModel from '../models/Post.model';

interface Props {
  post: PostModel;
}

const InstagramPost: React.FC<Props> = ({ post }) => {
  const {
    item_data: { caption, link, user },
  } = post;

  const username = user?.username;

  return (
    <Wrapper>
      <a href={link} className="link">
        <h5>{username}</h5>
      </a>
      {caption && <p>{parseInstagramPost(caption)}</p>}
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
