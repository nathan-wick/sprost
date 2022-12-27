module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:all",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [],
    "rules": {
        "max-len": [
            2,
            {"code": 100}
        ],
        "max-lines-per-function": 0,
        "no-magic-numbers": 0,
        "no-ternary": 0
    }
};
