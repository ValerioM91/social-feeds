interface PostModel {
  item_id: string;
  service_slug: string;
  item_published: string;
  item_name: string;
  random_image: { image?: string; thumb?: string };
  item_data: {
    link?: string;
    link_text?: string;
    text?: string;
    tweet?: string;
    caption?: string;
    user?: {
      username?: string;
    };
  };
}

export default PostModel;
