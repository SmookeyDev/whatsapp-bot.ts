module.exports = {
  extends: ["prettier"],
  plugins: ["prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2015,
  },
  rules: {
    "prettier/prettier": "error",
  },
};
