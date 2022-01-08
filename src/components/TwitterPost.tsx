import parseTweet from '../utils/parseTweet';
import PostModel from '../models/Post.model';

interface Props {
  post: PostModel;
}

const TwitterPost: React.FC<Props> = ({ post }) => {
  const {
    item_data: { tweet, user },
  } = post;

  const username = user?.username;

  return (
    <div>
      <h4>{username}</h4>
      {tweet && <p>{parseTweet(tweet)}</p>}
    </div>
  );
};

export default TwitterPost;
