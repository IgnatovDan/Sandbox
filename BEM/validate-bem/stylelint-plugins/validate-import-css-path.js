const stylelint = require('stylelint');
const valueParser = require('postcss-value-parser');

const { report, ruleMessages, validateOptions } = stylelint.utils;
const ruleName = 'validate-import-css-path/match-bem-rules';
const messageNames = {
    invalidNormalizePath: "invalidNormalizePath",
    normalizeBeforeBlocksFiles: "normalizeBeforeBlocksFiles",
    fontsBeforeBlocksFiles: "fontsBeforeBlocksFiles",
    fontsOutOfBlocks: "fontsOutOfBlocks",
    cannotParseUriFromImportRule: "cannotParseUriFromImportRule"
};

const messages = ruleMessages(ruleName, {
    [messageNames.invalidNormalizePath]: (path) => `Expected "${path}" to be "../vendor/normalize.css"`,
    [messageNames.normalizeBeforeBlocksFiles]: (path) => `Expected "${path}" to be included before 'blocks' files`,
    [messageNames.fontsBeforeBlocksFiles]: (path) => `Expected "${path}" to be included before 'blocks' files`,
    [messageNames.fontsOutOfBlocks]: (path) => `Expected fonts to be located out of the 'blocks' folder: "${path}"`,
    [messageNames.cannotParseUriFromImportRule]: (importRule) => `Cannot parse uri from import rule: "${importRule}"`,
    //invalidNestedBemPath: (path) => `Expected "${path}" to fit BEM nested folder structure rules`,
});

function tryParseUriFromImportRule(importRule) {
    try {
        const paramsNodes = valueParser(importRule.params).nodes;
        const result = paramsNodes[0]?.nodes[0]?.value;
        if (!result)
            throw false;
        return result;
    }
    catch {
        return {
            error: true,
            messages: [messageNames.cannotParseUriFromImportRule]
        };
    }
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
            const importUri = tryParseUriFromImportRule(rule);
            if (importUri.error) {
                report({ ruleName, result, message: messages[importUri.messages[0]](importUri.params), node: rule });
                return;
            }
            if (importUri.match("blocks")) {
                blocksStarted = true;
            }
            if (tryValidateNormalize({ importUri, result, rule, blocksStarted })) {
                return;
            }
            if (tryValidateFont({ importUri, result, rule, blocksStarted })) {
                return;
            }
            if (!importUri.match("../blocks/")) {

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
