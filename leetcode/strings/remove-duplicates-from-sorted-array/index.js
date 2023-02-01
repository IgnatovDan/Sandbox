/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let lastUniqueValueIndex = 0;
  for(let i = 1; i < nums.length; i++) {
    if(nums[i] != nums[lastUniqueValueIndex]) {
      lastUniqueValueIndex++;
      nums[lastUniqueValueIndex] = nums[i];
    }
    if(nums[i] == 100) {
      // "-100 <= nums[i] <= 100"
      break;
    }
  }
  return lastUniqueValueIndex + 1;
};
