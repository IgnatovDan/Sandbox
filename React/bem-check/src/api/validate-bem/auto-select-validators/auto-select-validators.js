import { validateBemConfigs } from "../validate-bem-configs"

function isLevel1(folder) {
  return folder.findFolders('blocks').length === 0 &&
    folder.findFolders('vendor').length === 0 &&
    folder.getFileRecursive(['styles', 'style.css']);
}

function isLevel2(folder) {
  return (!folder.folders['scripts']) && (
    folder.folders['blocks'] ||
    folder.folders['vendor'] ||
    folder.folders['pages']);
}

function autoSelectValidators(folder) {
  if (isLevel1(folder)) {
    return validateBemConfigs.level1.validators;
  } else if (isLevel2(folder)) {
    return validateBemConfigs.level2.validators;
  }
  return validateBemConfigs.level3.validators;
}

export { autoSelectValidators }
