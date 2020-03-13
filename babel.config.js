module.exports = {
  presets: [
    "module:metro-react-native-babel-preset",
    "module:react-native-dotenv",
  ],
  "env": {
    "production": {
      // This will automatically remove all console.* calls in the release (production) versions of your project.
      // https://facebook.github.io/react-native/docs/performance.html#using-consolelog-statements
      "plugins": ["transform-remove-console"]
    }
  }
}
