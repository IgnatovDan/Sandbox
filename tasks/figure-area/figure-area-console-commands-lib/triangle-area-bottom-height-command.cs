using System.Globalization;

using console_commands_lib;
using figure_area_lib;

namespace figure_area_console_commands_lib;

public static class TriangleAreaBottomHeightCommand {
  public static void Invoke(IConsoleService console) {
    console.WriteLine("Для вычисления площади треугольника нужно ввести длину основания и высоту");
    double bottom = ConsoleUtils.ReadDoubleFromConsole(console, "длина основания треугольника");
    double height = ConsoleUtils.ReadDoubleFromConsole(console, "высота треугольника");
    double result = FigureArea.CalcTriangleAreaByBottomHeight(bottom, height);
    ConsoleUtils.WriteDoubleToConsole(console, "Площадь треугольника: {0}", result);
  }
}
