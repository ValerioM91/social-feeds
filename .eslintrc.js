module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['react-app', 'react-app/jest', 'prettier'],
  rules: {
    'prettier/prettier': 'warn', // warning when code is formatted not following prettier rules
    'import/no-anonymous-default-export': 'off', // disabling this allow us to use `export default function () {}`
    'no-console': 'error', // error when we leave `console` in our code
    'default-case': 'off', // disabled (Require default cases in switch statements)
    'react-hooks/rules-of-hooks': 'error', // enforces that components follow the Rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // enforces certain rules about the contents of the dependency array that is passed to Hooks
    'no-unused-vars': 'warn', // warning when variables are declared and not used
    'arrow-body-style': 'off', // disable because it conflict with prettier
    'prefer-arrow-callback': 'off', // disable because it conflict with prettier
  },
}
