import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

interface ButtonProps{
  children: React.ReactNode,
  size?: string,
  outline?: boolean,
  // eslint-disable-next-line no-unused-vars
  onClick: (event: React.MouseEvent<HTMLDivElement>)=>void;
}

interface SizeProps{
  [index:string]:{
    height:string,
    fontSize: string
  }
}

const sizes:SizeProps = {
  large: {
    height: '3rem',
    fontSize: '1.25rem',
  },
  medium: {
    height: '2.25rem',
    fontSize: '1rem',
  },
  small: {
    height: '1.75rem',
    fontSize: '0.875rem',
  },
};

const sizeStyles = css`
  ${(props:ButtonProps) => css`
    height: ${props.size && sizes[props.size].height};
    font-size: ${props.size && sizes[props.size].fontSize};
  `}
`;

const StyledButton = styled.div<ButtonProps>`

  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  font-family: 'EliceBold';
  border-radius: 2px;
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
};

export default function Button({
  children, size = 'medium', outline = false, onClick,
}:ButtonProps) {
  return (
    <StyledButton
      size={size}
      outline={outline}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = defaultProps;
