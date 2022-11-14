import { css } from '@emotion/react';

export const baseStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

  body {
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    background: var(--body-bg);
    color: var(--body-font-color);

    background: rgb(245, 245, 245, 1);
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--headings-color);
  }
`;
