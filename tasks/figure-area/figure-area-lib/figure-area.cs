namespace figure_area_lib;

/*

Есть разные фигуры.
Так же есть разные способы описания одной и той же фигуры.
Алгоритм расчета площади фигуры будет разный разных способов описания фигур.
Несколько фигур, их описаний и алгоритмов расчета площади описаны тут: https://skysmart.ru/articles/mathematic/ploshad-figury

В этом классе я реализовал расчет площади для этих фигур:
1. для круга по его радиусу
2. для треугольника по его основанию и высоте
3. для многоугольника по координатам точек его последовательных вершин.

*/

public class Point {
  public Point(double x, double y) {
    this.X = x;
    this.Y = y;
  }
  public double X { get; }
  public double Y { get; }
}

public class FigureArea {
  public static double CalcCircleArea(double radius) {
    if (radius < 0) {
      throw new ArgumentException("radius should be positive");
    }
    double result = Math.PI * Math.Pow(radius, 2);
    if (result == double.PositiveInfinity) {
      throw new OverflowException("The resulting value is too large and out of possible values range");
    }
    return result;
  }

  public static double CalcTriangleAreaByBottomAndHeight(double bottom, double height) {
    if (bottom < 0 || height < 0) {
      throw new ArgumentException("bottom and height should be positive");
    }
    double result = bottom * height / 2;
    if (result == double.PositiveInfinity) {
      throw new OverflowException("The resulting value is too large and out of possible values range");
    }
    return result;
  }

  public static double CalcPolygonArea(IList<Point> points) {
    // https://en.wikipedia.org/wiki/Polygon#Area
    // https://ru.stackoverflow.com/questions/483586
    if (points == null || points.Count == 0) {
      return 0;
    }

    double result = 0;

    for (int i = 0; i < points.Count - 1; i++) {
      result += points[i].X * points[i + 1].Y - points[i].Y * points[i + 1].X;
    }

    result += points[points.Count - 1].X * points[0].Y - points[points.Count - 1].Y * points[0].X;

    return Math.Abs(result) / 2;
  }
}
