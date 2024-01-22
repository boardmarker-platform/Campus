const button = {
  color: {
    primary: '#00d473',
    secondary: '#f9f9fa',
    text: {
      primary: '#ffffff',
      secondary: '#717171',
    },
  },
  size: {
    small: 'padding: 0.4rem 1.2rem;font-size: 1.6rem;',
    medium: 'padding: 0.8rem 1.6rem;font-size: 2rem;',
    large: 'padding: 1.2rem 2rem;font-size: 2.4rem;',
  },
};

const modal = {
  color: {
    backdrop: '#333333',
    content: '#ffffff',
  },
};

const colors = {
  primary: '#00d473',

  background: '#f5f5f5',
  contentWrapper: '#ffffff',
  text: '#ffffff',
  infoText: '#aaaaaa',

  button: button.color,
  modal: modal.color,
} as const;
export type Colors = typeof theme.colors;

const size = {
  button: button.size,
};
export type Size = typeof theme.size;

export const theme = {
  colors,
  size,
};
