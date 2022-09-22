using System.Globalization;

using console_commands_lib;
using figure_area_lib;

namespace figure_area_console_commands_lib;

public static class TriangleAreaSidesCommand {
  public static void Invoke(IConsoleService console) {
    console.WriteLine("Для вычисления площади треугольника нужно ввести длину трех сторон");
    double a = ConsoleUtils.ReadDoubleFromConsole(console, "сторона 1");
    double b = ConsoleUtils.ReadDoubleFromConsole(console, "сторона 2");
    double c = ConsoleUtils.ReadDoubleFromConsole(console, "сторона 3");
    double result = FigureArea.CalcTriangleAreaBySides(a, b, c);
    ConsoleUtils.WriteDoubleToConsole(console, "Площадь треугольника: {0}", result);
  }
}
