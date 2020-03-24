module.exports = {
  "publicPath": "/sorting-algorithms-with-vue/",
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}
