import { useEffect, createContext, useContext, useReducer } from 'react'
import reducer from '../reducers/socialsReducer'
import {
  GET_SOCIAL_FEED,
  GET_SOCIAL_FEED_START,
  GET_SOCIAL_FEED_ERROR,
  LOAD_MORE,
  GET_RANDOM_IMAGE,
} from '../actions'

const SocialFeedContext = createContext()

const initialState = {
  socialFeed: [],
  temporalFeed: [],
  feedTypes: ['all'],
  socialFeedLoading: true,
  socialFeedError: false,
  loadMore: 0,
}

export const SocialFeedProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getFeed = async () => {
    dispatch({ type: GET_SOCIAL_FEED_START })
    try {
      const response = await fetch('https://private-cc77e-aff.apiary-mock.com/posts')
      const data = await response.json()
      dispatch({ type: GET_SOCIAL_FEED, payload: { data } })
    } catch (err) {
      console.error(err)
      dispatch({ type: GET_SOCIAL_FEED_ERROR })
    }
  }

  const getRandomImage = async (postId, i) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random/?sig=${i}&query=fashion&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
      )
      const data = await response.json()
      dispatch({ type: GET_RANDOM_IMAGE, payload: { postId, data } })
    } catch (err) {
      console.error(err)
    }
  }

  const loadMoreHandler = () => {
    dispatch({ type: LOAD_MORE })
  }

  useEffect(() => {
    getFeed()
  }, [state.loadMore])

  useEffect(() => {
    state.temporalFeed.forEach((post, i) => {
      if (post.service_slug === 'twitter') return
      getRandomImage(post.item_id, i)
    })
  }, [state.temporalFeed])

  return (
    <SocialFeedContext.Provider value={{ ...state, loadMoreHandler }}>
      {children}
    </SocialFeedContext.Provider>
  )
}

const useSocialFeedContext = () => useContext(SocialFeedContext)

export default useSocialFeedContext
