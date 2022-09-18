using figure_area_lib;

public static class TriangleAreaCommand {
  public static void Invoke() {
    Console.WriteLine("Для вычисления площади треугольника нужно ввести длину основания и высоту'");
    double bottom = ConsoleUtils.ReadDoubleFromConsole("длина основания треугольника");
    double height = ConsoleUtils.ReadDoubleFromConsole("высота треугольника");
    double result = FigureArea.CalcTriangleAreaByBottomAndHeight(bottom, height);
    Console.WriteLine("Площадь треугольника: " + result.ToString());
  }
}
