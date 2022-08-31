function comparePaths(path1, path2) {
  if (!path1 && path1 !== '') { throw new Error('path1 is null/undefined'); }
  if (!path2 && path1 !== '') { throw new Error('path2 is null/undefined'); }

  // remove leading './' and trailing '/'
  //const path1_ = path1.replace(/(^\s*.\/)|(\/\s*$)/g, '');
  // const path1_ = path1.replace(/(\/\s*$)/g, '');
  // const path2_ = path2.replace(/(\/\s*$)/g, '');
  const path1_ = path1.endsWith('/') ? path1 : (path1 + '/');
  const path2_ = path2.endsWith('/') ? path2 : (path2 + '/');
  return (path1_ === path2_);
}

export { comparePaths }
