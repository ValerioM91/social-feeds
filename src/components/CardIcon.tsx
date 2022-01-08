import styled from 'styled-components';
import { FaInstagram, FaTwitter } from 'react-icons/fa';

interface Props {
  type: string;
}

const CardIcon: React.FC<Props> = ({ type }) => {
  return (
    <Wrapper className={type}>
      {type === 'instagram' ? (
        <FaInstagram />
      ) : type === 'twitter' ? (
        <FaTwitter />
      ) : (
        <span>AFF</span>
      )}
    </Wrapper>
  );
};

export default CardIcon;

const Wrapper = styled.div`
  position: absolute;
  left: 4rem;
  top: -1rem;
  padding: 0.6rem;
  width: 4.5rem;
  height: 5rem;
  text-align: center;
  color: white;
  border-radius: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  svg {
    width: 100%;
    height: 100%;
  }

  &.manual {
    background-color: var(--primary-color);
    font-weight: 500;
  }

  &.twitter {
    background-color: #1da1f2;
  }

  &.instagram {
    background: radial-gradient(
        circle farthest-corner at 32% 106%,
        rgb(255, 225, 125) 0%,
        rgb(255, 205, 105) 10%,
        rgb(250, 145, 55) 28%,
        rgb(235, 65, 65) 42%,
        transparent 82%
      ),
      linear-gradient(135deg, rgb(35, 75, 215) 12%, rgb(195, 60, 190) 58%);
  }
`;
