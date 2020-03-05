module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-react", "@babel/preset-env"],
    plugins: [
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["./src"],
          alias: {
            test: "./test",
            underscore: "lodash",
            layout: "./src/layout"
          }
        },
        "emotion"
      ]
    ]
  };
};
