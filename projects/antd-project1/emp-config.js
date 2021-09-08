/*
 * @Date: 2021-08-26 14:46:08
 * @LastEditors: Dragon
 * @LastEditTime: 2021-09-08 14:38:28
 */
const path = require('path')
const packagePath = path.join(path.resolve('./'), 'package.json')
const deps = require(packagePath).dependencies
// console.log(packagePath, deps)

module.exports = ({config, env}) => {
  const port = 8004
  const projectName = 'emp-project1'
  const host = 'act-code-test.yy.com'
  const publicPath = `http://${host}:${port}/`
  //
  config.plugin('html').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        title: 'EMP - Project1',
        files: {
          // js: [`http://${host}:8003/emp.js`],
        },
      },
    }
    return args
  })
  ///*  */
  config.plugin('mf').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        name: projectName,
        library: {type: 'var', name: projectName},
        filename: 'emp.js',
        remotes: {
          '@emp-antd/base': 'empBase',
        },
        exposes: {},
        shared: {
          react: {eager: true, singleton: true, requiredVersion: '^17.0.1'},
          'react-dom': {eager: true, singleton: true, requiredVersion: '^17.0.1'},
          'react-router-dom': {requiredVersion: '^5.1.2'},
          'mobx-react-lite': {requiredVersion: '^3.0.1'},
          mobx: {requiredVersion: '^6.0.1'},
          axios: {requiredVersion: '^0.19.2'},
        },
      },
    }
    return args
  })
  config.output.publicPath(publicPath)
  config.devServer.port(port)
}
