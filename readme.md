## **easy-cli**
一个简易的脚手架工具

---

## 安装
npm i -g easy-cli2

***注：***
安装的时候可能会出现此错误：

getaddrinfo ENOTFOUND raw.githubusercontent.com

在hosts文件下添加下面这个地址即可

*185.199.108.133  raw.githubusercontent.com*

---

## 使用
easy <命令名> [options]

---

## 命令列表
+ **easy eslint**
  
   eslint格式化并检查代码
   
+ **easy create 项目名**
  
  模板列表：

  + 前端：
    
    - 基础模板，不使用框架，包含jquery，normalize.css，animate.css;

    - vue3模板;

    - react模板（基于umi3.x）

  + 后端：

    - koa模板

    - midway模板

+ **easy deploy**
  
  自动部署

+ **easy rollup [options]**
  
  使用rollu构建当前项目，命令可选参数 -d / -default ，使用默认配置构建

+ **easy npm [options]**

  查看、设置、重置npm源。

  easy npm -r/--rest     重置npm源

  easy npm -l/--list     查看已安装的全局npm包

  easy npm -c/--check    查看npm源

  easy npm -t/--taobao   把npm源设置为淘宝镜像

  easy npm -u/--url      <链接>  设置npm源
  
+ **easy x2j [file] [options]**

  easy x2j example.xlsx x2j [-o outputname] //-o | --output 可选的

  把 xlsx 文件转换为 json 文件

+ **easy j2x [file] [options]**

  easy x2j example.json j2x [-o outputname] //-o | --output 可选的

  把 json 文件转换为 xlsx 文件,json文件格式为：

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

+ **easy compress [image]**

  压缩图片，支持的格式： jpg/jpeg, svg, png, gif

  easy compress your_image 压缩指定图片

  easy compress -l|--list  images 压缩指定文件夹下的所有图片，但不包含其子文件夹下的