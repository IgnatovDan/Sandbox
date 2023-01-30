public class Solution {
    public int Reverse(int x) {
      return Reverse_via_string(x);
    }
    
    public int Reverse_via_string(int x) {
      // Abs(Int32.MinValue) > Int32.MaxValue but it is not possible to get these values reversing source number
      // and I can remove the '-' sign
      var chars = x.ToString("D").TrimStart('-').ToCharArray();
      Array.Reverse(chars);
      int result;
      int.TryParse(new String(chars), out result);
      return result * Math.Sign(x);
    }

    public int Reverse_via_double(int x) {
      var decimalNumbers = new List<int>();
      var sign = Math.Sign(x);
      double currentValue = Math.Abs((double)x);
      
      while(currentValue != 0) {
        int entry = (int)Math.Round(currentValue % 10);
        decimalNumbers.Add(entry);
        double nextDiv10Value = currentValue / 10;
        currentValue = (int)Math.Floor(nextDiv10Value);
      }
      
      double result = 0;
      for(int i = 0 ; i < decimalNumbers.Count(); i++) {
        result = result * 10 + decimalNumbers[i];
      }
      var resultWithInitialSign = (sign == 1) ? result : (result * -1);
      if(sign == -1) {
        return (resultWithInitialSign < int.MinValue) ? 0 : (int)resultWithInitialSign;
      } else {
        return (resultWithInitialSign > int.MaxValue) ? 0 : (int)resultWithInitialSign;
      }
    }
  
    public int Reverse_via_int32(int x) {
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
