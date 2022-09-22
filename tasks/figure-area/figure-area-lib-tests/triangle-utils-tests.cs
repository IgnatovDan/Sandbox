using figure_area_lib;

namespace figure_area_lib_tests;

public class TriangleUtils_IsRightTriangle_Tests {
  [Fact]
  public void NoPoints() {
    Assert.False(TriangleUtils.IsRightTriangle(new Point[] { }));
  }

  [Fact]
  public void OnePoint() {
    Assert.False(TriangleUtils.IsRightTriangle(new Point[] { new Point(0, 0) }));
  }

  [Fact]
  public void TwoPoints() {
    Assert.False(TriangleUtils.IsRightTriangle(new Point[] { new Point(0, 0), new Point(0, 0) }));
  }

  [Fact]
  public void ZeroCoordinates() {
    Assert.False(TriangleUtils.IsRightTriangle(new Point[] { new Point(0, 0), new Point(0, 0), new Point(0, 0) }));
  }

  [Fact]
  public void LineXCoordinates() {
    Assert.False(TriangleUtils.IsRightTriangle(new Point[] { new Point(0, 10), new Point(0, 5), new Point(0, 1) }));
  }

  [Fact]
  public void LineYCoordinates() {
    Assert.False(TriangleUtils.IsRightTriangle(new Point[] { new Point(10, 0), new Point(5, 0), new Point(1, 0) }));
  }

  [Fact]
  public void RightTriangle1() {
    Assert.True(TriangleUtils.IsRightTriangle(new Point[] { new Point(0, 0), new Point(0, 1), new Point(1, 0) }));
  }

  [Fact]
  public void RightTriangle2() {
    Assert.True(TriangleUtils.IsRightTriangle(new Point[] { new Point(5, 5), new Point(10, 5), new Point(10, 10) }));
  }

  [Fact]
  public void RightTriangle3() {
    Assert.True(TriangleUtils.IsRightTriangle(new Point[] { new Point(0, 0), new Point(1, 1), new Point(2, 0) }));
  }

  [Fact]
  public void RightTriangle4() {
    Assert.True(TriangleUtils.IsRightTriangle(new Point[] { new Point(0, 0), new Point(1, 2), new Point(1, 0) }));
  }

  [Fact]
  public void NonRightTriangle1() {
    Assert.False(TriangleUtils.IsRightTriangle(new Point[] { new Point(0, 0), new Point(1, 2), new Point(2, 0) }));
  }
}
