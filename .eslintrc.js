module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 13,
        sourceType: "module"
    },
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        // 0:no effect,  1:warning, 2:error
        semi: ["error", "always"],
        "@typescript-eslint/no-explicit-any": 2,
        "prettier/prettier": 1,
        "no-console": 1,
        "no-var": 2,
        "prefer-const": 1,
        "no-trailing-spaces": 0,
        "@typescript-eslint/ban-types": 0
    }
};
