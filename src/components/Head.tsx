import { HeadProvider, Title, Meta } from 'react-head';

interface Props {
  title: string;
  description: string;
}

const Head = ({ title, description }: Props): JSX.Element => {
  return (
    <HeadProvider>
      <Title>{`${title || 'Autumn Fashion Week'} | Autumn Fashion Week`}</Title>
      <Meta name="description" content={description || 'Autumn Fashion Week Event'} />
      <Meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <Meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    </HeadProvider>
  );
};

export default Head;
