namespace figure_area_lib;

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
}
