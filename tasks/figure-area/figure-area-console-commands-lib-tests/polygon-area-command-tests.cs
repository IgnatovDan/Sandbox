using Moq;
using console_commands_lib;
using figure_area_console_commands_lib;

namespace figure_area_console_commands_lib_tests;

public class PolygonAreaCommandTests {
  string? findItem(IEnumerable<string?> list, string containsText) {
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
    Assert.Equal("Площадь многоугольника: 0,5", findItem(writeLineLog, "Площадь многоугольника: 0,5"));
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

    Assert.NotNull(writeLineLog.Find(item => (item != null) && item.Contains("Площадь многоугольника: 1,125")));
  }
}
