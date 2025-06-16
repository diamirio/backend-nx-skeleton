const importJest = require('../src/plugins/jest')

module.exports = {
  createNodes: importJest.createNodes,
  createNodesV2: importJest.createNodesV2
}
