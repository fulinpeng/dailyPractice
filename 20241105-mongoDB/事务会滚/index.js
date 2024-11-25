const mongoose = require("mongoose");
const { Account, Order } = require("./models");

// 开仓/平仓操作
async function processOrder(userId, orderType, amount) {
  const session = await mongoose.startSession(); // 开启事务会话
  session.startTransaction(); // 开始事务

  try {
    // 检查用户账户是否存在
    const account = await Account.findOne({ userId }).session(session);
    if (!account) {
      throw new Error("账户不存在");
    }

    // 检查账户余额是否充足（仅在开仓时需要检查余额）
    if (orderType === "open" && account.balance < amount) {
      throw new Error("账户余额不足");
    }

    // 创建订单记录
    const newOrder = await Order.create(
      [
        {
          userId,
          type: orderType,
          amount,
          status: "pending",
        },
      ],
      { session }
    );

    // 更新账户余额
    if (orderType === "open") {
      account.balance -= amount; // 扣减余额
    } else if (orderType === "close") {
      account.balance += amount; // 增加余额（假设平仓返还金额）
    }
    await account.save({ session });

    // 更新订单状态为成功
    newOrder[0].status = "success";
    await newOrder[0].save({ session });

    // 提交事务
    await session.commitTransaction();
    session.endSession();

    console.log("订单处理成功");
    return newOrder[0];
  } catch (error) {
    // 回滚事务
    await session.abortTransaction();
    session.endSession();

    console.error("订单处理失败，事务已回滚:", error.message);
    throw error; // 抛出错误以便外部处理
  }
}

// 示例调用
async function main() {
  await mongoose.connect("mongodb://localhost:27017/trading", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const userId = "user123";
    const orderType = "open"; // 开仓
    const amount = 500; // 开仓金额

    const result = await processOrder(userId, orderType, amount);
    console.log("订单结果:", result);
  } catch (error) {
    console.error("程序出错:", error.message);
  } finally {
    mongoose.disconnect();
  }
}

main();
