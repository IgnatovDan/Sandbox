There are errors in browser' console when running Selenium tests (page is partially loaded in browser but then errors occured):
```
[ERR_INSUFFICIENT_RESOURCES](http://webapp_linux_kestrel:5172/css/fonts/raleway/raleway-v29-latin-regular.WOFF2 - Failed to load resource: the server responded with a status of 404 (Not Found)
http://selenium_webapp_linux_kestrel:5172/css/fonts/Raleway-Regular2.ttf - Failed to load resource: the server responded with a status of 404 (Not Found)
http://selenium_webapp_linux_kestrel:5172/lib/dx-dashboard.min.js?v=iqGC_tLWmEHGESuQ0zoxnTfb7eiD9_WRG9K_Snzagmw - Failed to load resource: net::ERR_INSUFFICIENT_RESOURCES
http://selenium_webapp_linux_kestrel:5172/lib/dx-aspnetcore-spreadsheet.js?v=Yjqc8hHfiYGYITYBwXcDJl_OUJjVGs1b7Z3PyuDQX4M - Failed to load resource: net::ERR_INSUFFICIENT_RESOURCES
http://selenium_webapp_linux_kestrel:5172/js/site.js?v=U1YvIYKLTsK4X86sYNLzAuI5QrkyBSVc-KTEdTlQ0v0 - Failed to load resource: net::ERR_INSUFFICIENT_RESOURCES
http://selenium_webapp_linux_kestrel:5172/GoalDetail?id=38 2386:2 Uncaught ReferenceError: waitingInitializeDocument is not defined
http://selenium_webapp_linux_kestrel:5172/css/fonts/raleway/Raleway-Regular2.ttf - Failed to load resource: the server responded with a status of 404 (Not Found)
```

How to catch browser logs in Selenium tests:

```
  [TestCleanup]
  public void Cleanup() {
    if(driver != null && TestContext != null) {
      if(TestContext.CurrentTestOutcome != UnitTestOutcome.Passed) {
        try { SaveScreenshot(driver, TestContext); } catch { }
        try { SaveBrowserLog(driver, TestContext); } catch {}
        try { SaveAlertText(driver, TestContext); } catch { }        
      }
      driver.Dispose();
#pragma warning disable CS8625 // Cannot convert null literal to non-nullable reference type.
      driver = null;
#pragma warning restore CS8625 // Cannot convert null literal to non-nullable reference type.
    }
  }

  private void SaveBrowserLog(IWebDriver driver, TestContext testContext) {
    var messages = new StringBuilder();
    messages.Append("Browser available log types: ");
    try {
      messages.Append(driver.Manage().Logs.AvailableLogTypes.Count.ToString());
      messages.AppendLine();

      var logMessages = driver.Manage().Logs.GetLog(LogType.Browser).Select(x => x.Message).ToList();

      messages.AppendLine("Messages count: " + logMessages.Count);
      foreach(var logMessage in logMessages) {
        messages.AppendLine($"{logMessage}");
      }
    }
    catch(Exception e) {
      messages.Append("Error occurs: " + e.Message + Environment.NewLine + e.StackTrace);
    }

    var fullFileName = GetArtefactFullFileName(testContext, "BrowserLog", "txt");
    File.WriteAllText(fullFileName, messages.ToString());
  }

  public static RemoteWebDriver GetDriver() {
      var chromeOptions = new ChromeOptions();
      chromeOptions.AddArgument("--disable-extensions");
      chromeOptions.AddArgument("--disable-gpu");
      chromeOptions.AddArgument("--headless");
      chromeOptions.AddArgument("start-maximized");
      chromeOptions.AddArgument("disable-infobars");
      chromeOptions.AddArgument("--no-sandbox");
      chromeOptions.AddArgument("--disable-setuid-sandbox");
      chromeOptions.AddArgument("--ignore-certificate-errors");
      chromeOptions.AddArgument("--window-size=1920,1080");
      chromeOptions.SetLoggingPreference(LogType.Browser, LogLevel.All);

      // This code can handle exception:  unknown error: session deleted because of page crash
      // from unknown error: cannot determine loading status
      // from tab crashed
      // https://stackoverflow.com/questions/53902507/unknown-error-session-deleted-because-of-page-crash-from-unknown-error-cannot
      // chromeOptions.AddArgument("--disable-dev-shm-usage");
      // Or increase shared memory:
      // shm_size: 1gb
      // https://stackoverflow.com/questions/30210362/how-to-increase-the-size-of-the-dev-shm-in-docker-container/56655091#56655091

      RemoteWebDriver driver;

        driver = new RemoteWebDriver(new Uri("http://myapp:4444"), chromeOptions.ToCapabilities(), TimeSpan.FromSeconds(timeoutInSeconds));

        IReadOnlyDictionary<string, CommandInfo> logCommands = new Dictionary<string, CommandInfo> {
          { DriverCommand.GetAvailableLogTypes, new HttpCommandInfo(HttpCommandInfo.GetCommand, "/session/{sessionId}/se/log/types") },
          { DriverCommand.GetLog, new HttpCommandInfo(HttpCommandInfo.PostCommand, "/session/{sessionId}/se/log") }
        };

        var customCommandDriver = driver as ICustomDriverCommandExecutor;
        customCommandDriver.RegisterCustomDriverCommands(logCommands);
```

Solution for ERR_INSUFFICIENT_RESOURCES:

```
services:
  chrome-linux:
    image: selenium/standalone-chrome:latest
    shm_size: "512m" 

  webapp_linux_kestrel:
    build:
      context: ./../..
      dockerfile: ...
    shm_size: "512m" 
```
