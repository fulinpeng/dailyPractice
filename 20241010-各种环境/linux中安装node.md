使用 NVM 安装 Node.js

NVM 是一个跨发行版的 Node.js 版本管理工具，可以轻松地在任何 Linux 系统上安装 Node.js：
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

要添加以下配置内容到你的 shell 配置文件（例如 `.bashrc`、`.bash_profile` 或 `.zshrc` 文件）中，以便在打开新终端时自动加载 nvm：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```
将上面的代码添加到文件末尾并保存：

   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```

保存并关闭文件。然后，使用以下命令使配置生效：

   ```bash
   source ~/.bashrc    # 如果使用 bash
   # 或
   source ~/.zshrc     # 如果使用 zsh
   ```

安装指定版本（默认安装最新版本，linux一些系统软件版本可能不支持）
```bash
nvm install v16.20.2
```

Node.js 安装后，通常 npm 会自动随 Node.js 一起安装。如果需要手动配置 npm 的软连接，可以按照以下步骤进行：
为了确保 `/usr/bin/node` 正确指向 nvm 安装的 Node.js 可执行文件，我们可以使用符号链接手动设置路径。以下步骤会帮助你创建一个指向 nvm 安装路径的符号链接：

1. **找到 nvm 安装的 Node.js 路径：**

   使用以下命令确认 nvm 管理的 Node.js 的路径：

   ```bash
   which node
   ```

   输出可能会是类似 `/home/your_username/.nvm/versions/node/v16.x.x/bin/node` 的路径。

2. **创建符号链接：**

   使用符号链接（`ln -s`）将 `/usr/bin/node` 指向这个路径：

   ```bash
   sudo ln -sf $(which node) /usr/bin/node
   ```

   **注意**：如果没有 `sudo` 权限，可以咨询系统管理员帮助创建此符号链接，或者添加 Node.js 路径到 `PATH` 变量中。

3. **验证符号链接是否成功：**

   运行以下命令检查 `/usr/bin/node` 是否指向 nvm 的 Node.js 可执行文件：

   ```bash
   ls -l /usr/bin/node
   ```

   如果链接正确，输出中应显示 `/usr/bin/node` 指向 `.nvm` 目录下的 `node` 路径。
