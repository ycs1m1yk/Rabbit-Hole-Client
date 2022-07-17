import 'styled-components';

declare module 'styled-components'{
    export interface DefaultTheme {
        palette: {
            eliceViolet: string,
            lightViolet: string,
            eliceBlue: string,
            carrotOrange: string,
            borderGray: string,
            gray: string,
            black: string,
        },
        status: {
            verifyGreen: string,
            warningRed: string,
        },
        devices: {
            desktop: string,
            mobile: string,
        },
    }
}
