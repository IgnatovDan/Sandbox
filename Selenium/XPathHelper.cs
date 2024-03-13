// Usage

  [TestMethod]
  public void AggravatingFactorEdit() {
    Assert.IsNotNull(driver.FindElement(new ByXPath().CssClass("my-grid").DataGridRow("myRowName").Text("127%")));
    
    var rowXPath = new ByXPath().CssClass("sid-popup").DataGridRow("myRowName").ToString();
    Assert.IsNotNull(driver.FindElement(new ByXPath(rowXPath).Text("column 1 text")));
    Assert.IsNotNull(driver.FindElement(new ByXPath(rowXPath).Text("column 2 text")));
  }

// Implementation

public class ByXPath {
  private readonly StringBuilder _xPath = new();

  public ByXPath(string? baseXPath = null) {
    if(baseXPath != null) {
      _xPath.Append(baseXPath);
    }
  }

  public static implicit operator By(ByXPath byXPath) => OpenQA.Selenium.By.XPath(byXPath._xPath.ToString());

  public ByXPath XPath(string extraXPath) {
    _xPath.Append(extraXPath);
    return this;
  }

  public ByXPath Text(string text) {
    _xPath.Append($"//*[text() = '{text}']");
    return this;
  }

  public ByXPath Tag(string tagName) {
    _xPath.Append($"//{tagName}");
    return this;
  }

  public ByXPath DataGridRow(string rowName) {
    _xPath.Append($"//*[contains(@test-grid-row-name, '{rowName}')]");
    return this;
  }

  public ByXPath CssClass(string cssClass) {
    _xPath.Append($"//*[{CssClass_(cssClass)}]");
    return this;
  }

  public static string CssClass_(string cssClass) {
    return $"contains(concat(' ', @class, ' '), ' {cssClass} ')";
  }

  public ByXPath CssClassAndText(string cssClass, string text) {
    _xPath.Append($"//*[{CssClass_(cssClass)} and text() = '{text}']");
    return this;
  }

  public override string ToString() {
    return _xPath.ToString();
  }
}
