import { HeadProvider, Title, Meta } from 'react-head'

const Head = ({ title, description }) => {
  return (
    <HeadProvider>
      <Title>{`${title || 'Autumn Fashion Fix'} | Autumn Fashion Fix`}</Title>
      <Meta name="description" content={description || 'Autumn Fashion Fix Event'} />
      <Meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <Meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    </HeadProvider>
  )
}

export default Head
