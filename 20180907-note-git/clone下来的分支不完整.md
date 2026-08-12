Git clone下来的分支不完整

将仓库git clone到本地后发现本地缺失了一些远程仓库的分支。

一般发生在git clone —depth 1设置克隆深度时发生。因为有些大型项目一次性克隆容易出错，所以只克隆一层深度。

如远程有分支branch_a，克隆下来后使用git branch -av命令查看所有分支没有显示该分支，该如何解决？

git remote set-branches origin 'branch_a'

git fetch -v
