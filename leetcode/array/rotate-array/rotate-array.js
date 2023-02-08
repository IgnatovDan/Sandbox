/*
https://leetcode.com/explore/featured/card/top-interview-questions-easy/92/array/646/
Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  //rotateByCicledStepByStepShift(nums, k);
  rotateByIntermediateCopyShiftedItems(nums, k);
  //rotateByIntermediateCopyRotatedItems(nums, k);
};

function rotateByCicledStepByStepShift(nums, k) {
  //  Time Limit Exceeded for 11939 items in array
  if(!nums.length || nums.length == 1) {
    return;
  }
  let shiftSteps = k % nums.length;
  for(let step = 0; step < shiftSteps; step++) {
    let lastValue = nums[nums.length - 1];
    for(let i = nums.length - 1; i >= 0; i--) {
      nums[i] = nums[i - 1];
    }
    nums[0] = lastValue;
    //console.log('nums ' + nums);
  }
}

function rotateByIntermediateCopyShiftedItems(nums, k) {
  if(!nums.length) {
    return;
  }
  let shiftLength = k % nums.length;
  let shiftedNums = nums.splice(0, nums.length - shiftLength);
  console.log('shiftedNums ' + shiftedNums);
  console.log('nums ' + nums);
  nums.push(...shiftedNums);
}

function rotateByIntermediateCopyRotatedItems(nums, k) {
  if(!nums.length) {
    return;
  }
  let shiftLength = k % nums.length;
  let rotatedNums = nums.splice(nums.length - shiftLength, shiftLength);
  console.log('rotatedNums ' + rotatedNums);
  console.log('nums ' + nums);
  nums.unshift(...rotatedNums);
  console.log(nums);
}
