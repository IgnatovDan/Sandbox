using figure_area_lib;

namespace figure_area_lib_tests;

public class FigureAreaTriangleSidesTest {
  [Fact]
  public void CheckZero() {
    Assert.Equal(0, FigureArea.CalcTriangleAreaBySides(0, 0, 0));
  }

  [Fact]
  public void CheckDecimals() {
    Assert.Equal(18.33030277982336, FigureArea.CalcTriangleAreaBySides(5, 8, 11));
  }

  [Fact]
  public void CheckEpsilon() {
    Assert.Equal(0, FigureArea.CalcTriangleAreaBySides(double.Epsilon, double.Epsilon, double.Epsilon));
  }

  [Fact]
  public void CheckDoubleMaxValue() {
    Assert.Throws<OverflowException>(() => FigureArea.CalcTriangleAreaBySides(double.MaxValue, double.MaxValue, double.MaxValue));
  }

  [Fact]
  public void CheckNegative() {
    Assert.Throws<System.ArgumentException>(() => FigureArea.CalcTriangleAreaBySides(-1, 0, 0));
    Assert.Throws<System.ArgumentException>(() => FigureArea.CalcTriangleAreaBySides(0, -1, 0));
    Assert.Throws<System.ArgumentException>(() => FigureArea.CalcTriangleAreaBySides(0, 0, -1));
  }
}
