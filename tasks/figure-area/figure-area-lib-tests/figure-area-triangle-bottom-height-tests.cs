using figure_area_lib;

namespace figure_area_lib_tests;

public class FigureAreaTriangleBottomHeightTest {
  [Fact]
  public void CheckZero() {
    Assert.Equal(0, FigureArea.CalcTriangleAreaByBottomHeight(0, 0));
  }

  [Fact]
  public void CheckDecimals() {
    Assert.Equal(0.5 * 0.5 / 2, FigureArea.CalcTriangleAreaByBottomHeight(0.5, 0.5));
  }

  [Fact]
  public void CheckOne() {
    Assert.Equal(0.5, FigureArea.CalcTriangleAreaByBottomHeight(1, 1));
  }

  [Fact]
  public void CheckDoubleEpsilon() {
    Assert.Equal(double.Epsilon * double.Epsilon / 2, FigureArea.CalcTriangleAreaByBottomHeight(double.Epsilon, double.Epsilon));
  }

  [Fact]
  public void CheckDoubleMaxValue() {
    Assert.Throws<OverflowException>(() => FigureArea.CalcTriangleAreaByBottomHeight(double.MaxValue, double.MaxValue));
  }

  [Fact]
  public void CheckNegative() {
    Assert.Throws<System.ArgumentException>(() => FigureArea.CalcTriangleAreaByBottomHeight(-1, 0));
    Assert.Throws<System.ArgumentException>(() => FigureArea.CalcTriangleAreaByBottomHeight(0, -1));
  }
}
