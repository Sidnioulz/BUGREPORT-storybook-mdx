module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    '@typescript-eslint'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'plugin:react/recommended',
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': [
      'error',
      {
        'prefixWithI': 'always',
        'allowUnderscorePrefix': true
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': 'off',
    // Styleguidist requires prop interfaces defined in the same file as components,
    // which causes a lot of feature files to not have access to those interfaces,
    // and to define generic types with <any> inside as a workaround. That pollutes
    // our ESLint output to the extent where it's better to disable no-explicit-any.
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(usePostMountEffect)'
      }
    ]
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/camelcase': 'error',
        'react/prop-types': 'off'
      }
    }
  ]
}
