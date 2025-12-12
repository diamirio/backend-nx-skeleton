const importTsc = require('../src/plugins/tsc')

module.exports = {
  createNodes: importTsc.createNodes,
  createNodesV2: importTsc.createNodesV2
}
