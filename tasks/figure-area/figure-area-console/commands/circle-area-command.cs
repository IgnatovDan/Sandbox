using figure_area_lib;

public static class CircleAreaCommand {
  public static void Invoke() {
    Console.WriteLine("Для вычисления площади круга нужно ввести радиус круга'");
    double radius = ConsoleUtils.ReadDoubleFromConsole("радиус круга");
    double result = FigureArea.CalcCircleArea(radius);
    Console.WriteLine("Площадь круга: " + result.ToString());
  }
}
