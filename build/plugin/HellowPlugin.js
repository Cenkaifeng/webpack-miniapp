class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('Hello World Plugin', (
      stats /* 在 hook 被触及时，会将 stats 作为参数传入。 */
    ) => {
      console.log('Hello World!');
    //   console.log('环境'+ process.env.NODE_ENV, '构建类型'+process.env.BUILD_TYPE);
    });
  }
}

module.exports = HelloWorldPlugin;