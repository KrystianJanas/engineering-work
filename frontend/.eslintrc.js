module.exports = {
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['unused-imports'],
  rules: {
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'import/no-unresolved': 'off',
    'import/absolute-first': 'off',
    'import/prefer-default-export': 'off',
    'unused-imports/no-unused-imports': 'error',
    'react/require-default-props': 'off', // we're using typescript, don't need that
    'react/react-in-jsx-scope': 'off', // from react 17 it's not needed anymore
    'react/jsx-props-no-spreading': 'off', // need it sometimes, for example for _app.tsx next
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    '@next/next/no-img-element': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external'],
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@react*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '~/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: [`core/*`, '**/../core/*'],
            message: 'Use absolute import for core using ~ alias',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['airbnb-typescript', 'prettier'],
      plugins: ['prettier'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'eslint-disable prettier/prettier': 'off',
        '@typescript-eslint/comma-dangle': 'off', // prettier will handle this
        'import/no-extraneous-dependencies': 'off', // it's not detecting dev deps properly
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/ban-types': [
          'warn',
          {
            types: {
              'React.FC': {
                message:
                  'React.FC is discouraged. Add your props typing explicitly.',
              },
              'React.FunctionComponent': {
                message:
                  'React.FC is discouraged. Add your props typing explicitly.',
              },
              // React.FC is discouraged. Some reading:
              // https://github.com/facebook/create-react-app/pull/8177
              // https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/
            },
          },
        ],
      },
    },
  ],
};
