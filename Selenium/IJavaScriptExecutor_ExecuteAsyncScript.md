
- Query data from server in selenium test:

```c#
  [TestMethod]
  public void DocumentsCount() {
    ...
    Assert.AreEqual(documentsCount + 1, GetDocumentsCount());
  }
  private int GetDocumentsCount() {
    var callbackResult = ((IJavaScriptExecutor)driver).ExecuteAsyncScript(
      "const callback = arguments[arguments.length - 1];" +
      "result = await testUtils.getDocumentsCount();" +
      "callback(result);"
    ).ToString();

    int result = int.Parse(callbackResult!);
    return result;
  }
```
```js
<script>
  (function () {
    window.testUtils = {
        getDocumentsCount: async () => {
          const response = await fetch(
              `/api/@(typeof(TestsDocumentsController).Name.Replace("Controller", ""))/@(nameof(TestsDocumentsController.GetDocumentsCount))`,
          );
          if (!response.ok) { ... handle error and throw new Error(message); }
          const result = await response.text();
          return result;
        },
```
```cs
[ApiController]
public class TestsDocumentsController : Controller {
  [HttpGet]
  public int GetDocumentsCount() {
    return DocumentManager.GetAllDocuments().Count();
  }
```
