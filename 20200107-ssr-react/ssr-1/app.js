// import Koa from 'koa'
// const app = new Koa()
 
// // response
// app.use((ctx) => {
//  ctx.body = 'Hello Koa'
// })
 
// app.listen(3000)
// console.log("系统启动，端口：3000")




import Koa from 'koa'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './app/main'
 
const app = new Koa()
 
// response
app.use(ctx => {
 let str = renderToString(<App />)
 
 ctx.body = str
})
 
app.listen(8080)
 
console.log('系统启动，端口：8080')
