const Hapi = require('hapi')
const config = require('./config.json')
const Jade = require('jade')
const Bumble = require('bumble')
const Good = require('good')
const ElectricFence = require('electricfence')
const path = require('path')

const serverOptions = {
  views: {
    engines: {
      jade: Jade
    },
    isCached: false,
    path: path.join(__dirname, '/views')
  }
}

const server = new Hapi.Server(parseInt(process.env.PORT, 10) || 8080, serverOptions)

server.pack.register([
    { plugin: Bumble, options: config },
    { plugin: Good, options: {} },
    { plugin: ElectricFence, options: {path: 'public', url: '/'} }
], (err) => {
  if (err) {
    throw err
  }

  server.start(() => {
    console.log('Server running on: ' + server.info.port)
  })
})

