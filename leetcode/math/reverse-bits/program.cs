/*
https://leetcode.com/problems/reverse-bits/description/

Reverse bits of a given 32 bits unsigned integer.
*/

public class Solution {
    public uint reverseBits(uint n) {
        uint result = 0;
        for(byte i = 0; i < 32; i++) {
            uint currentBitValue = (n & ((uint)1 << i));
            if(currentBitValue != 0) {
                result |= (uint)1 << (31 - i);
            }
        }
        return result;
    }
}
