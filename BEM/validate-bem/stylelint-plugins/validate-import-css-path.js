const stylelint = require('stylelint');
const valueParser = require('postcss-value-parser');

const { report, ruleMessages, validateOptions } = stylelint.utils;
const ruleName = 'validate-import-css-path/match-bem-rules';
const messages = ruleMessages(ruleName, {
    invalidNormalizePath: (path) => `Expected "${path}" to be "../vendor/normalize.css"`,
    normalizeBeforeBlocksFiles: (path) => `Expected "${path}" to be included before 'blocks' files`,
    fontsBeforeBlocksFiles: (path) => `Expected "${path}" to be included before 'blocks' files`,
    fontsOutOfBlocks: (path) => `Expected fonts to be located out of the 'blocks' folder: "${path}"`,
    //invalidNestedBemPath: (path) => `Expected "${path}" to fit BEM nested folder structure rules`,
});

function parseUriFromImportRule(importRule) {
    const paramsNodes = valueParser(importRule.params).nodes;
    const uri = paramsNodes[0].nodes[0].value;
    return uri;
}

function tryValidateNormalize({ importUri, result, rule, blocksStarted }) {
    if (importUri.match("normalize.css")) {
        if (blocksStarted) {
            report({ ruleName, result, message: messages.normalizeBeforeBlocksFiles(importUri), node: rule, word: importUri });
        }
        if (importUri !== "../vendor/normalize.css") {
            report({ ruleName, result, message: messages.invalidNormalizePath(importUri), node: rule, word: importUri });
        }
        return true;
    }
}

function tryValidateFont({ importUri, result, rule, blocksStarted }) {
    if (importUri.match("font") || importUri.match("inter")) {
        if (blocksStarted) {
            report({ ruleName, result, message: messages.fontsBeforeBlocksFiles(importUri), node: rule, word: importUri });
        }
        if (importUri.match("blocks")) {
            report({ ruleName, result, message: messages.fontsOutOfBlocks(importUri), node: rule, word: importUri });
        }
        return true;
    }
}

const ruleFunction = () => {
    return (root, result) => {
        let isFontsWalked = false;
        let blocksStarted = false;
        root.walkAtRules('import', (rule) => {
            const importUri = parseUriFromImportRule(rule);
            if (String(importUri).match("blocks")) {
                blocksStarted = true;
            }
            if (tryValidateNormalize({ importUri, result, rule, blocksStarted })) {
                return;
            }
            if (tryValidateFont({ importUri, result, rule, blocksStarted })) {
                return;
            }
            if (!String(importUri).match("../blocks/")) {

            }
            else {
                //console.log(importUri);
            }
            // report({
            //     ruleName,
            //     result,
            //     message: messages.invalidNestedBemPath('path1'),
            //     node: rule,
            // });
        });
    };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

module.exports = stylelint.createPlugin(ruleName, ruleFunction);
