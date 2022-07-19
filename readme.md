## easy-cli
一个简易的脚手架工具

### 安装
npm i -g easy-cli2

### 使用
easy <命令名>

#### 命令
+ easy eslint
  
   eslint格式化并检查代码
+ easy create 项目名  
  模板列表：

  前端：
    基础模板，不使用框架，包含jquery;
    vue3模板;
    react模板（基于umi3.x）

  后端：
    koa模板
    midway模板

+ easy deploy
  
  自动部署

+ easy rollup [options]
  
  使用rollu构建当前项目，命令可选参数 -d / -default ，使用默认配置构建