public class Solution {
    public void ReverseString(char[] s) {
      //
      // v1: Array.Reverse(s);
      //
      
      // v2:
      uint middleIndex = ((uint)s.Length) >> 1; // '>>>' - unsigned shift, introduced in c#11
      for(int i = 0; i < middleIndex; i++) {
        char temp = s[s.Length - i - 1];
        s[s.Length - i - 1] = s[i];
        s[i] = temp;
      }
    }
}
