/*
https://leetcode.com/explore/featured/card/top-interview-questions-easy/94/trees/555/
Given the root of a binary tree, return its maximum depth.
The number of nodes in the tree is in the range [0, 10^4].

*/

/**
* Definition for a binary tree node.
* public class TreeNode {
*     public int val;
*     public TreeNode left;
*     public TreeNode right;
*     public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
*         this.val = val;
*         this.left = left;
*         this.right = right;
*     }
* }
*/

public class Solution {
  public int MaxDepth(TreeNode root) {
    //return this.CalcMaxDepthWithRecursion(root);
    return this.CalcMaxDepthNoRecursion(root);
  }
  
  public int CalcMaxDepthWithRecursion(TreeNode root) {
    if(root == null) {
      return 0;
    }
    
    int leftDepth = this.CalcMaxDepthWithRecursion(root.left);
    int rightDepth = this.CalcMaxDepthWithRecursion(root.right);
    
    var maxChildDepth = (leftDepth > rightDepth) ? leftDepth : rightDepth;
      
    return 1 + maxChildDepth;
  }
  
  public int CalcMaxDepthNoRecursion(TreeNode root) {
    int maxDepth = 0;
    var currentItem = root;
    var parents = new List<TreeNode>();
    while(currentItem != null) {
      //Console.WriteLine(currentItem.val);
      if(currentItem.left != null) {
        //Console.WriteLine("down left");
        parents.Add(currentItem);
        var prevCurrenItem = currentItem;
        currentItem = currentItem.left;
        prevCurrenItem.left = null;
      } else if(currentItem.right != null) {
        //Console.WriteLine("down right");
        parents.Add(currentItem);
        var prevCurrenItem = currentItem;
        currentItem = currentItem.right;
        prevCurrenItem.right = null;
      } else {
        //Console.WriteLine("leaf is found");
        int currentDepth = parents.Count + 1;
        //Console.WriteLine("current depth: " + currentDepth);
        maxDepth = (currentDepth > maxDepth) ? currentDepth : maxDepth;
        //Console.WriteLine("maxDepth: " + maxDepth);
        if(parents.Count > 0) {
          currentItem = parents[parents.Count - 1];
          parents.RemoveAt(parents.Count - 1);
        } else {
          currentItem = null;
        }
      }
    };
    return maxDepth;
  }
}
