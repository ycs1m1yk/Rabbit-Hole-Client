import React from 'react';
import styled from 'styled-components';
import LogoImage from '@assets/images/rabbit-hole-logo.png';

const StyledLogo = styled.img<{width: number, heigth: number}>`
  width: ${(props) => `${props.width / 10}rem`};
  height: ${(props) => `${props.heigth / 10}rem`};
`;

const defaultProps = {
  src: LogoImage,
};

type LogoProps = {
  width: number;
  heigth: number;
  src?: string;
} & typeof defaultProps;

export default function Logo({ width, heigth, src }: LogoProps) {
  return (
    <StyledLogo width={width} heigth={heigth} src={src} />
  );
}

Logo.defaultProps = defaultProps;
