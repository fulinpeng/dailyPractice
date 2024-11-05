如果你不小心将敏感的密钥文件提交到了 Git 仓库中，即使删除了文件，历史记录中仍然会有它的痕迹。为了完全移除密钥文件的提交记录，可以使用 Git 的 `filter-repo` 或 `BFG Repo-Cleaner` 工具来清理提交历史中所有与该文件相关的记录。

### 方法 1：使用 `git filter-repo` 完全移除文件
`git filter-repo` 是处理这种情况的推荐方法。

#### 安装 `git filter-repo`
```bash
# 对于有pip的用户，使用下面的命令安装
pip install git-filter-repo
```

#### 完全移除文件历史
1. **清理密钥文件**
   假设密钥文件的路径为 `path/to/secret-key.txt`，执行以下命令清理文件的所有历史：
   ```bash
   git filter-repo --path path/to/secret-key.txt --invert-paths
   ```

   该命令会从所有历史提交中移除 `path/to/secret-key.txt` 文件。

2. **强制推送到远程仓库**
   清理完本地仓库之后，你需要强制推送修改到远程仓库，以确保远程历史也被更新：
   ```bash
   git push origin --force --all
   ```

3. **强制更新远程标签**
   如果你使用了标签，别忘了强制更新标签：
   ```bash
   git push origin --force --tags
   ```

#### 确保其他开发者同步更改
其他开发者拉取更新时，需要重置本地分支以避免历史冲突。你可以提醒他们使用以下命令重置本地分支：
```bash
git fetch origin
git reset --hard origin/branch-name
```
其中 `branch-name` 是你推送的分支名。

### 方法 2：使用 BFG Repo-Cleaner 工具清理密钥文件

#### 安装 BFG Repo-Cleaner
下载 BFG Repo-Cleaner：
- BFG Repo-Cleaner 官方网站：https://rtyley.github.io/bfg-repo-cleaner/
  
#### 使用 BFG 清理密钥文件
1. **清理文件**
   假设文件名为 `secret-key.txt`，运行以下命令清理历史记录：
   ```bash
   java -jar bfg.jar --delete-files secret-key.txt
   ```

2. **清理垃圾提交**
   BFG 清理后，还需使用 Git 自带的垃圾回收命令：
   ```bash
   git reflog expire --expire=now --all && git gc --prune=now --aggressive
   ```

3. **强制推送到远程仓库**
   完成后，强制推送修改到远程仓库：
   ```bash
   git push origin --force --all
   ```

### 注意事项

- **备份仓库**：在执行这些操作前，最好备份 Git 仓库，避免误操作导致数据丢失。
- **影响范围**：这些操作会重写 Git 历史，因此其他开发者需要同步强制推送后的更改。