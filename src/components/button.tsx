import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

interface ButtonProps{
  children: React.ReactNode,
  size?: string,
  outline?: boolean,
  // eslint-disable-next-line no-unused-vars
  onClick: (event: React.MouseEvent<HTMLDivElement>)=>void,
  fullSize?: boolean,
}

interface SizeProps{
  [index:string]:{
    height:string,
    fontSize: string
  }
}

const sizes:SizeProps = {
  large: {
    height: '4.8rem',
    fontSize: '2rem',
  },
  medium: {
    height: '3.6rem',
    fontSize: '1.6rem',
  },
  small: {
    height: '2.8rem',
    fontSize: '1.4rem',
  },
};

const sizeStyles = css`
  ${(props:ButtonProps) => css`
    height: ${props.size && sizes[props.size].height};
    font-size: ${props.size && sizes[props.size].fontSize};
  `}
`;

const StyledButton = styled.button<ButtonProps>`
  border: none;
  width: ${(props) => props.fullSize && '100%'};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  font-family: 'EliceBold';
  border-radius: 4px;
  white-space: nowrap;
  ${(props) => (props.outline
    ? css`
      color: ${props.theme.palette.eliceViolet};
      border: solid 1px ${props.theme.palette.eliceViolet};
      &:hover {
        border: solid 1px ${darken(0.1, props.theme.palette.eliceViolet)};
        background: ${lighten(0.5, props.theme.palette.eliceViolet)};
      }
    `
    : css`
      color: white;
      background-color: ${props.theme.palette.eliceViolet};
      &:hover {
        background: ${lighten(0.1, props.theme.palette.eliceViolet)};
      }
    `)}

  ${sizeStyles}
`;

const defaultProps = {
  size: 'medium',
  outline: false,
  fullSize: false,
};

export default function Button({
  children, size = 'medium', outline = false, onClick, fullSize = false,
}:ButtonProps) {
  return (
    <StyledButton
      size={size}
      outline={outline}
      onClick={onClick}
      fullSize={fullSize}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = defaultProps;
