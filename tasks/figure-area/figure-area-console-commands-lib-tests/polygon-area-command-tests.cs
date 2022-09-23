using Moq;
using console_commands_lib;
using figure_area_console_commands_lib;

namespace figure_area_console_commands_lib_tests;

public class PolygonAreaCommandTests {
  string? findItem(IEnumerable<string?> list, string containsText) {
    // Assert.Single/Contains/True doesn't show the 'containsText'
    // and it's difficult to investigate what is wrong
    if (list.Any(item => item?.Contains(containsText) ?? false)) {
      return containsText;
    }
    return null;
  }

  [Fact]
  public void CheckTriangle() {
    var console = new Mock<IConsoleService>();
    var writeLineLog = new List<string?>();
    console.Setup(_ => _.WriteLine(It.IsAny<string?>())).Callback((string? s) => writeLineLog.Add(s));
    console.Setup(_ => _.Write(It.IsAny<string?>())).Callback((string? s) => writeLineLog.Add(s));
    console.SetupSequence(o => o.ReadLine())
      .Returns("0").Returns("0")
      .Returns("1").Returns("0")
      .Returns("0").Returns("1")
      .Returns("");

    PolygonAreaCommand.Invoke(console.Object);

    Assert.Equal("0.X", findItem(writeLineLog, "0.X"));
    Assert.Equal("0.Y", findItem(writeLineLog, "0.Y"));
    Assert.Equal("1.X", findItem(writeLineLog, "1.X"));
    Assert.Equal("1.Y", findItem(writeLineLog, "1.Y"));
    Assert.Equal("2.X", findItem(writeLineLog, "2.X"));
    Assert.Equal("2.Y", findItem(writeLineLog, "2.Y"));
    Assert.Contains("Площадь многоугольника: 0,5", writeLineLog);
  }

  [Fact]
  public void CheckPointWithDecimals() {
    var console = new Mock<IConsoleService>();
    var writeLineLog = new List<string?>();
    console.Setup(_ => _.WriteLine(It.IsAny<string?>())).Callback((string? s) => writeLineLog.Add(s));
    console.SetupSequence(o => o.ReadLine())
      .Returns("0").Returns("0")
      .Returns("1,5").Returns("0")
      .Returns("0").Returns("1,5")
      .Returns("");


    PolygonAreaCommand.Invoke(console.Object);

    Assert.Contains("Площадь многоугольника: 1,125", writeLineLog);
  }

  [Fact]
  public void CheckRightTriangle() {
    var console = new Mock<IConsoleService>();
    var writeLineLog = new List<string?>();
    console.Setup(_ => _.WriteLine(It.IsAny<string?>())).Callback((string? s) => writeLineLog.Add(s));
    console.SetupSequence(o => o.ReadLine())
      .Returns("0").Returns("0")
      .Returns("0").Returns("1")
      .Returns("1").Returns("0")
      .Returns("");


    PolygonAreaCommand.Invoke(console.Object);

    Assert.Contains("Фигура является прямоугольным треугольником", writeLineLog);
  }

  [Fact]
  public void CheckNotRightTriangle() {
    var console = new Mock<IConsoleService>();
    var writeLineLog = new List<string?>();
    console.Setup(_ => _.WriteLine(It.IsAny<string?>())).Callback((string? s) => writeLineLog.Add(s));
    console.SetupSequence(o => o.ReadLine())
      .Returns("0").Returns("0")
      .Returns("1").Returns("2")
      .Returns("2").Returns("0")
      .Returns("");


    PolygonAreaCommand.Invoke(console.Object);

    Assert.Contains("Фигура является НЕпрямоугольным треугольником", writeLineLog);
  }

  [Fact]
  public void CheckNonTriangle() {
    var console = new Mock<IConsoleService>();
    var writeLineLog = new List<string?>();
    console.Setup(_ => _.WriteLine(It.IsAny<string?>())).Callback((string? s) => writeLineLog.Add(s));
    console.SetupSequence(o => o.ReadLine())
      .Returns("0").Returns("0")
      .Returns("0").Returns("2")
      .Returns("2").Returns("2")
      .Returns("2").Returns("0")
      .Returns("");


    PolygonAreaCommand.Invoke(console.Object);

    Assert.Contains("Фигура НЕ является треугольником", writeLineLog);
  }
}
