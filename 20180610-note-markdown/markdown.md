# 标题
h1~h6标签：
# h1
## h2
### h3
#### h4
##### h5
###### h6
This is also an H1
===
This is also an H2
---

# 段落
This is a long paragraph Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph

下一个段落要换行

Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph

# 样式
*Italic characters* 
_Italic characters_
**bold characters**
__bold characters__
~~strikethrough text~~

# 列表
## 无序列表
*  Item 1
*  Item 2
*  Item 3
    *  Item 3a
    *  Item 3b
    *  Item 3c
        * Item 4a
        * Item 4a
        * Item 4a
## 有序列表
1.  Step 1
2.  Step 2
3.  Step 3
    1.  Step 3.1
    2.  Step 3.2
    3.  Step 3.3
## 混用
1.  Step 1
2.  Step 2
3.  Step 3
    *  Item 3a
	*  Item 3b
	*  Item 3c

# 引用
## 段落：
> 注意：换行也会合并为一行：
Markdown syntax
Markdown syntax
## 多个段落：
> Neque porro quisquam est qui

> dolorem ipsum quia dolor sit amet,

> consectetur, adipisci velit...
## 缩进：
> Neque porro quisquam est qui 
>> dolorem ipsum quia dolor sit amet, 
>>> consectetur, adipisci velit...

# 行内标记
注意：在标记内部使用 ` 要用()括起来

Use the backtick to refer to a `function()`.
There is a literal ``backtick (`)`` here.

# 代码块
## 两种方法
1、每行开始有4个空格的缩进：

    This is a code block.
    With multiple lines.
2、也可以用3个反引号 ` 包裹起来：

```
This is a code block
```

## 为代码块添加高亮
需要在开始的3个反引号 ` 后面跟上所属语言的名字，比如：```javascript
```html
<div>标签</div>
```
```css
h1{
    color:red;
    background:black;
}
```
```javascript
var oldUnload = window.onbeforeunload;
window.onbeforeunload = function() {
    saveCoverage();
    if (oldUnload) {
        return oldUnload.apply(this, arguments);
    }
};
```

# 超链接

This is [an example](http://www.example.com/) inline link.

[This link](http://example.com/ "Title") has a title attribute.

Links are also auto-detected in text: http://example.com/

# 图片引用

![](www.baidu.com/img/bd_logo1.png)

![Alt text](http://www.baidu.com/img/bd_logo1.png "Title")

[![Alt text](http://www.baidu.com/img/bd_logo1.png "该图片带有链接")](http://www.baidu.com/)

# 表格

> : 代表对齐方式 ,** : 与 | 之间不要有空格，否则对齐会有些不兼容

|    a    |       b       |      c     |
|:-------:|:------------- | ----------:|
|   居中  |     左对齐    |   右对齐   |
|         |               |            |

# 分隔符

***
---

# 锚文本
* [理论基础](markdown.md)
    * [导波控制方程](markdown.md)
    * [导波频散曲线分析](markdown.md)
* [数值模拟](markdown.md)

# 参考文章：

https://www.jianshu.com/p/b03a8d7b1719

https://confluence.atlassian.com/bitbucketserver/markdown-syntax-guide-776639995.html