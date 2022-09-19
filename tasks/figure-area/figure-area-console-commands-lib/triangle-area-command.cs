using console_commands_lib;
using figure_area_lib;

namespace figure_area_console_commands_lib;

public static class TriangleAreaCommand {
  public static void Invoke(IConsoleService console) {
    console.WriteLine("Для вычисления площади треугольника нужно ввести длину основания и высоту'");
    double bottom = ConsoleUtils.ReadDoubleFromConsole(console, "длина основания треугольника");
    double height = ConsoleUtils.ReadDoubleFromConsole(console, "высота треугольника");
    double result = FigureArea.CalcTriangleAreaByBottomAndHeight(bottom, height);
    console.WriteLine("Площадь треугольника: " + result.ToString());
  }
}
