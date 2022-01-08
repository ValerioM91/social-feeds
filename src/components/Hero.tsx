import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  heading?: string;
  image?: string;
  position?: string;
}

const Hero: React.FC<Props> = ({ heading, image, position }) => {
  return (
    <Wrapper className={position}>
      <figure className="image">
        <img src={image} alt={heading} />
      </figure>
      <div className="container">
        <h1 className="heading">{heading}</h1>
      </div>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0%;
  height: 100%;
  width: 100%;
  transition: all 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &.previous {
    left: -100%;
  }

  &.next {
    left: 100%;
  }

  .heading {
    color: var(--white);
    position: relative;
    line-height: 1.3;
    text-align: center;
    margin: auto;
  }

  .image {
    position: absolute;
    height: 100%;
    width: 100%;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  @media screen and (min-width: 768px) {
    .heading {
      width: calc(100% - 10rem);
    }
  }
`;
