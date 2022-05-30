type KvPair = { [key: string]: string };

// This is a very expensive function that creates a lot of classes. This is done at built-time and
// purgeCSS ABSOLUTELY should be applied, so this isn't too big of an issue, but still note worthy
export const create8PtGrid = (max = 512): KvPair => {
  const finalGrid: KvPair = {
    '0': '0px',
  };

  let currentGridStep = 8;
  while (currentGridStep <= max) {
    finalGrid[currentGridStep.toString()] = `${currentGridStep}px`;
    currentGridStep += 8;
  }

  return finalGrid;
};

const grid = create8PtGrid();

const fractionalSizes = {
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%',
  '12/12': '100%',
  full: '100%',
};

export const defaultTheme = {
  colors: {
    primary: {
      DEFAULT: '#DC602E',
      dark: '#C34715',
      light: '#F67A48',
      type: '#FFF',
    },
    secondary: {
      DEFAULT: '#FFF',
      dark: '#E6E6E6',
      light: '#FFF',
      type: '#444',
    },
  },
  fontFamily: {
    body: ['"Source Sans Pro"', 'sans-serif'],
    display: ['"Oxygen"', 'sans-serif'],
  },
};

export const createConfig = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  content: any,
  theme = defaultTheme,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  extensions: any = {},
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  overrides: any = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Partial<any> => ({
  content,
  theme: {
    borderRadius: {
      none: '0',
      DEFAULT: '8px',
      round: '9999px',
    },
    boxShadow: {
      'level-1': 'none',
      'level-2': '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'level-3': '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
      'level-4': '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
      'level-5': '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    colors: {
      accent: '#016FB9',
      'bg-dark': '#222',
      'bg-light': '#F6F9FC',
      negative: {
        dark: '#E53130',
        DEFAULT: '#FE4A49',
        light: '#FF6463',
      },
      positive: {
        dark: '#46943D',
        DEFAULT: '#5FAD56',
        light: '#79C770',
      },
      warning: {
        dark: '#D9A835',
        DEFAULT: '#F2C14E',
        light: '#FFDB68',
      },
      black: '#444',
      white: '#FFF',
      ...theme.colors,
    },
    extend: {
      ...extensions,
    },
    flexBasis: {
      ...grid,
      ...fractionalSizes,
    },
    fontFamily: theme.fontFamily,
    // Sizes come from https://gridlover.net/ - Font size 16, Line Height 1.5, Scale Factor 1.618
    fontSize: {
      body: '16px',
      'heading-xxl': '177px',
      'heading-xl': '110px',
      'heading-lg': '68px',
      'heading-md': '42px',
      'heading-sm': '24px',
      'heading-xs': '16px',
    },
    height: {
      ...grid,
      ...fractionalSizes,
      screen: '100vh',
    },
    inset: {
      checkbox: '-24px',
      tooltip: '-16px',
      ...grid,
      ...fractionalSizes,
    },
    lineHeight: {
      body: '24px',
      'heading-xxl': '184px',
      'heading-xl': '112px',
      'heading-lg': '72px',
      'heading-md': '48px',
      'heading-sm': '32px',
      'heading-xs': '24px',
    },
    margin: {
      auto: 'auto',
      ...grid,
    },
    maxHeight: {
      ...grid,
      ...fractionalSizes,
      screen: '100vh',
    },
    maxWidth: {
      // These are arbitrary values pulled somewhat from bootstrap 5.
      // TODO: Somebody should do more research here
      'container-long-form': '720px',
      'container-three-column': '960px',
      'container-four-column': '1330px',
      ...grid,
      ...fractionalSizes,
      screen: '100vw',
    },
    padding: grid,
    screens: {
      sm: '36em',
      md: '48em',
      lg: '62em',
    },
    spacing: {
      '1/12': '8.3%',
      ...grid,
    },
    translate: {
      ...grid,
      ...fractionalSizes,
    },
    width: {
      ...grid,
      ...fractionalSizes,
      screen: '100vw',
    },
    ...overrides,
  },
});
