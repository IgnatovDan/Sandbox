using console_commands_lib;

using Moq;

namespace console_commands_lib_tests;

public class ConsoleUtilsTest_ReadDoubleFromConsole {
  [Fact]
  public void StringWithIntegerNumber() {
    var console = new Mock<IConsoleService>();
    console.Setup(o => o.ReadLine()).Returns("42");
    double result = ConsoleUtils.ReadDoubleFromConsole(console.Object, "f1");
    Assert.Equal(42, result);
  }

  [Fact]
  public void StringWithFractionalNumber() {
    var console = new Mock<IConsoleService>();
    console.Setup(o => o.ReadLine()).Returns("42,2");
    double result = ConsoleUtils.ReadDoubleFromConsole(console.Object, "f1");
    Assert.Equal(42.2, result);
  }

  [Fact]
  public void StringWithFractionalNumberIncorrectDelimiter() {
    var console = new Mock<IConsoleService>();
    console.SetupSequence(o => o.ReadLine()).Returns("42.2").Returns("0");
    double result = ConsoleUtils.ReadDoubleFromConsole(console.Object, "f1");
    Assert.Equal(0, result);
  }

  [Fact]
  public void StringWithNonNumber() {
    var console = new Mock<IConsoleService>();
    console.SetupSequence(o => o.ReadLine()).Returns("qwe").Returns("42");
    double result = ConsoleUtils.ReadDoubleFromConsole(console.Object, "f1");
    Assert.Equal(42, result);
  }
}
