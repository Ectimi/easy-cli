## **easy-cli**

一个简易的脚手架工具

---

## 安装

npm i -g easy-cli2

**_注：_**
安装的时候可能会出现此错误：

getaddrinfo ENOTFOUND raw.githubusercontent.com

在 hosts 文件下添加下面这个地址即可

_185.199.108.133 raw.githubusercontent.com_

---

## 使用

easy <命令名> [options]

---

## 命令列表

- **easy eslint**

  eslint 格式化并检查代码

- **easy create 项目名**

  模板列表：

  - 前端：

    - 基础模板，不使用框架，包含 jquery，normalize.css，animate.css;

    - vue3 模板;

    - react 模板（基于 umi3.x）

  - 后端：

    - koa 模板

    - midway 模板

- **easy deploy**

  自动部署

- **easy rollup [options]**

  使用 rollu 构建当前项目，命令可选参数 -d / -default ，使用默认配置构建

- **easy npm [options]**

  查看、设置、重置 npm 源。

  easy npm -r/--rest 重置 npm 源

  easy npm -l/--list 查看已安装的全局 npm 包

  easy npm -c/--check 查看 npm 源

  easy npm -t/--taobao 把 npm 源设置为淘宝镜像

  easy npm -u/--url <链接> 设置 npm 源

- **easy x2j [file] [options]**

  easy x2j example.xlsx x2j [-o outputname] //-o | --output 可选的

  把 xlsx 文件转换为 json 文件

- **easy j2x [file] [options]**

  easy x2j example.json j2x [-o outputname] //-o | --output 可选的

  把 json 文件转换为 xlsx 文件,json 文件格式为：

```js
{
  sheetname:[
    {
      attr1:'value',
      attr2:'value'
    }
  ],
  sheetname2:[
    {
      attr1:'value',
      attr2:'value'
    }
  ]
}
```

- **easy compress [image]**

  压缩图片，支持的格式： jpg/jpeg, svg, png, gif

  easy compress your_image 压缩指定图片

  easy compress -l|--list images 压缩指定文件夹下的所有图片，但不包含其子文件夹下的

- **easy minify**

  压缩 js,css 和 html,适合没有使用框架的项目，即使用 script 标签引入开发的项目，例如：使用 easy create 创建的基础模板

  easy minify -a [-o output_dir_name] 压缩当前目录所有的 js,css ,html，默认压缩到 dist 目录下，可以使用-o 设置输出的目录名称

  easy minify your_file.js|.css|.html [-o output_name] 压缩指定文件,默认压缩的文件名为 filename.min.js|.css|.html，可以使用 -o 设置输出的文件名

  其中，以下目录会忽略： node_modules , img , imgs , image , images , less , scss , sass
