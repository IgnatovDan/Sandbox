function comparePaths(path1, path2) {

  if (!path1 && path1 !== '') { throw new Error('path1 is null/undefined'); }
  if (!path2 && path1 !== '') { throw new Error('path2 is null/undefined'); }

  // remove leading './' and trailing '/'
  const path1_ = path1.replace(/(^\s*.\/)|(\/\s*$)/g, '');
  const path2_ = path2.replace(/(^\s*.\/)|(\/\s*$)/g, '');
  return (path1_ === path2_);
}

export { comparePaths }
