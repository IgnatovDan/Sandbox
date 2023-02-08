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
  //rotateByOneStepShiftWithIntermediateValue(nums, k);
  rotateByOneStepShiftWithFullCopy(nums, k);
  //rotateByStepByStepShift(nums, k);
  //rotateByIntermediateCopyShiftedItems(nums, k);
  //rotateByIntermediateCopyRotatedItems(nums, k);
};

function rotateByOneStepShiftWithIntermediateValue(nums, k) {
  function getNewIndex(index, shiftPosition, arrayLength) {
    return (index + shiftPosition) % arrayLength;
  }
  
  if(!nums.length || nums.length == 1) {
    return;
  }
  let shiftPosition = k % nums.length;
  let numsCopy = [...nums];
  
  let newIndex = 0;
  let currentValue = nums[0];
  let i = 0;
  do {
    let currentIndex = newIndex;
    newIndex = getNewIndex(currentIndex, shiftPosition, nums.length);
    let intermediateValue = nums[newIndex];
    nums[newIndex] = currentValue;
    currentValue = intermediateValue;
    // This will not work for ([1, 2, 3, 4], 2)
    // Output:   [3, 2, 1, 4]
    // Expected: [3, 4, 1, 2]
    // Code doesn't enumerate each value
  } while(newIndex != 0);
}

function rotateByOneStepShiftWithFullCopy(nums, k) {
  function getNewIndex(index, shiftPosition, arrayLength) {
    return (index + shiftPosition) % arrayLength;
  }
  
  let shiftPosition = k % nums.length;
  let numsCopy = [...nums];
  
  for(let i = 0; i < nums.length; i++) {
    let newIndex = getNewIndex(i, shiftPosition, nums.length);
    nums[newIndex] = numsCopy[i];
  }
}

function rotateByStepByStepShift(nums, k) {
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
