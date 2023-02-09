/*
https://leetcode.com/explore/featured/card/top-interview-questions-easy/92/array/646/
Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

public class Solution {
  public void Rotate(int[] nums, int k) {
    this.rotateByStepByStepShift(nums, k);
    //this.rotateByOneStepShiftWithFullCopy(nums, k);
  }

  int calcNewIndex(int currentIndex, int shiftPosition, int length) {
    return (currentIndex + shiftPosition) % length;
  }
  
  void rotateByOneStepShiftWithFullCopy(int[] nums, int k) {
    if(nums.Length == 0 || nums.Length == 1) {
      return;
    }
    var shiftPosition = k % nums.Length;
    var numsCopy = (int[])nums.Clone();
    
    for(var i = 0; i < nums.Length; i++) {
      var newIndex = calcNewIndex(i, shiftPosition, nums.Length);
      nums[newIndex] = numsCopy[i];
    }
  }
  
  void rotateByStepByStepShift(int[] nums, int k) {
    //  Time Limit Exceeded for int[54944] array
    if(nums.Length == 0 || nums.Length == 1) {
      return;
    }
    var shiftPosition = k % nums.Length;
    
    for(int step = 0; step < shiftPosition; step++) {
      int lastValue = nums[nums.Length - 1];
      for(int i = nums.Length - 1; i > 0; i--) {
        nums[i] = nums[i - 1];
      }
      nums[0] = lastValue;
    }
  }
}
