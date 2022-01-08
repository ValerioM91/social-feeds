import Post from './Post.model';
interface FilterModel {
  socialFeed: Post[];
  filteredFeed: Post[];
  feedType: string[];
  sort: string;
  filters: {
    text: string;
    type: string;
  };
}

export default FilterModel;
