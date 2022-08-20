using transactions_library;

namespace transactions_library_test;

public class AppCommandsManagerTests {
  [Fact]
  public void RegisterAndRunCommand() {
    var manager = new CommandsManager();
    var count1 = 0;
    var result1 = new object();
    var count2 = 0;
    var result2 = new object();

    manager.RegisterCommand("command1", () => { count1++; return result1; });
    manager.RegisterCommand("command2", () => { count2++; return result2; });

    object? commandResult;
    var isCommandFound = manager.TryRunCommand("not exist", out commandResult);
    Assert.False(isCommandFound);
    Assert.Null(commandResult);
    Assert.Equal(0, count1);
    Assert.Equal(0, count2);

    isCommandFound = manager.TryRunCommand("command1", out commandResult);
    Assert.True(isCommandFound);
    Assert.Equal(result1, commandResult);
    Assert.Equal(1, count1);
    Assert.Equal(0, count2);

    isCommandFound = manager.TryRunCommand("command2", out commandResult);
    Assert.True(isCommandFound);
    Assert.Equal(result2, commandResult);
    Assert.Equal(1, count1);
    Assert.Equal(1, count2);
  }

  [Fact]
  public void RegisterAndRunCommand_CaseInsensitive() {
    var manager = new CommandsManager();
    var count1 = 0;
    var result1 = new object();

    manager.RegisterCommand("command1", () => { count1++; return result1; });

    object? commandResult;
    var isCommandFound = manager.TryRunCommand("command1", out commandResult);
    Assert.True(isCommandFound);
    Assert.Equal(result1, commandResult);
    Assert.Equal(1, count1);

    isCommandFound = manager.TryRunCommand("CoMMaNd1", out commandResult);
    Assert.True(isCommandFound);
    Assert.Equal(result1, commandResult);
    Assert.Equal(2, count1);
  }

  [Fact]
  public void Register_DuplicatedName() {
    var manager = new CommandsManager();
    manager.RegisterCommand("command1", () => null);
    Assert.Throws<ArgumentException>(() => manager.RegisterCommand("command1", () => null));
  }

  [Fact]
  public void Register_NullCallback() {
    var manager = new CommandsManager();
    manager.RegisterCommand("command1", null);
    object? commandResult;
    var isCommandFound = manager.TryRunCommand("command1", out commandResult);
    Assert.True(isCommandFound);
    Assert.Null(commandResult);
  }

  [Fact]
  public void Register_NullCommandName() {
    var manager = new CommandsManager();
    Assert.Throws<ArgumentNullException>(() => manager.RegisterCommand(null, null));
  }
}
