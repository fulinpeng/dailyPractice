在使用 `git push` 时，遇到 **RPC 失败** 或类似的 `curl 18 HTTP/2 stream 3 was reset` 错误通常是由于网络连接不稳定、Git 服务器响应慢或者因为推送的文件过大而引发的问题。可以尝试以下几种方法来解决这个问题：

### 1. **调整 Git 的缓冲区大小**
增大 Git 的缓冲区大小可以帮助避免网络传输中断导致的问题：

```bash
git config --global http.postBuffer 524288000
```

该命令将 Git 的 `http.postBuffer` 参数设置为 500 MB（524288000 字节），可以有效处理较大的推送数据。

### 2. **调整 Git 的 Keep-Alive 选项**
设置 Git 的 Keep-Alive 时间以维持更长的连接时间：

```bash
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999
```

这个配置可以避免因为网络速度慢而导致的连接断开。

### 3. **使用 SSH 而非 HTTPS 推送**
如果你当前使用 HTTPS 方式推送代码，切换到 SSH 推送可能会更稳定：

- 确保你已经配置好 SSH 密钥并将其添加到 GitHub 或远程仓库。
- 修改远程仓库 URL 使用 SSH 方式：

```bash
git remote set-url origin git@github.com:username/repository.git
```

### 4. **分次推送大文件**
如果推送的文件太大，或者提交的变更很多，建议你尝试分批次推送，减少每次推送的数据量：

- 使用 `git rebase -i` 来将多个提交合并为较小的提交。
- 或者分批次提交：

```bash
git push origin branch-name --force-with-lease
```

### 5. **检查网络连接**
确保网络连接稳定。如果可能，切换到较快的网络（比如有线连接或不同的 Wi-Fi 网络）可能有助于解决这个问题。

### 6. **重试推送**
在一些情况下，简单的网络波动可能会导致这种错误，因此可以尝试重新运行 `git push`：

```bash
git push origin branch-name
```

### 7. **重新克隆项目**
如果问题依然没有解决，可以尝试重新克隆项目并推送：

```bash
git clone https://github.com/username/repository.git
cd repository
git push origin branch-name
```

通过以上方法可以有效解决 `git push` 时遇到的 `RPC 失败` 错误。