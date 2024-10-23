“拒绝合并无关的历史”是 Git 的一个常见错误，通常出现在使用 `git pull` 时。它表示当前分支和远程分支的历史没有共同的祖先，因此 Git 无法自动合并它们。

你可以通过以下几种方法解决这个问题：

### 1. **使用 `--allow-unrelated-histories` 参数**
   如果你想强制合并没有共同历史的分支，可以使用以下命令：
   ```bash
   git pull origin <branch-name> --allow-unrelated-histories
   ```
   这会告诉 Git 允许合并不相关的历史，适用于在合并两个独立的 Git 仓库或不同分支时使用。

### 2. **使用 `rebase`**
   如果你想保持提交历史的整洁，避免冲突，可以尝试使用 `rebase`：
   ```bash
   git pull --rebase origin <branch-name>
   ```
   `rebase` 会将本地更改重新应用到远程分支的最新提交上，从而解决冲突。

### 3. **手动合并**
   如果你不想使用自动合并或重整提交历史，可以手动合并：
   1. 首先，分别检查远程和本地分支的最新状态。
      ```bash
      git fetch origin
      git log --oneline
      ```
   2. 如果有冲突，手动解决它们，并使用 `git merge` 来完成合并：
      ```bash
      git merge origin/<branch-name>
      ```

### 4. **重置历史**
   如果你希望将本地分支完全同步到远程分支（即本地的所有提交会被丢弃），可以使用以下命令：
   ```bash
   git reset --hard origin/<branch-name>
   ```

通过这些方法，你应该能够顺利合并无关的历史并解决这个问题。