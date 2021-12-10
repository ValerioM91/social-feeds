import { HeadProvider, Title, Meta } from 'react-head';

const Head = ({ title, description }) => {
  return (
    <HeadProvider>
      <Title>{`${title || 'Autumn Fashion Fix'} | Autumn Fashion Fix`}</Title>
      <Meta name="description" content={description || 'Autumn Fashion Fix Event'} />
      <Meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    </HeadProvider>
  );
};

export default Head;
