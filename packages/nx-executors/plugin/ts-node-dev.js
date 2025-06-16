const importTsNodeDev = require('../src/plugins/ts-node-dev')

module.exports = {
  createNodes: importTsNodeDev.createNodes,
  createNodesV2: importTsNodeDev.createNodesV2
}
