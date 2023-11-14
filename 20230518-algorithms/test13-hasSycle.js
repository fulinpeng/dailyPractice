// https://leetcode.cn/problems/linked-list-cycle/submissions/479006206/
// 判断链表中是否有环
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// 直接遍历链表
var hasCycle = function (head) {
    let map = new WeakMap();
    while (head) {
        if (map.get(head)) return true;
        map.set(head, true);
        head = head.next;
    }
    return false;
};

// 快慢指针遍历，有环就一定会相遇
var hasCycle = function (head) {
    if (!head) return false;
    let slow = head,
        fast = head.next;
    while (fast && fast.next) {
        if (slow == fast) return true;
        slow = slow.next; // 慢指针 每次走一步
        fast = fast.next.next; // 快指针 每次走两步
    }
    return false;
};
