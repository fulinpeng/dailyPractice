function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}
var list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);

// 会改变原有数据
var reverseList = function (head) {
    let pre = null;
    let cur = head;
    let temp = null;
    while (cur) {
        temp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = temp;
    }
    return pre;
};
console.log(reverseList(list));

// 不改变原有数据结构，重新生成一份
var reverseList = function (head) {
    let cur = head;
    let res = null;
    while (cur) {
        let list = new ListNode(cur.val);
        list.next = res;
        res = list;
        cur = cur.next;
    }
    return res;
};
list = reverseList(list);
console.log(list);
