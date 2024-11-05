“Require review from Code Owners” 是 GitHub 上分支保护规则中的一个选项。当该选项开启后，项目中的“代码所有者”（Code Owners）必须对 pull request 进行批准，才能合并到受保护的分支。

**Code Owners** 文件（通常命名为 `CODEOWNERS`）指定了谁对特定代码文件或目录负责。项目中的特定文件或目录可以有一组预定的“所有者”，这些“所有者”通常是具备对这些文件有专业知识或对该部分代码有责任的人员。启用该选项后，任何对这些文件或目录的更改都需要经过 Code Owners 的审查，确保代码质量和责任分配。

### 设置步骤
1. **添加 `CODEOWNERS` 文件**：通常放在项目的 `.github/` 或根目录下。
2. **指定代码所有者**：在 `CODEOWNERS` 文件中，按文件路径指定代码的所有者。例如：
   ```plaintext
   # 设置根目录所有文件的所有者
   * @user1 @user2
   # 设置 src 目录下文件的所有者
   /src/ @user3
   ```
3. **开启分支保护规则**：在项目的“Settings” > “Branches”中，开启“Require review from Code Owners”。

这可以增强代码管理，使团队内特定成员对某些代码段负责，确保在合并之前得到必要的审核批准。