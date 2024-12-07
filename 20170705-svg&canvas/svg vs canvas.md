SVG（Scalable Vector Graphics）和 Canvas 是两种用于前端图形绘制的技术，虽然功能上有一定重叠，但在底层实现、应用场景和性能特点上有显著区别。

---

### **SVG 与 Canvas 的主要区别**

| 特性/对比维度  | SVG                                    | Canvas                                  |
|----------------|---------------------------------------|-----------------------------------------|
| **基础类型**   | 矢量图：基于 DOM 的 XML 矢量图形。   | 位图：基于像素的图像绘制。             |
| **可交互性**   | 图形元素是 DOM 节点，天然支持事件绑定（如 `click`、`hover`）。| 画布上的图形没有独立的 DOM 表现，需要手动处理事件区域。|
| **性能**       | 对于简单图形或少量动态更新，性能较好；但复杂场景会因频繁操作 DOM 导致性能下降。| 高性能，适合大量实时绘制（如游戏、动画等）。 |
| **渲染模式**   | 依赖 DOM，具有解析成本和 DOM 操作开销。| 通过 JavaScript 对画布直接绘制，没有 DOM 操作。|
| **图形缩放**   | 矢量图，放大不会失真。                | 位图，放大可能失真或模糊。             |
| **文件大小**   | SVG 文件可编辑，适合小型图形。         | Canvas 绘制复杂内容时占用更多内存。     |
| **事件处理**   | 自带 DOM 事件绑定，直接对元素操作即可。 | 需要额外逻辑（如命中测试）处理事件。   |

---

### **适用场景与示例**

#### **SVG 的适用场景**
1. **需要图形交互的场景**：
   SVG 是 DOM 元素，适合需要与用户交互的场景，比如图表、可点击的地图。
   - **示例**：绘制可缩放的交互式地图。
     ```html
     <svg width="200" height="200">
       <circle cx="50" cy="50" r="30" fill="red" onclick="alert('Circle clicked!')" />
     </svg>
     ```

2. **分辨率敏感的场景**：
   由于 SVG 是矢量图，适合在不同设备（尤其是高分辨率设备）中展示。
   - **示例**：展示公司 logo、简单的图形化信息。

3. **复杂图表**：
   像 D3.js、Chart.js 使用 SVG 来绘制交互式图表。
   - **示例**：带交互的折线图。

---

#### **Canvas 的适用场景**
1. **高频动态渲染**：
   Canvas 适合需要频繁绘制和更新的场景，如游戏、实时数据可视化。
   - **示例**：游戏中的动画。
     ```html
     <canvas id="gameCanvas" width="400" height="400"></canvas>
     <script>
       const canvas = document.getElementById('gameCanvas');
       const ctx = canvas.getContext('2d');
       let x = 0;
       function draw() {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         ctx.fillStyle = 'blue';
         ctx.fillRect(x, 100, 50, 50);
         x += 2;
         if (x > canvas.width) x = 0;
         requestAnimationFrame(draw);
       }
       draw();
     </script>
     ```

2. **图像处理**：
   Canvas 可直接操作像素级别的图像，用于实时过滤、调整。
   - **示例**：照片编辑器。

3. **大规模数据渲染**：
   如显示大量动态点、线条的场景。
   - **示例**：气象数据可视化。

---

### **SVG 与 Canvas 的混合使用**
有时，项目需要同时使用 SVG 和 Canvas 的优点。比如：
- **Canvas 用于绘制背景**，实现高性能渲染。
- **SVG 用于前景交互**，便于用户操作。

---

### **性能注意事项**
1. **SVG**：
   - 避免复杂的 DOM 树嵌套。
   - 对于动态更新场景，减少 DOM 操作。
2. **Canvas**：
   - 合理使用 `requestAnimationFrame` 优化动画性能。
   - 降低高分辨率画布导致的内存开销。
