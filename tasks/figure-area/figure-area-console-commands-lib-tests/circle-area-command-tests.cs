using Moq;
using console_commands_lib;
using figure_area_console_commands_lib;

namespace figure_area_console_commands_lib_tests;

public class CircleAreaCommandTests {
  [Fact]
  public void Common() {
    var console = new Mock<IConsoleService>();
    var writeLineLog = new List<string?>();
    console.Setup(_ => _.WriteLine(It.IsAny<string?>())).Callback((string? s) => writeLineLog.Add(s));
    console.Setup(_ => _.ReadLine()).Returns("1");

    CircleAreaCommand.Invoke(console.Object);

    Assert.NotNull(writeLineLog.Find(item => (item != null) && item.Contains("Площадь круга: " + Math.PI.ToString())));
  }
}
