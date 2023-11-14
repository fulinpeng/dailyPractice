// https://leetcode.cn/problems/add-two-numbers/submissions/
// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}
// 链表模拟两数相加
var addTwoNumbers = function (l1, l2) {
    if (!l1) return l2;
    if (!l2) return l1;
    let rest = 0;
    let res = new ListNode();
    let cur = res;
    while (l1 || l2 || rest) {
        let sum = (l1 && l1.val ? l1.val : 0) + (l2 && l2.val ? l2.val : 0) + rest;
        let newList = new ListNode(sum % 10);
        cur.next = newList;
        cur = newList;

        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;
        rest = sum >= 10 ? 1 : 0;
    }
    return res.next;
};
