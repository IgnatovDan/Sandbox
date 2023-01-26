static int findNextMaxValueIndex(int[] prices, int startIndex)
{
  if (startIndex >= prices.Length)
  {
    return startIndex;
  }
  int currentMaxValue = prices[startIndex];
  int result = startIndex;
  for (int i = startIndex; i < prices.Length; i++)
  {
    if (currentMaxValue <= prices[i])
    {
      result = i;
    }
  }
  return result;
}

static int calcMaxProfit(int[] prices, int initialBuyIndex, int initialSellIndex)
{
  CallCounter.value++;
  if (initialSellIndex >= prices.Length)
  {
    return 0;
  }
  if (initialBuyIndex >= initialSellIndex)
  {
    return 0; // or throw new InvalidArgumentsException();
  }

  int maxProfit = 0;
  for (int buyIndex = initialBuyIndex; buyIndex <= prices.Length - 2; buyIndex++)
  {
    int buyPrice = prices[buyIndex];
    int currentInitialSellIndex =
        (initialSellIndex == -1 || initialSellIndex <= buyIndex)
        ? (buyIndex + 1) : initialSellIndex;
    int prevSellPrice = prices[currentInitialSellIndex];
    //int nextMaxValueIndex = -1;
    for (int sellIndex = currentInitialSellIndex; sellIndex <= prices.Length - 1; sellIndex++)
    {
      // if (nextMaxValueIndex == -1)
      // {
      //   nextMaxValueIndex = findNextMaxValueIndex(prices, sellIndex);
      //   sellIndex = nextMaxValueIndex;
      //   nextMaxValueIndex = -1;
      // }
      // if (nextMaxValueIndex == sellIndex)
      // {
      //   nextMaxValueIndex = -1;
      // }
      // if (sellIndex < nextMaxValueIndex)
      // {
      //   continue;
      // }
      int sellPrice = prices[sellIndex];
      if (sellPrice > buyPrice)
      {
        int futureMaxProfit = calcMaxProfit(prices, sellIndex + 1, sellIndex + 2);
        int profit = sellPrice - buyPrice + futureMaxProfit;
        if (maxProfit < profit)
        {
          maxProfit = profit;
        }
      }
    }
  }
  return maxProfit;
}

static int MaxProfit(int[] prices)
{
  int result = calcMaxProfit(prices, 0, 1);
  return result;
}


Console.WriteLine("Hello, World!");
static void runTest(int[] prices, int expected, int expectedCallCount)
{
  CallCounter.value = 0;
  int actual = MaxProfit(prices);
  if (actual != expected) Console.WriteLine("expected result: " + expected + ", actual " + actual + ", [" + String.Join(",", prices) + "]");
  if (CallCounter.value != expectedCallCount) Console.WriteLine("expected call count: " + expectedCallCount + ", actual " + CallCounter.value + ", [" + String.Join(",", prices) + "]");  
}

runTest(new int[] { 1, 2 }, 1, 2);
runTest(new int[] { 1, 3 }, 2, 2);
runTest(new int[] { 1, 2, 3 }, 2, 4);
runTest(new int[] { 1, 2, 3, 4 }, 3, 8);
runTest(new int[] { 7,6,4,3,1 }, 0, 1);
runTest(new int[] { 7,1,5,3,6,4 }, 7, 10);
runTest(new int[] { 397, 6621, 4997, 7506, 8918, 1662, 9187, 3278, 3890, 514, 18, 9305, 93, 5508, 3031, 2692, 6019, 1134 }, 36311, 8778);

//Console.WriteLine(MaxProfit(new int[] { 397, 6621, 4997, 7506, 8918, 1662, 9187, 3278, 3890, 514, 18, 9305, 93, 5508, 3031, 2692, 6019, 1134, 1691, 4949, 5071, 799, 8953, 7882, 4273, 302, 6753, 4657, 8368, 3942, 1982, 5117, 563, 3332, 2623, 9482, 4994, 8163, 9112, 5236, 5029, 548 }));
Console.WriteLine("finished");

class CallCounter
{
  static public int value;
}

