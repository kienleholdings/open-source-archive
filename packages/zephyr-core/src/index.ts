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
      DEFAULT: '#EA7843',
      dark: '#E76123',
      light: '#EF956C',
      type: '#FFFFFF',
    },
    accent: {
      DEFAULT: '#016FB9',
      dark: '#01568E',
      light: '#0186DF',
      type: '#FFFFFF',
    },
  },
  fontFamily: {
    body: ['"Source Sans Pro"', 'sans-serif'],
    display: ['"Inter"', 'sans-serif'],
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
      DEFAULT: '4px',
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
      error: {
        DEFAULT: '#CC1B00',
        dark: '#A31600',
        light: '#FF6047',
        type: '#FFFFFF',
      },
      bg: {
        light: '#444444',
        dark: '#FFFFFF',
      },
      fg: {
        light: '#F8F9FA',
        dark: '#1C1C1C',
      },
      raised: {
        light: '#FFFFFF',
        dark: '#2E2E2E',
      },
      'raised-border': {
        light: '#DFE3E6',
        dark: '#505050',
      },
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
      'body-xl-desktop': '24px',
      'body-lg-desktop': '20px',
      'body-desktop': '16px',
      'body-sm-desktop': '16px',
      'body-xl-mobile': '23px',
      'body-lg-mobile': '19px',
      'body-mobile': '16px',
      'body-sm-mobile': '14px',
      'h1-desktop': '64px',
      'h2-desktop': '50px',
      'h3-desktop': '40px',
      'h4-desktop': '32px',
      'h5-desktop': '25px',
      'h6-desktop': '20px',
      'h1-mobile': '40px',
      'h2-mobile': '40px',
      'h3-mobile': '33px',
      'h4-mobile': '28px',
      'h5-mobile': '23px',
      'h6-mobile': '19px',
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
      'body-xl-desktop': '32px',
      'body-lg-desktop': '24px',
      'body-desktop': '24px',
      'body-sm-desktop': '16px',
      'body-xl-mobile': '32px',
      'body-lg-mobile': '24px',
      'body-mobile': '24px',
      'body-sm-mobile': '16px',
      'h1-desktop': '80px',
      'h2-desktop': '64px',
      'h3-desktop': '48px',
      'h4-desktop': '40px',
      'h5-desktop': '32px',
      'h6-desktop': '24px',
      'h1-mobile': '64px',
      'h2-mobile': '48px',
      'h3-mobile': '40px',
      'h4-mobile': '32px',
      'h5-mobile': '32px',
      'h6-mobile': '24px',
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
