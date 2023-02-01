// https://leetcode.com/explore/featured/card/top-interview-questions-easy/92/array/727/
/*
Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.
Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.
Return k after placing the final result in the first k slots of nums.
Do not allocate extra space for another array. You must do this by modifying the input array in-place
*/
public class Solution {
    public int RemoveDuplicates(int[] nums) {
        int lastUniqueValueIndex = 0;
        for(int i = 1; i < nums.Length; i++) {
            if(nums[i] != nums[i - 1]) {
                lastUniqueValueIndex++;
                if(i != lastUniqueValueIndex) {
                    nums[lastUniqueValueIndex] = nums[i];
                }
            }
            if(nums[i] == 100) {
                break; // from "-100 <= nums[i] <= 100"
            }
        }
        return lastUniqueValueIndex + 1;
    }
}
