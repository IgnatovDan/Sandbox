/*
https://leetcode.com/explore/featured/card/top-interview-questions-easy/94/trees/625/

Given the root of a binary tree, determine if it is a valid binary search tree (BST).
A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.
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

class TreeNodeDetails {
  public int minValueRecursive;
  public int maxValueRecursive;
  public bool valid;
}

public class Solution {
  public bool IsValidBST(TreeNode root) {
    return IsValidBST_MinMax(root);
    //return IsValidBST_NodeDetails(root);
  }
  
  private TreeNodeDetails GetNodeDetails(TreeNode root) {
    if(root == null) {
      return null;
    }
    
    var leftDetails = GetNodeDetails(root.left);
    if(leftDetails != null) {
      if(!leftDetails.valid) {
        return new TreeNodeDetails { valid = false };
      }
      if(leftDetails.maxValueRecursive >= root.val) {
        return new TreeNodeDetails { valid = false };
      }
    }
    
    var rightDetails = GetNodeDetails(root.right);
    if(rightDetails != null) {
      if(!rightDetails.valid) {
        return new TreeNodeDetails { valid = false };
      }
      if(rightDetails.minValueRecursive <= root.val) {
        return new TreeNodeDetails { valid = false };
      }
    }

    if(leftDetails != null && rightDetails != null
      && (leftDetails.maxValueRecursive >= rightDetails.minValueRecursive)) {
      return new TreeNodeDetails { valid = false };
    }
    
    return new TreeNodeDetails { 
      valid = true,
      minValueRecursive = (leftDetails != null) ? leftDetails.minValueRecursive : root.val,
      maxValueRecursive = (rightDetails != null) ? rightDetails.maxValueRecursive : root.val,
    };
  }
  
  private bool IsValidBST_NodeDetails(TreeNode root) {
    return GetNodeDetails(root)?.valid ?? true;
  }

  private bool ValidateTree(TreeNode node, int? min, int? max) {
    if(node == null) {
      return true;
    }
    
    if(min.HasValue && (node.val <= min) || max.HasValue && (node.val >= max)) {
      return false;
    }
    
    return ValidateTree(node?.left, min, node?.val) && ValidateTree(node?.right, node?.val, max);
  }
  
  private bool IsValidBST_MinMax(TreeNode root) {
    return ValidateTree(root?.left, null, root?.val) && ValidateTree(root?.right, root?.val, null);
  }
}
