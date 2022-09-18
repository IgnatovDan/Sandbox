using figure_area_lib;

namespace figure_area_lib_tests;

public class FigureAreaCircleTest {
  [Fact]
  public void CheckZero() {
    Assert.Equal(0, FigureArea.CalcCircleArea(0));
  }

  [Fact]
  public void CheckDecimals() {
    Assert.Equal(Math.PI * 0.5 * 0.5, FigureArea.CalcCircleArea(0.5));
  }

  [Fact]
  public void CheckOne() {
    Assert.Equal(Math.PI, FigureArea.CalcCircleArea(1));
  }

  [Fact]
  public void CheckDoubleEpsilon() {
    Assert.Equal(Math.PI * double.Epsilon * double.Epsilon, FigureArea.CalcCircleArea(double.Epsilon));
  }

  [Fact]
  public void CheckDoubleMaxValue() {
    Assert.Throws<OverflowException>(() => FigureArea.CalcCircleArea(double.MaxValue));
  }

  [Fact]
  public void CheckNegative() {
    Assert.Throws<System.ArgumentException>(() => FigureArea.CalcCircleArea(-1));
  }
}
