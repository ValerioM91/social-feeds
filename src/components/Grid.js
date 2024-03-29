import Masonry from 'react-masonry-css'
import styled from 'styled-components'
import Spinner from './Spinner'
import useSocialFeedContext from '../context/SocialFeed'
import useFilterContext from '../context/FilterContext'
import Card from './Card'

const breakpointColumnsObj = {
  default: 3,
  900: 2,
  600: 1,
}

const Grid = () => {
  const { socialFeedLoading, loadMoreHandler, socialFeedError } = useSocialFeedContext()
  const { filteredFeed: posts } = useFilterContext()

  if (socialFeedLoading && posts.length === 0)
    return (
      <div className="container">
        <Spinner />
      </div>
    )

  if (socialFeedError)
    return (
      <Wrapper className="container">
        <h4 className="error">There was an error loading the posts.</h4>
      </Wrapper>
    )

  return (
    <Wrapper>
      <div className="container">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map(post => {
            return <Card key={post.item_id} post={post} />
          })}
        </Masonry>

        <div className="button-container">
          <button
            className="btn btn-xl btn-rounded"
            onClick={loadMoreHandler}
            disabled={socialFeedLoading}
          >
            Load More
          </button>

          {socialFeedLoading && <Spinner />}
        </div>
      </div>
    </Wrapper>
  )
}
export default Grid

const Wrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  position: relative;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .my-masonry-grid {
    display: flex;
    margin-left: -3rem; /* gutter size offset */
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 3rem; /* gutter size */
    background-clip: padding-box;
  }

  .my-masonry-grid_column > .card {
    margin-bottom: 3rem;
  }

  .button-container {
    text-align: center;
  }

  .btn {
    transition: 0s filter, 0s -webkit-filter;
  }

  .btn[disabled] {
    filter: brightness(0.7);
  }

  .error {
    text-align: center;
  }

  @media screen and (min-width: 900px) {
    .my-masonry-grid {
      margin-left: -4rem;
    }
    .my-masonry-grid_column {
      padding-left: 4rem;
    }

    .my-masonry-grid_column > .card {
      margin-bottom: 4rem;
    }
  }
`
