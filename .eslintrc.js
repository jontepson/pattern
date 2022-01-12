module.exports = {
    "env": {
        "jest": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "ignorePatterns": ["src/screens/LoggedInScreen.js", "src/screens/MapScreen.js"],
    "rules": {
        "react/prop-types": "off"
    }
};
