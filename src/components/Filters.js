import styled from 'styled-components';
import useSocialFeedContext from '../context/SocialFeed';
import useFilterContext from '../context/FilterContext';
import { RiArrowDownSLine, RiCloseCircleFill } from 'react-icons/ri';

const Filters = () => {
  const { feedTypes } = useSocialFeedContext();
  const { updateFilters, updateSort, filters, clearText } = useFilterContext();

  return (
    <Wrapper className="block">
      <div className="container">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="select-wrap">
            <select name="sort" onChange={updateSort}>
              <option value="">Select an option</option>
              <option value="latest">Most Recent</option>
              <option value="oldest">Least Recent</option>
            </select>
            <RiArrowDownSLine />
          </div>

          <div className="button-container">
            {feedTypes.map((type, i) => (
              <button
                key={i}
                className={`btn btn-rounded${type === filters.type ? ' active' : ' btn-white'}`}
                name="type"
                value={type}
                onClick={updateFilters}
              >
                {type === 'manual' ? 'AFF' : type}
              </button>
            ))}
          </div>
          <div className="text-input-wrap">
            <input
              className="text-input"
              type="text"
              name="text"
              placeholder="Search..."
              value={filters.text}
              onChange={updateFilters}
            />
            {filters.text && <RiCloseCircleFill onClick={clearText} />}
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Filters;

const Wrapper = styled.div`
  form {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: space-between;
    column-gap: 2.5rem;
    row-gap: 1.5rem;
  }

  .select-wrap {
    position: relative;
    display: inline-block;
    width: fit-content;
    width: 100%;

    svg {
      position: absolute;
      right: 1rem;
      height: 2rem;
      width: 2rem;
      top: 1.3rem;
      color: var(--primary-color);
    }
  }

  select {
    width: 100%;
    outline: none;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    padding: 1.3rem 2.5rem;
    border-radius: 2.5rem;
    font-size: 1.4rem;
    font-family: var(--font-family);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .button-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .btn {
    margin: 0.5rem;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .text-input-wrap {
    position: relative;
    width: 100%;

    svg {
      position: absolute;
      right: 1.5rem;
      height: 2rem;
      width: 2rem;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }

  .text-input {
    padding: 1.5rem 4rem 1.5rem 2.5rem;
    border-radius: 2.5rem;
    border: none;
    outline: none;
    background-color: var(--bg-grey);
    /* width: 225px; */
    width: 100%;
    font-size: 14px;
    color: var(--black);
  }

  @media screen and (min-width: 768px) {
    form {
      display: grid;
      grid-template-columns: auto auto;
      justify-content: space-between;
    }

    select {
      width: 250px;
    }

    .text-input-wrap {
      grid-column: 1 / -1;
    }

    .text-input {
      width: 100%;
    }
  }

  @media screen and (min-width: 992px) {
    form {
      grid-template-columns: auto auto auto;
    }

    .text-input-wrap {
      grid-column: auto;
    }

    .text-input {
      width: 250px;
    }
  }
`;
