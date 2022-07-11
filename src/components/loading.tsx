import React from 'react';
import styled from 'styled-components';

const defaultProps = {
  position: 'relative',
  size: 5,
};

type circleProps = {
  size?:number,
  position?: string,
} & typeof defaultProps

const LoadingCircle = styled.div<circleProps>`
  display: inline-block;
  position: ${(props) => props.position};
  width: ${(props) => props.size}rem;
  height:${(props) => props.size}rem;
  border:${(props) => (props.size / 15)}rem solid white;
  border-radius: 50%;
  border-top-color: ${(props) => props.theme.palette.gray};
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
  to { -webkit-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
  } 
`;

function Loading({ size, position }:circleProps) {
  return (
    <LoadingCircle size={size} position={position} />
  );
}

Loading.defaultProps = defaultProps;

export default Loading;
