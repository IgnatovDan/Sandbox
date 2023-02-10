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
    this.rotateByIntermediateCopyShiftedItems(nums, k);
    //this.rotateByIntermediateCopyRotatedItems(nums, k);
    //this.rotateByStepByStepShift(nums, k);
    //this.rotateByOneStepShiftWithFullCopy(nums, k);
  }

  int calcNewIndex(int currentIndex, int shiftPosition, int length) {
    return (currentIndex + shiftPosition) % length;
  }
  
  void rotateByOneStepShiftWithFullCopy(int[] nums, int k) {
    var shiftPosition = k % nums.Length;
    var numsCopy = (int[])nums.Clone();
    
    for(var i = 0; i < nums.Length; i++) {
      var newIndex = calcNewIndex(i, shiftPosition, nums.Length);
      nums[newIndex] = numsCopy[i];
    }
  }
  
  void rotateByStepByStepShift(int[] nums, int k) {
    //  Time Limit Exceeded for int[54944] array
    var shiftPosition = k % nums.Length;
    
    for(int step = 0; step < shiftPosition; step++) {
      int lastValue = nums[nums.Length - 1];
      for(int i = nums.Length - 1; i > 0; i--) {
        nums[i] = nums[i - 1];
      }
      nums[0] = lastValue;
    }
  }
  
  void rotateByIntermediateCopyRotatedItems(int[] nums, int k) {
    var shiftPosition = k % nums.Length;
    int[] rotatedItems = new int[shiftPosition];
    Array.Copy(nums, nums.Length - shiftPosition, rotatedItems, 0, shiftPosition);
    Console.WriteLine(String.Join(",", rotatedItems));
    Array.Copy(nums, 0, nums, shiftPosition,  nums.Length - shiftPosition);
    Array.Copy(rotatedItems, nums, rotatedItems.Length);
  }

  void rotateByIntermediateCopyShiftedItems(int[] nums, int k) {
    var shiftPosition = k % nums.Length;
    int[] shiftedItems = new int[nums.Length - shiftPosition];
    Array.Copy(nums, 0, shiftedItems, 0, nums.Length - shiftPosition);
    Console.WriteLine(String.Join(",", shiftedItems));
    Array.Copy(nums, nums.Length - shiftPosition, nums, 0,  shiftPosition);
    Array.Copy(shiftedItems, 0, nums, shiftPosition, shiftedItems.Length);
  }
}
