using console_commands_lib;

using Moq;

namespace console_commands_lib_tests;

public class ConsoleUtilsTest_ReadDoubleFromConsole {
  [Fact]
  public void PassInteger() {
    var console = new Mock<IConsole>();
    console.Setup(o => o.ReadLine()).Returns("42");
    double result = ConsoleUtils.ReadDoubleFromConsole(console.Object, "f1");
    Assert.Equal(42, result);
  }
}
