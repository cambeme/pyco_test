module.exports = {
    parser: 'babel-eslint',
    extends: ['plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                tabWidth: 4
            }
        ],
        'no-console': 'error',
        'no-debugger': 'error'
    }
};
