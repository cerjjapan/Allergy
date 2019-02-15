module.exports = {
  env: {
    node: true,
    commonjs: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 6
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    "no-var": "error",
    "no-console": ["error", { allow: ["warn", "error"] }]
  }
};
