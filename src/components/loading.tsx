import React from 'react';
import styled from 'styled-components';

const defaultProps = {
  size: 5,
};

type circleProps = {
  size?:number,
} & typeof defaultProps

const LoadingCircle = styled.div<circleProps>`
  display: inline-block;
  width: ${(props) => props.size}rem;
  height:${(props) => props.size}rem;
  border:${(props) => (props.size / 15)}rem solid white;
  border-radius: 50%;
  border-top-color: ${(props) => props.theme.palette.gray};
  position: fixed;
  top: calc(50% - ${(props) => (props.size) / 2}rem);
  left: calc(50% - ${(props) => (props.size) / 2}rem);
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
  to { -webkit-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
  } 
`;

function Loading({ size }:circleProps) {
  return (
    <LoadingCircle size={size} />
  );
}

Loading.defaultProps = defaultProps;

export default Loading;
