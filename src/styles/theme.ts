import { DefaultTheme } from 'styled-components';

const size = {
  mobile: '767px',
  desktop: '768px',
};

const theme: DefaultTheme = {
  palette: {
    eliceViolet: '#6700E6',
    lightViolet: '#6F52D9',
    eliceBlue: '#524FA1',
    carrotOrange: '#EB9A29',
    lightBlue: '#F0F1F3',
    borderGray: '#DEE2E6',
    gray: '#747474',
    black: '#151618',
  },
  status: {
    verifyGreen: '#59FE7D',
    warningRed: '#FF0000',
  },
  devices: {
    desktop: `min-width: ${size.desktop}`,
    mobile: `max-width: ${size.mobile}`,
  },
};

export default theme;
