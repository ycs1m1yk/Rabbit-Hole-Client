import React from 'react';
import styled from 'styled-components';

const StyledSearch = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;

    width: 30rem;
    height: 4.5rem;

    border: 1px solid ${(props) => props.theme.palette.borderGray};
    border-radius: 40px;
`;

export default function Search() {
  return (
    <StyledSearch>
      검색바
    </StyledSearch>
  );
}
