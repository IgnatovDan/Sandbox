// https://leetcode.com/explore/featured/card/top-interview-questions-easy/93/linked-list/560/

/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val=0, ListNode next=null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
public class Solution {
    public ListNode ReverseList(ListNode head) {
      return ReverseList_ModifyInitial(head);
    }

    public ListNode ReverseList_CreateCopy(ListNode head) {
      ListNode newHead = null;
      
      var currentNode = head;
      while (currentNode != null) {
        var prevHead = newHead;
        newHead = new ListNode(currentNode.val, prevHead);
        currentNode = currentNode.next;
      }

      return newHead;
    }

    public ListNode ReverseList_ModifyInitial(ListNode head) {
      var currentNode = head;
      ListNode newHead, prevCurrentNode = null;
      
      while (currentNode != null) {
        newHead = currentNode;
        nextNode = currentNode.next;
        currentNode.next = prevCurrentNode
        currentNode = nextNode;
      }

      return newHead;
    }

    public ListNode ReverseList_List_ByNext_ModifyInitial(ListNode head) {
      List<ListNode> values = new List<ListNode>();
      var currentNode = head;
      while(currentNode != null) {
        values.Add(currentNode);
        currentNode = currentNode.next;
      }
      values.Reverse();
      currentNode = head;
      for(int i = 0; i < values.Count - 1; i++) {
        values[i].next = values[i + 1];
      }
      values[values.Count - 1].next = null;
      return values[0];
    }

    public ListNode ReverseList_List_ByValue_ModifyInitial(ListNode head) {
      List<int> values = new List<int>();
      var currentNode = head;
      while(currentNode != null) {
        values.Add(currentNode.val);
        currentNode = currentNode.next;
      }
      values.Reverse();
      currentNode = head;
      for(int i = 0; i < values.Count; i++) {
        currentNode.val = values[values.Count - i - 1];
        currentNode = currentNode.next;
      }
      return head;
    }
}
