var valueParser = require('postcss-value-parser');
const { texts } = require('./lib/texts');

function parseUriFromImportRule(importRule) {
  const paramsNodes = valueParser(importRule.params).nodes;
  const uri = paramsNodes[0].nodes[0].value;
  return uri;
}

function splitUriToParts(uri) {
  return uri.split('/');
}

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (/*opts = {}*/) => {
  // Work with options here

  return {
    postcssPlugin: 'postcss-plugin1',
    AtRule(rule, postcss) {
      if (rule.name === 'import' && rule.source?.input?.file) {
        const importedUri = parseUriFromImportRule(rule);
        const importedUriParts = splitUriToParts(importedUri);
        if (importedUriParts[0] != '..' || importedUriParts[1] != 'blocks') {
          postcss.result.warn(texts.placeBlocksIntoBlocksFolder);
        }
      }
      // Transform CSS AST here
    }
    /*
    Root (root, postcss) {
      // Transform CSS AST here
    }
    */

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  }
}

module.exports.postcss = true
