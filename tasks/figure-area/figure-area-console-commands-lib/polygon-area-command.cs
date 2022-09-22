using console_commands_lib;

using figure_area_lib;

namespace figure_area_console_commands_lib;

public static class PolygonAreaCommand {
  private static Point? convertStringToPoint(string s) {
    if (String.IsNullOrWhiteSpace(s)) {
      return null;
    }
    string[] axeValuesAsString = s.Split(',');
    Point point = new Point(
      double.Parse(axeValuesAsString[0]),
      double.Parse(axeValuesAsString[1])
    );
    return point;
  }

  public static void Invoke(IConsoleService console) {
    console.WriteLine("Для вычисления площади многоугольника введите координаты его вершин {X,Y} (например для треугольника ['0,0', '0,1', '1,0']). Введите пустую строку для начала расчета площади.");
    List<Point> points = new List<Point>();
    const int maxPoints = 10;
    for (int i = 0; i < maxPoints; i++) {
      double? pointX = ConsoleUtils.ReadDoubleFromConsole(console, $"Вершина_{i}.X", true);
      if (pointX == null) {
        break;
      }
      double? pointY = ConsoleUtils.ReadDoubleFromConsole(console, $"Вершина_{i}.Y", true);
      if (pointY == null) {
        break;
      }
      points.Add(new Point((double)pointX, (double)pointY));
    }
    if (points.Count == maxPoints) {
      console.WriteLine("Введено максимальное количество вершин. Начинается расчет площади.");
    }
    double result = FigureArea.CalcPolygonArea(points);
    console.WriteLine("Площадь многоугольника: " + result.ToString());  // TODO: culture independent delimiter
  }
}
