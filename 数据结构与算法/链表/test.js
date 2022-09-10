// 构造函数节点
function Node(value) {
    this.value = value;
    this.next = null;
}

/**
 * 遍历打印链表
 * @param {*} root 表示链表根节点 
 */
function print(root) {
    if (!root) return;
    console.log(root.value);
    print(root.next);
}

/**
 * 获取链表的长度
 * @param {*} root 表示链表根节点  
 */
function count(root) {
    if (!root) return 0;
    return 1 + count(root.next);
}

/**
 * 通过下标获取链表中的某个数据
 * @param {*} root 表示根节点
 * @param {*} index 表示下标
 */
function getValue(root, index) {
    /**
     * 判断某个节点是否是我要查找的节点
     * @param {*} node 表示某个节点
     * @param {*} i 表示该节点的下标
     */
    function _getValue(node, i) {
        if (!node) return null;
        if (i === index) return node;
        return _getValue(node.next, ++i);
    }
    return _getValue(root, 0);
}

/**
 * 通过下标设置链表中的某个数据
 * @param {*} root 表示根节点 
 * @param {*} index 表示下标 
 * @param {*} value 表示要设置的数据
 */
function setValue(root, index, value) {
    /**
     * 判断某个节点是否是我要查找的节点
     * @param {*} node 表示某个节点
     * @param {*} i 表示该节点的下标
     */
    function _setValue(node, i) {
        if (!node) return;
        if (i === index) {
            node.value = value;
        } else {
            _setValue(node.next, i + 1);
        }
    }
    return _setValue(root, 0);
}

/**
 * 在链表某一个节点之后加入一个新节点
 * @param {*} node 表示在哪个节点之后插入
 * @param {*} newValue 表示新节点的值
 */
function insertAfter(node, newValue) {
    var newNode = new Node(newValue);
    newNode.next = node.next;
    node.next = newNode;
}

/**
 * 在链表末尾加入一个新节点
 * @param {*} root 表示根节点
 * @param {*} newValue 表示新节点的值
 */
function push(root, newValue) {
    if (!root.next) { // 最后一个节点
        var newNode = new Node(newValue);
        root.next = newNode;
    } else { //不是最后一个节点
        push(root.next, newValue)
    };
}

/**
 * 删除一个链表节点
 * 注意：链表无法删除根节点
 * @param {*} root 表示一个根节点
 * @param {*} value 要删除的节点的值
 */
function removeNode(root, value) {
    if(!root || !root.next) return; //无法删除的情况
    if(root.next.value === value) { //下一个节点就是要删除的节点
        root.next = root.next.next;
    }else { //下一个节点不是要删除的节点
        removeNode(root.next, value);
    }
}

/**
 * 给一个链表，返回一个倒序后的链表
 * @param {*} root 
 */
function reverse(root) {
    var temp;
    if(!root || !root.next) return root; //如果链表为空或只有一个节点
    if(!root.next.next) { //有两个节点的链表
        temp = root.next;
        root.next.next = root;
        root.next = null;
    }else { //三个以上节点
        temp = reverse(root.next); //把除根节点的后续节点倒序
        root.next.next = root;
        root.next = null;
    }
    return temp;
}

var a = new Node('a');
var b = new Node('b');
var c = new Node('c');
a.next = b;
b.next = c;

// print(a);
// console.log(count(a));
// console.log(getValue(a, 2));
// setValue(a, 2, 'hello');
// insertAfter(b, 'd');
// push(a, 'd');
// removeNode(a, 'b');
// console.log(reverse(a));