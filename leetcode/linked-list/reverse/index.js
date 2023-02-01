// https://leetcode.com/explore/featured/card/top-interview-questions-easy/93/linked-list/560/

/**

Given the head of a singly linked list, reverse the list, and return the reversed list.

 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let newHead = null;
  let currentHead = head;
  while(currentHead) {
    const prevHead = newHead;
    newHead = new ListNode(currentHead.val, prevHead);
    currentHead = currentHead.next;
  }
  return newHead;
};
