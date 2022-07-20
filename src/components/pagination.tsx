import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight,
} from 'react-icons/ai';
import { lighten } from 'polished';

const defaultProps = {
  length: 10,
  show: 5,
  start: 0,
};

type PaginationProps = {
  length?: number,
  show?: number,
  start?: number,
  // eslint-disable-next-line no-unused-vars
  handler: (pageNumber: number)=>void
} & typeof defaultProps;

const Container = styled.div`
  display:inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
`;

const CardContainer = styled.div`
  display: inline-flex;
  margin-right: 1rem;
  border-left: 1px solid ${(props) => props.theme.palette.borderGray};
`;

const Card = styled.div<{selected?: boolean, disable?: boolean}>`
  color: ${({ theme, selected, disable }) => {
    if (disable) {
      return theme.palette.borderGray;
    }
    return selected ? 'white' : theme.palette.gray;
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  width:2.4rem;
  height: 2.4rem;
  cursor: ${({ disable }) => !disable && 'pointer'};
  background-color: ${({ theme, selected }) => selected && lighten('0.2', theme.palette.eliceViolet)};
  border-top: 1px solid ${(props) => props.theme.palette.borderGray};
  border-right: 1px solid ${(props) => props.theme.palette.borderGray};
  border-bottom: 1px solid ${(props) => props.theme.palette.borderGray};
  &:hover{
    background-color: ${({ theme, selected, disable }) => (!disable && !selected) && lighten('0.5', theme.palette.eliceViolet)}
  }
`;

export default function Pagination({
  length, show, start, handler,
}:PaginationProps) {
  const initArray = Array.from({ length }, (_, i) => i);
  const [pageKey, setPageKey] = useState(start);

  useEffect(() => {
    setPageKey(start);
  }, [start]);

  // 버튼(Card) 클릭 시 페이지 상태관리 및 props의 handler(maybe routing) 실행
  const numberingHandler = (e:React.MouseEvent<HTMLDivElement>, pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber < length) {
      setPageKey(pageNumber);
      handler(pageNumber);
    }
  };

  return (
    <Container>
      <CardContainer>
        {/* 맨 앞으로 */}
        <Card disable={pageKey === 0} onClick={(e) => { if (pageKey > 0)numberingHandler(e, 0); }}>
          <AiOutlineDoubleLeft />
        </Card>
        {/* 한 페이지 앞 */}
        <Card disable={pageKey === 0} onClick={(e) => { numberingHandler(e, pageKey - 1); }}>
          <AiOutlineLeft />
        </Card>
      </CardContainer>
      <CardContainer>
        {/* show 단위 이동 */}
        {pageKey >= show
        && (
        <Card onClick={(e) => { numberingHandler(e, (Math.floor(pageKey / show) - 1) * show); }}>
          ...
        </Card>
        )}
        {/* 직접 이동 */}
        {initArray.slice(
          Math.floor(pageKey / show) * show,
          (Math.floor(pageKey / show) * show) + show,
        ).map((page) => (
          <Card
            key={page}
            selected={page === pageKey}
            onClick={(e) => { numberingHandler(e, page); }}
          >
            {page + 1}
          </Card>
        ))}
        {/* show 단위 이동 */}
        {(pageKey < ((Math.floor(length / show)) * show) - (length % show ? 0 : show))
        && (
        <Card onClick={(e) => { numberingHandler(e, (Math.floor(pageKey / show) + 1) * show); }}>
          ...
        </Card>
        )}
      </CardContainer>
      <CardContainer>
        {/* 한 페이지 뒤 */}
        <Card
          disable={pageKey === length - 1}
          onClick={(e) => { numberingHandler(e, pageKey + 1); }}
        >
          <AiOutlineRight />
        </Card>
        {/* 맨 뒤로 */}
        <Card
          disable={pageKey === length - 1}
          onClick={(e) => { if (pageKey < length - 1)numberingHandler(e, length - 1); }}
        >
          <AiOutlineDoubleRight />
        </Card>
      </CardContainer>
    </Container>
  );
}
Pagination.defaultProps = defaultProps;
