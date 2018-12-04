
参考：https://www.jianshu.com/p/97222440cd08


# 基本格式要求

1. YAML大小写敏感
2. 使用缩进代表层级关系
3. 缩进只能使用空格，不能使用TAB，不要求空格个数，只需要相同层级左对齐（一般2个或4个空格）
4. 使用#作为注释，YAML中只有行注释

# 对象

* 使用冒号代表，格式为key: value。冒号后面要加一个空格：

```YAML
key: 
  child-key: value
  child-key2: value2
```
* YAML中还支持流式(flow)语法表示对象，比如上面例子可以写为：

```YAML
key: {child-key: value, child-key2: value2}
```

* 较为复杂的对象格式，可以使用问号加一个空格代表一个复杂的key，配合一个冒号加一个空格代表一个value：
* 意思即对象的属性是一个数组[complexkey1,complexkey2]，对应的值也是一个数组[complexvalue1,complexvalue2]
```YAML
? 
    - complexkey1
    - complexkey2
: 
    - complexvalue1
    - complexvalue2
```

# 数组

* 使用一个短横线加一个空格代表一个数组项：

```YAML
hobby:
    - Java
    - Javascript
# 相当于 hobby: [Java, Javascript]
```

```YAML
companies:
    -
        id: 1
        name: company1
        price: 200W
    -
        id: 2
        name: company2
        price: 500W
# 复杂一点的结构：数组里面的元素是对象:
# companies: [{id: 1,name: company1,price: 200W},{id: 2,name: company2,price: 500W}]
```

# 常量

* YAML中提供了多种常量结构，包括：整数，浮点数，字符串，NULL，日期，布尔，时间

```YAML
boolean: 
    - TRUE  #true,True都可以
    - FALSE  #false，False都可以
float:
    - 3.14
    - 6.8523015e+5  #可以使用科学计数法
int:
    - 123
    - 0b1010_0111_0100_1010_1110    #二进制表示
null:
    nodeName: 'node'
    parent: ~  #使用~表示null
string:
    - 哈哈
    - 'Hello world'  #可以使用双引号或者单引号包裹特殊字符
    - newline
      newline2    #字符串可以拆成多行，每一行会被转化成一个空格
date:
    - 2018-02-17    #日期必须使用ISO 8601格式，即yyyy-MM-dd
datetime: 
    -  2018-02-17T15:02:31+08:00    #时间使用ISO 8601格式，时间和日期之间使用T连接，最后使用+代表时区
```

# 特殊符号





