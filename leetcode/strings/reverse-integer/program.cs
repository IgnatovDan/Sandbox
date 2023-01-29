public class Solution {
    public int Reverse(int x) {
      var decimalNumbers = new List<int>();
      var sign = Math.Sign(x);
      var currentValue = (sign == -1) ? x : (x * -1);
      
      while(currentValue != 0) {
        int entry = currentValue % 10;
        decimalNumbers.Add(entry);
        double nextDiv10Value = ((double)currentValue) / 10;
        currentValue = (int)Math.Ceiling(nextDiv10Value);
      }
      
      int result = 0;
      double maxValue = (sign == -1) ? Int32.MinValue : (Int32.MaxValue * -1);
      for(int i = 0 ; i < decimalNumbers.Count(); i++) {
        var criticalValue = (maxValue - decimalNumbers[i]) / 10;
        if(result < Math.Ceiling(criticalValue)) {
          return 0;
        }
        result = result * 10 + decimalNumbers[i];
      }
      var resultWithInitialSign = (sign == -1) ? result : (result * -1);
      return resultWithInitialSign;
    }
}
