## 简介
这是一个 nodejs 脚本，专门用来下载 Remix IDE 中的通过 URL 引入的静态文件

## 使用方式
```bash
// 克隆仓库
git clone https://github.com/PlanckerLabs/remix-assets

// 进入项目目录
cd remix-assets

// 安装依赖
yarn
// 或
npm install

// 执行脚本
node index.js
```

## 注意
该脚本默认会下载所有版本的 solidity 编译器，总共估计有 30 G。

频繁下载会触发网站的反爬机制，所以经常会卡住或者直接下载失败。我自己下载的时候，也是经常中断，然后再重新开始。如此反复好几次，才全部下载完成。

脚本会自动检测文件是否已下载，对已经下载的文件会直接跳过。

如果不想下载 solidity 编译器的话，可以注释下面两行代码

```js
  { url: 'https://binaries.soliditylang.org/bin/list.json', path: './dist/soliditylang/bin/list.json' },
  { url: 'https://binaries.soliditylang.org/wasm/list.json', path: './dist/soliditylang/wasm/list.json' }
```

我们的国内镜像站已经下载了所有版本的编译器，而且都做了 CDN 加速。下面是其中一个编译器的链接

https://assets.remix-project.cn/soliditylang/wasm/soljson-v0.8.18+commit.87f61d96.js

其他静态文件的链接也可以以此类推。
