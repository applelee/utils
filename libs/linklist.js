const linklist = (arr = []) => {
  // 链表长度
  let size
  // 链表数据
  let list
  // 表节点构造函数
  const Node = function (value) {
    if (!value && typeof value !== 'number') return
    this.value = value
    // this.next
  }

  // 链表构造函数
  const LinkList = function (arr = []) {
    init()
    if (arr.length < 1) return
    this.insertBatch(arr)
  }

  // 初始化
  const init = () => {
    // 加入头节点
    list = new Node('head')
    // 加入尾节点
    list.next = new Node('nil')
    size = 0
  }

  // 设置公开属性或方法
  LinkList.prototype = {
    // 返回链表数据
    get data () {
      return list
    },
    // 返回链表的长度
    get size () {
      return size
    },
    // 插入操作
    // 默认从尾部插入，也可以指定位置插入
    insert (data, n = size) {
      if (n !== size) n %= size
      // 计数器
      let count = 0
      // 当前节点
      let currentNode = list

      while (count <= n) {
        if (count === n) {
          const tempNode = currentNode.next
          currentNode.next = new Node(data)
          currentNode.next.next = tempNode
        } else currentNode = currentNode.next
        count += 1
      }
      size += 1
    },
    // 批量插入
    insertBatch (arr = []) {
      for (let i = 0; i < arr.length; i ++) {
        this.insert(arr[i])
      }
    },
    // 获取第n个节点的值
    getNodeData (n) {
      if (size <= 0 || !n) return
      let count = 0
      let currentNode = list
      if (n !== size) n %= size
      if (n < 0) n += size

      while (count <= n) {
        if (count === n) return currentNode.data
        currentNode = currentNode.next
        count += 1
      }
    },
    // 删除第n个节点
    delete (n) {
      if (!n) return
      let count = 0
      let currentNode = list
      // 对n进行修正，限制n的范围，n为负数修正为正数
      if (n !== size) n %= size
      if (n < 0) n += size + 1

      while (count < n) {
        if (count === n - 1) currentNode.next = currentNode.next.next
        else currentNode = currentNode.next
        count += 1
      }
      size -= 1
    },
    // 清空链表
    clear () {
      init()
    },
  }

  return new LinkList(arr)
}
