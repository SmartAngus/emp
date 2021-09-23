const port = 8002
/**
 * @type {import('@efox/emp-cli').EMPConfig}
 */
module.exports = {
  entries: {},
  webpack() {
    return {
      devServer: {
        port,
      },
    }
  },
  pages: {
    router: {
      'info/user': {
        title: '用户信息 demo',
      },
    },
  },
  webpackChain(config) {
    config.plugin('html').tap(args => {
      args[0].files.publicPath = `http://localhost:${port}`
      // console.log(args)
      return args
    })
  },
  async moduleFederation() {
    return {
      name: 'demo2',
      filename: 'emp.js',
      remotes: {
        '@emp/demo1': 'demo1@http://localhost:8001/emp.js',
      },
      exposes: {
        './components/Hello': 'src/components/Hello',
        './helper': 'src/helper',
      },
      shared: {
        react: {eager: true, singleton: true, requiredVersion: '^17.0.1'},
        'react-dom': {eager: true, singleton: true, requiredVersion: '^17.0.1'},
      },
    }
  },
}
