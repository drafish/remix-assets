import fetch from 'node-fetch';
import fs from 'fs';
import { dirname } from 'path'

const assetsList = [
  { url: 'https://cdnjs.cloudflare.com/ajax/libs/intro.js/4.1.0/introjs.min.css', path: './dist/cloudflare/4.1.0/introjs.min.css' },
  { url: 'https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.7.0/introjs.min.css', path: './dist/cloudflare/2.7.0/introjs.min.css' },
  { url: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css', path: './dist/fontawesome/all.css' },
  { url: 'https://kit.fontawesome.com/41dd021e94.js', path: './dist/fontawesome/41dd021e94.js' },
  { url: 'https://raw.githubusercontent.com/ethereum/remix-plugins-directory/master/build/metadata.json', path: './dist/remix-plugins-directory/metadata.json' },
  { url: 'https://binaries.soliditylang.org/bin/list.json', path: './dist/soliditylang/bin/list.json' },
  { url: 'https://binaries.soliditylang.org/wasm/list.json', path: './dist/soliditylang/wasm/list.json' }
]

for (let index = 0; index < assetsList.length; index++) {
  const assets = assetsList[index];
  if (fs.existsSync(assets.path)) {
    console.log(`${assets.path}已存在`)
    // continue
  }
  fs.mkdirSync(dirname(assets.path), { recursive: true })
  const resp = await fetch(assets.url);
  const arrayBuffer = await resp.arrayBuffer();
  fs.writeFileSync(assets.path, Buffer.from(arrayBuffer), "binary");
  console.log(`${assets.path}下载成功`)
  if (assets.path.includes('soliditylang')) {
    const { builds } = JSON.parse(fs.readFileSync(assets.path))
    for (let index = 0; index < builds.length; index++) {
      const item = builds[index];
      const path = `${dirname(assets.path)}/${item.path}`
      if (fs.existsSync(path)) {
        console.log(`${path}已存在`)
        continue
      }
      const resp = await fetch(assets.url.replace('list.json', item.path));
      const arrayBuffer = await resp.arrayBuffer();
      fs.writeFileSync(path, Buffer.from(arrayBuffer), "binary");
      console.log(`${path}下载成功`)
    }
  }
}



