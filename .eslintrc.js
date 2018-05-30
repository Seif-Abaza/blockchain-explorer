module.exports = {
    "parser": "babel-eslint",
    "extends": ["airbnb", "prettier", "prettier/react", "plugin:flowtype/recommended"],
    "plugins": [
      "react",
      "jsx-a11y",
      "import",
      "prettier",
      "flowtype",
    ],
    "env": {
        "browser": true,
        "jest": true,
    },
    "globals": { "fetch": false, "document" : false },
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "no-underscore-dangle": 0,
      "no-nested-ternary": 0,
      "strict": 0,
      "prefer-promise-reject-errors": 0,
      "no-confusing-arrow": 0,
      "react/forbid-prop-types": 0,
      "import/prefer-default-export": 0,
      "react/sort-comp": 0,
      "max-len": ["error", { "code": 80 }],
      "prettier/prettier": [
        "error",
        {
          "singleQuote": true,
          "trailingComma": 'es5'
        }
      ],
    },
    "settings": {
      "flowtype": {
        "onlyFilesWithFlowAnnotation": false,
      }
    }
  };