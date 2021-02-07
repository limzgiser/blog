- 监听模块变更

```javascript
if(module.hot){
    // 注册回调，当前index.js模块可以接收title.js的变更，title.js变更后可以重新调用render方法
    module.hot.accept(['./title.js'],render)
}
```



**webpack配置**

- devServer
  - hot:true
- plugins
  - HotModuleReplacementPlugin

