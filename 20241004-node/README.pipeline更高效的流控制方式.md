### **使用更高效的流控制方式**
   - **问题**: `rl.pause()` 和 `rl.resume()` 可能不是最理想的流控制方式，尤其在处理大量数据时，容易出现不一致的问题。
   - **解决方案**: 可以考虑改用 `fs.createReadStream` 结合流事件来处理行数据。例如使用 `stream.pipeline` 进行更细致的控制：

     ```javascript
     const fs = require("fs");
     const readline = require("readline");
     const { pipeline } = require("stream");

     const rl = readline.createInterface({
         input: fs.createReadStream(paramsPath),
         crlfDelay: Infinity
     });

     pipeline(
         rl,
         async function* (source) {
             let currentBatch = [];
             for await (const line of source) {
                 const param = extractArray(line.trim());
                 currentBatch.push(param);

                 if (currentBatch.length === batchSize) {
                     await processBatch(currentBatch);
                     currentBatch = []; // 清空批次
                 }
             }

             // 处理最后一批
             if (currentBatch.length > 0) {
                 await processBatch(currentBatch);
             }
         },
         (err) => {
             if (err) {
                 console.error("Pipeline encountered an error:", err);
             } else {
                 console.log("Pipeline finished successfully.");
             }
         }
     );
     ```

