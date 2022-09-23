using figure_area_lib;

namespace figure_area_lib_tests;

public class FigureAreaPolygonTests {
  [Fact]
  public void CheckNoPoints() {
    Assert.Equal(0, FigureArea.CalcPolygonArea(new Point[] {}));
  }

  [Fact]
  public void CheckOnePoint() {
    Assert.Equal(0, FigureArea.CalcPolygonArea(new [] {new Point(0, 0)}));
  }

  [Fact]
  public void CheckTwoPoints() {
    Assert.Equal(0, FigureArea.CalcPolygonArea(new [] {new Point(0, 0), new Point(1, 0)}));
  }

  [Fact]
  public void CheckTriangle() {
    Assert.Equal(0.5, FigureArea.CalcPolygonArea(new [] {new Point(0, 0), new Point(1, 0), new Point(0, 1)}));
  }

  [Fact]
  public void CheckSquare() {
    Assert.Equal(4, FigureArea.CalcPolygonArea(new [] {new Point(0, 0), new Point(2, 0), new Point(2, 2), new Point(0, 2)}));
  }

  [Fact]
  public void CheckRectangle() {
    Assert.Equal(12, FigureArea.CalcPolygonArea(new [] {new Point(0, 0), new Point(2, 0), new Point(2, 6), new Point(0, 6)}));
  }
}
