const ManualPost = ({ post }) => {
  const {
    item_data: { link, link_text, text },
  } = post;

  return (
    <div>
      {text && <p>{text}</p>}
      {link && (
        <p>
          <a target="_blank" rel="noreferrer" className="underline" href={link}>
            {link_text}
          </a>
        </p>
      )}
    </div>
  );
};

export default ManualPost;
