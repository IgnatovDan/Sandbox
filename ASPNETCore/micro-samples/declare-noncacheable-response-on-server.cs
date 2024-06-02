builder.Services.AddControllers(options => {
  // Apply ResponseCacheAttribute to all controllers to disable response caching in browser
  // ResponseCacheAttribute cannot be applied to RazorPages in a similar way, add Rhttps://github.com/IgnatovDan/Sandbox/tree/main/ASPNETCore/samplesesponseCacheAttribute to each page manually
  options.Filters.Add(new ResponseCacheAttribute { NoStore = true, Location = ResponseCacheLocation.None });
});
