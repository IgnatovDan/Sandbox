/*
https://leetcode.com/problems/maximum-69-number/
1323. Maximum 69 Number

You are given a positive integer num consisting only of digits 6 and 9.
Return the maximum number you can get by changing at most one digit (6 becomes 9, and 9 becomes 6).
*/

public class Solution {
    public int Maximum69Number (int num) {
        int result = num;
        string numAsDecimalString = num.ToString();
        int indexOfSix = numAsDecimalString.IndexOf('6');
        if(indexOfSix > -1) {
            char[] numAsChars = numAsDecimalString.ToCharArray();
            numAsChars[indexOfSix] = '9';
            result = int.Parse(new String(numAsChars));
        }
        return result;
    }
}
