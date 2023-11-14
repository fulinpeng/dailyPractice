function ListNode(val) {
    this.val = val;
    this.next = null;
}
// 删除有序链表重复值
var list1 = new ListNode(1);
list1.next = new ListNode(1);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);
list1.next.next.next.next = new ListNode(4);
list1.next.next.next.next.next = new ListNode(5);
var deleteDuplicates = function (head) {
    let pre = head;
    let cur = head ? head.next : null;
    while (cur) {
        if (pre.val === cur.val) {
            pre.next = cur.next;
            cur = cur.next;
        } else {
            pre = cur;
            cur = cur.next;
        }
    }
    return head;
};
console.log(deleteDuplicates(list1));
