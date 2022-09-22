using Moq;
using console_commands_lib;
using figure_area_console_commands_lib;

namespace figure_area_console_commands_lib_tests;

public class TriangleAreaSidesCommandTests {
  [Fact]
  public void Common() {
    var console = new Mock<IConsoleService>();
    var writeLineLog = new List<string?>();
    console.Setup(_ => _.WriteLine(It.IsAny<string?>())).Callback((string? s) => writeLineLog.Add(s));
    console.SetupSequence(o => o.ReadLine())
      .Returns("5").Returns("8").Returns("11");

    TriangleAreaSidesCommand.Invoke(console.Object);

    Assert.NotNull(writeLineLog.Find(item => (item != null) && item.Contains("Площадь треугольника: 18,33030277982336")));
  }
}
