/*
https://leetcode.com/problems/maximum-69-number/
1323. Maximum 69 Number

You are given a positive integer num consisting only of digits 6 and 9.
Return the maximum number you can get by changing at most one digit (6 becomes 9, and 9 becomes 6).
*/

public class Solution {
    public int Maximum69Number (int num) {
        //return UseConvertToString(num);
        return UseDevideReminder(num);
    }

    public int UseConvertToString (int num) {
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

    private int UseDevideReminder(int num) {
        int firstIndexOf6 = -1;
        var currentNum = num;
        var index = 0;
        do {
            int reminder = currentNum % 10;
            if(reminder == 6) {
                firstIndexOf6 = index;
            }
            index ++;
            currentNum = currentNum / 10;
        } while(currentNum > 0);
        if(firstIndexOf6 != -1) {
            return num - 6 * (int)Math.Pow(10, firstIndexOf6) + 9 * (int)Math.Pow(10, firstIndexOf6);
        } else {
            return num;
        }
    }
}
