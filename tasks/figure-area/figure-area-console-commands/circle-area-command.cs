using console_commands_lib;
using figure_area_lib;

namespace figure_area_console_commands;

public static class CircleAreaCommand {
  public static void Invoke() {
    Console.WriteLine("Для вычисления площади круга нужно ввести радиус круга'");
    double radius = ConsoleUtils.ReadDoubleFromConsole("радиус круга");
    double result = FigureArea.CalcCircleArea(radius);
    Console.WriteLine("Площадь круга: " + result.ToString());
  }
}
