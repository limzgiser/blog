/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {

  var box = new Map();
  for(var i = 0 ; i < nums.length;i++){
      if(box[target-nums[i]]>=0){
          return [box[target - nums[i]],i];
      }
      box[nums[i]] = i;
  }
};