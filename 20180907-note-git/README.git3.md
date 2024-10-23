### 安装 Git LFS 管理大文件

1. **根据操作系统安装**：
   - **Windows**：
     - 你可以从 [Git LFS 官网](https://git-lfs.github.com/) 下载 Windows 安装程序，双击运行即可安装。
   - **macOS**：
     - 可以使用 Homebrew 安装：
       ```bash
       brew install git-lfs
       ```
   - **Linux**：
     - 可以通过包管理器安装（例如 Ubuntu）：
       ```bash
       sudo apt-get install git-lfs
       ```

2. **初始化 Git LFS**：
   安装完成后，在终端中运行以下命令以初始化 Git LFS：
   ```bash
   git lfs install
   ```

### 验证安装

安装完成后，你可以通过以下命令验证 Git LFS 是否安装成功：

```bash
git lfs version
```

如果显示 Git LFS 的版本信息，说明安装成功。

### 使用 Git LFS

1. **跟踪大文件**：
   使用 Git LFS 跟踪特定类型的大文件：
   ```bash
   git lfs track "*.psd"  # 示例，替换为文件类型
   ```

2. **添加和提交更改**：
   添加 `.gitattributes` 文件并提交：
   ```bash
   git add .gitattributes
   git add path/to/large-file
   git commit -m "Add large file using Git LFS"
   ```

3. **推送更改**：
   最后，推送到远程仓库：
   ```bash
   git push
   ```

按照上述步骤操作后，你应该能够成功使用 Git LFS 来管理大文件。