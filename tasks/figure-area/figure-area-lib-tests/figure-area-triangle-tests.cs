using figure_area_lib;

namespace figure_area_lib_tests;

public class FigureAreaTriangleTest {
  [Fact]
  public void CheckZero() {
    Assert.Equal(0, FigureArea.CalcTriangleAreaByBottomAndHeight(0, 0));
  }

  [Fact]
  public void CheckDecimals() {
    Assert.Equal(0.5 * 0.5 / 2, FigureArea.CalcTriangleAreaByBottomAndHeight(0.5, 0.5));
  }

  [Fact]
  public void CheckOne() {
    Assert.Equal(0.5, FigureArea.CalcTriangleAreaByBottomAndHeight(1, 1));
  }

  [Fact]
  public void CheckDoubleEpsilon() {
    Assert.Equal(double.Epsilon * double.Epsilon / 2, FigureArea.CalcTriangleAreaByBottomAndHeight(double.Epsilon, double.Epsilon));
  }

  [Fact]
  public void CheckDoubleMaxValue() {
    Assert.Throws<OverflowException>(() => FigureArea.CalcTriangleAreaByBottomAndHeight(double.MaxValue, double.MaxValue));
  }

  [Fact]
  public void CheckNegative() {
    Assert.Throws<System.ArgumentException>(() => FigureArea.CalcTriangleAreaByBottomAndHeight(-1, 0));
    Assert.Throws<System.ArgumentException>(() => FigureArea.CalcTriangleAreaByBottomAndHeight(0, -1));
  }
}
