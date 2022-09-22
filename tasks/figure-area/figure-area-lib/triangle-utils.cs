namespace figure_area_lib;

public class TriangleUtils {
  private static double CalcLengthPow2(Point p1, Point p2) {
    // https://ru.onlinemschool.com/math/library/analytic_geometry/point_point_length/
    return Math.Pow(p1.X - p2.X, 2) + Math.Pow(p1.Y - p2.Y, 2);
  }
  public static bool IsTriangle(IList<Point> points) {
    if (points.Count != 3
      || (points[0].X == points[1].X && points[1].X == points[2].X)
      || (points[0].Y == points[1].Y && points[1].Y == points[2].Y)) {
      return false;
    }
    return true;
  }
  public static bool IsRightTriangle(IList<Point> points) {
    if (!IsTriangle(points)) {
      return false;
    }
    Point p0 = points[0];
    Point p1 = points[1];
    Point p2 = points[2];

    // Math.Sqrt нигде не использую, это лишняя операция, потому что все складывать буду после возведения в квадрат
    // и ещ он дает погрешность: 2.0000000000000004
    List<double> sidesPow2 = new List<double>() {
      CalcLengthPow2(p0, p1),
      CalcLengthPow2(p1, p2),
      CalcLengthPow2(p2, p0)
    };
    sidesPow2.Sort();
    return sidesPow2[2] == (sidesPow2[0] + sidesPow2[1]);
  }
}
