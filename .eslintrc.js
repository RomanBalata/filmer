module.exports = {
    parser: "babel-eslint",
    env: {
      es6: true,
      browser: true,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2018,
      sourceType: "module"
    },
    extends: ["airbnb", "prettier", "prettier/react"],
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "error",
      "import/prefer-default-export": "off",
      "no-use-before-define": "off",
      "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
      "react/prop-types": "off",
      "no-shadow": "off"
    },
    settings: {
      "import/resolver": {
        node: {
          paths: ["src"]
        }
      }
    }
  };