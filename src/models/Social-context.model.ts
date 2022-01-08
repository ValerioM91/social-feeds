import PostModel from './Post.model';

interface SocialState {
  socialFeed: PostModel[];
  temporalFeed: PostModel[];
  feedTypes: string[];
  socialFeedLoading: boolean;
  socialFeedError: boolean;
  loadMore: number;
}

export default SocialState;
