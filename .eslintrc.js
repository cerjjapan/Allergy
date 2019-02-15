module.exports = {
  env: {
    browser: true,
    commonjs: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 5
  },
  rules: {
    indent: ["error", "space"],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }]
  }
};
