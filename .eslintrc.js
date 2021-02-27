module.exports = {
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  rules: {
    // React 17's new JSX transform doesn't require importing React
    "react/react-in-jsx-scope": "off",
    // Airbnb config has this super tight and can't be arsed to battle with it now
    "jsx-a11y/label-has-associated-control": "off",
    "react/prop-types": "off",
    "import/prefer-default-export": "off",
  },
};
