# Steps

1) 
`npx create-react-app to_do_list --template typescript`
2) Add eslint rules [here](https://create-react-app.dev/docs/setting-up-your-editor/#extending-or-replacing-the-default-eslint-config)
3) Formatting your code automatically using prettifier [here](https://create-react-app.dev/docs/setting-up-your-editor/#formatting-code-automatically)
`npm install --save husky lint-staged prettier`
4) Sass [here](https://create-react-app.dev/docs/adding-a-sass-stylesheet)
`npm install sass` --> rename css files to scss
5) Adding css reset [here](https://create-react-app.dev/docs/adding-css-reset)
`@import-normalize;` toevoegen bovenaan iedere (s)css file.
   If you see an "Unknown at rule @import-normalize css(unknownAtRules)" warning in VSCode, change the css.lint.unknownAtRules setting to ignore.