import parseTweet from '../utils/parseTweet';

const TwitterPost = ({ post }) => {
  const {
    item_data: {
      tweet,
      user: { username },
    },
  } = post;
  return (
    <div>
      <h4>{username}</h4>
      <p>{parseTweet(tweet)}</p>
    </div>
  );
};

export default TwitterPost;
