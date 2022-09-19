using Moq;
using console_commands_lib;

namespace console_commands_lib_tests;

public class ConsoleCommandsManagerTests {
  [Fact]
  public void MaxCycleCount() {
    // There should be no unlimited hung up
    var console = new Mock<IConsoleService>();
    var manager = new ConsoleCommandsManager(console.Object);
    manager.RunCycle();
  }

  [Fact]
  public void Exit() {
    var console = new Mock<IConsoleService>();
    console.Setup(o => o.ReadLine()).Returns(ConsoleCommandsManager.Exit);
    var manager = new ConsoleCommandsManager(console.Object);

    manager.RunCycle();

    console.Verify(o => o.ReadLine(), Times.Once());
  }

  [Fact]
  public void OneCommandThenExit() {
    var myCmdName = "cmd1";
    string log = "";

    var console = new Mock<IConsoleService>();
    console.SetupSequence(o => o.ReadLine())
      .Returns(myCmdName)
      .Returns(ConsoleCommandsManager.Exit);
    var manager = new ConsoleCommandsManager(console.Object);
    manager.RegisterCommand(myCmdName, () => log += "cmd1;");

    manager.RunCycle();

    Assert.Equal("cmd1;", log);
  }

  [Fact]
  public void OneCommandThenSecondCommandThenExit() {
    var cmdName1 = "cmd1";
    var cmdName2 = "cmd2";
    string log = "";

    var console = new Mock<IConsoleService>();
    console.SetupSequence(o => o.ReadLine())
      .Returns(cmdName1)
      .Returns(cmdName2)
      .Returns(ConsoleCommandsManager.Exit);

    var manager = new ConsoleCommandsManager(console.Object);
    manager.RegisterCommand(cmdName1, () => log += "cmd1;");
    manager.RegisterCommand(cmdName2, () => log += "cmd2;");

    manager.RunCycle();

    Assert.Equal("cmd1;cmd2;", log);
  }
}
