function comparePaths(path1, path2) {
  // remove leading './' and trailing '/'
  const path1_ = path1.replace(/(^\s*.\/)|(\/\s*$)/g, '');
  const path2_ = path2.replace(/(^\s*.\/)|(\/\s*$)/g, '');
  return (path1_ === path2_);
}

export { comparePaths }
