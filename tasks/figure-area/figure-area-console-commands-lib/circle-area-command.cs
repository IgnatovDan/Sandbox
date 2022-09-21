using console_commands_lib;
using figure_area_lib;

namespace figure_area_console_commands_lib;

public static class CircleAreaCommand {
  public static void Invoke(IConsoleService console) {
    console.WriteLine("Для вычисления площади круга нужно ввести радиус круга");
    double radius = ConsoleUtils.ReadDoubleFromConsole(console, "радиус круга");
    double result = FigureArea.CalcCircleArea(radius);
    console.WriteLine("Площадь круга: " + result.ToString());
  }
}
