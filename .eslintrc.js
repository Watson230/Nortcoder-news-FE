module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "mocha":true
    },
    "parser": "babel-eslint",
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        }
        
    },
    "globals": {
        "fetch": true,
        "Headers":true
        },
    "plugins": [
        "react",
        "fetch"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};