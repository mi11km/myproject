module.exports = {
  outputDir: "../web_back/static",
  indexPath: "../templates/index.html",
  publicPath: process.env.NODE_ENV === "production" ? "/static/" : "/",
  transpileDependencies: ["vuetify"],
};
