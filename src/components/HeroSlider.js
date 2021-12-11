import { useState } from 'react';
import styled from 'styled-components';
import { heros as herosData } from '../data';
import Hero from './Hero';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const HeroSlider = () => {
  const [heros] = useState(herosData);
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const nextHero = () => {
    if (index === heros.length - 1) return setIndex(0);
    return setIndex(index + 1);
  };

  const previousHero = () => {
    if (index === 0) return setIndex(heros.length - 1);
    return setIndex(index - 1);
  };

  const touchStartHandler = (e) => {
    return setTouchStart(e.touches[0].clientX);
  };

  const touchMoveHandler = (e) => {
    const position = e.changedTouches[0].clientX;

    if (position - touchStart > 150) return previousHero();
    if (position - touchStart < -150) return nextHero();
  };

  return (
    <Wrapper onTouchStart={(e) => touchStartHandler(e)} onTouchEnd={(e) => touchMoveHandler(e)}>
      {heros.map((hero, heroIndex) => {
        let position = 'next';
        if (heroIndex === index) position = 'center';
        if (heroIndex === index - 1 || (heroIndex === 0 && index === heros.length - 1))
          position = 'previous';

        return <Hero className="hero" key={hero.id} {...hero} position={position} />;
      })}
      <div className="dots">
        {heros.map((_, heroIndex) => (
          <span
            key={heroIndex}
            className={`dot${index === heroIndex ? ' active' : ''}`}
            onClick={() => setIndex(heroIndex)}
          ></span>
        ))}
      </div>
      <button onClick={previousHero}>
        <IoIosArrowBack />
      </button>
      <button onClick={nextHero}>
        <IoIosArrowForward />
      </button>
    </Wrapper>
  );
};

export default HeroSlider;

const Wrapper = styled.div`
  overflow: hidden;
  height: 400px;
  width: 100%;
  position: relative;
  margin-bottom: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .hero-slider__container {
    height: 100%;
    position: relative;
  }

  .dots {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    z-index: 1;
    bottom: 2.4rem;
  }

  .dot {
    border-radius: 50%;
    border: 1px solid var(--white);
    height: 1.5rem;
    width: 1.5rem;
    margin: 0 1rem;
    background-color: rgba(255, 255, 255, 0.25);
    cursor: pointer;
    &.active {
      background-color: var(--white);
    }
  }

  button {
    background-color: transparent;
    position: relative;
    height: 4rem;
    width: 4rem;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 2.5vw;

    svg {
      height: 3rem;
      width: 3rem;
      fill: var(--white);
      transition: var(--transition);
    }

    &:hover {
      svg {
        fill: var(--primary-color);
      }
    }
  }

  @media screen and (min-width: 768px) {
    height: 70rem;
    margin-bottom: 8rem;
    align-items: center;

    .dots {
      bottom: 4rem;
    }

    button {
      display: block;

      svg {
        height: 4rem;
        width: 4rem;
      }
    }
  }

  @media screen and (min-width: 1400px) {
    button {
      margin: 5rem;
      display: block;
    }

    .dot {
      margin: 0 1.5rem;
      padding: 1rem;
    }
  }
`;
