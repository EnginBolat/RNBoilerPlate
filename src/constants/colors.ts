// ! DEPEND ON PROJECT
export interface IBrownShades {
    darkCocoa: string;
    chestnut: string;
    bronze: string;
    sandDune: string;
    beige: string;
    lightBeige: string;
}

export interface IGreenShades {
    oliveGreen: string;
    mossGreen: string;
    forestGreen: string;
    deepOlive: string;
}

export interface IErrorShades {
    primary: string;
}

export interface IColors {
    white: string;
    brown: IBrownShades;
    green: IGreenShades;
    error: IErrorShades;
}

export const Colors: IColors = {
    white: '#FFFF',
    brown: {
        darkCocoa: '#582F0E',
        chestnut: '#7F4F24',
        bronze: '#936639',
        sandDune: '#A68A64',
        beige: '#B6AD90',
        lightBeige: '#C2C5AA',
    },
    green: {
        oliveGreen: '#A4AC86',
        mossGreen: '#656D4A',
        forestGreen: '#414833',
        deepOlive: '#333D29',
    },
    error: {
        primary: 'rgba(173, 14, 14,1)',
    },
};
