---
title: codex安装与部署
author: 星仔极客
top: false
toc: ture
mathjax: false
categories: 工具分享
tags: 工具
abbrlink: fdfe
date: 2026-05-30 16:47:37
img:
coverImg:
cover:
password:
---

&ensp;&ensp;&ensp;&ensp;本文详细介绍了如何安装codex，以及如何配置使用deepseek、mimo的API进行codex的使用。

# 下载安装

&ensp;&ensp;&ensp;&ensp;下载需要安装的软件，下载链接：https://yun.139.com/shareweb/#/w/i/2v3EknaoDtT1f  提取码：9rly

- codex，[官方链接](https://apps.microsoft.com/detail/9plm9xgg6vks?hl=zh-CN&gl=CN)
- ccx，[官方链接](https://github.com/BenedictKing/ccx)，Windows下载：ccx-windows-amd64.exe
- cc switch，[官方链接](https://github.com/farion1231/cc-switch)，Windows下载：CC-Switch-v3.16.0-Windows.msi

&ensp;&ensp;&ensp;&ensp;下面是安装步骤，codex以及cc switch正常安装软件双击后安装即可（`codex安装完成之后直接在任务栏退出，等配置完成后再重新启动`），ccx需要配置一下，按照下面步骤配置即可。

1. 先创建个文件夹，将`ccx-windows-amd64.exe`文件放进去，然后再创建一个名为`.env`的文件

    <img src="https://files.seeusercontent.com/2026/05/30/c2mT/ccx.png" alt="ccx安装.png" style="zoom:50%;" />

2. 使用记事本或vs code打开`.env`文件，将下面代码复制进去保存即可，这个`PROXY_ACCESS_KEY`是到时候填写在`cc switch`里面的，不是deepseek的key

    ```bash
    PROXY_ACCESS_KEY=your-proxy-access-key
    PORT=3000
    ENABLE_WEB_UI=true
    APP_UI_LANGUAGE=zh-CN
    ```

    <img src="https://files.seeusercontent.com/2026/05/30/9aHb/ccx.png" alt="ccx配置代码.png" style="zoom:50%;" />

# deepseek配置部署

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=116678222480617&bvid=BV1gTVB6FEoP&cid=38788859861&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

## 配ccx

首先配置ccx，双击打开`ccx-windows-amd64.exe`文件，启动后如图所示。

<img src="https://files.seeusercontent.com/2026/05/30/eKy0/ccx.png" alt="ccx启动.png" style="zoom:50%;" />

1. 打开浏览器，输入：`http://localhost:3000`回车打开

    <img src="https://files.seeusercontent.com/2026/05/30/Gj5e/ccx.png" alt="ccx界面.png" style="zoom: 50%;" />

2. 在顶部导航栏中选择`Codex`，点击添加渠道进行配置

    <img src="https://files.seeusercontent.com/2026/05/30/pgP3/ccx.png" alt="ccx配置界面.png" style="zoom:50%;" />

3. 在添加渠道弹窗中，切换至`详细配置`。

    <img src="https://files.seeusercontent.com/2026/05/30/aP3f/ccx.png" alt="ccx详细配置.png" style="zoom:50%;" />

4. 先去deepseek API平台进行申请`API keys`，[官方链接](https://platform.deepseek.com)，注意：`创建好key之后复制记得保存（关闭后无法复制）`，API调用官方技术文档：[链接](https://api-docs.deepseek.com/zh-cn/)。

    <img src="https://files.seeusercontent.com/2026/05/30/k9Fl/deepseekkeys.png" alt="deepseek建keys.png" style="zoom:50%;" />

5. 填写下面参数，进行配置，

    - 渠道名称：deepseek

    - 服务类型：OpenAI Chat

    - 基础URL（在官方技术文档查看`base_url (OpenAI)`）：https://api.deepseek.com

    - 模型重定向，填写完成后，点击右侧的`添加`按钮添加

        - 模型名选`gpt-5.5`
        - 目标模型选`deepseek-v4-pro`（这个需要将deepseek的可以复制到`API密钥管理`中添加才可以获取到）

    - API密钥管理：将deeseek创建的`API kyes`复制进入，点击右侧`添加`按钮添加

    - 勾选`规范化非常见 Chat role`

    - 其它不需要填写，直达下方的`创建渠道`按钮创建

        <img src="https://files.seeusercontent.com/2026/05/30/Dxf1/ccx.png" alt="ccx添加渠道详细配置.png" style="zoom:50%;" />

6. 至此ccx配置完成

## 配cc switch

1. 双击打开cc switch图标打开，进入后点击`OpenAI`切换

    <img src="https://files.seeusercontent.com/2026/05/30/Yy9p/cc-switch.png" alt="cc switch界面.png" style="zoom:50%;" />

2. 点击右上角加号添加配置

    <img src="https://files.seeusercontent.com/2026/05/30/Gw4y/cc-switch.png" alt="cc switch添加.png" style="zoom:50%;" />

3. 开始配置，根据下面说明配置即可

    - 选Codex供应商

    - 预设供应商：自定义配置

    - 供应商名称：deepseek

    - API Key：为ccx配置文件`.env`中的`PROXY_ACCESS_KEY=your-proxy-access-key`，等号后面的就是你的API Key

    - API请求地址：http://localhost:3000/v1（固定）

    - 模型名称：ccx渠道中的模型名称若为gpt-5.5，则写`gpt-5.5`，若为gpt-5.4，则写`gpt+5.4`

    - 其它不需要配置，直达最下方点击`添加`按钮添加

        <img src="https://files.seeusercontent.com/2026/05/30/xXh3/cc-switch.png" alt="cc switch添加配置.png" style="zoom:50%;" />

4. 至此cc switch配置完成，重新启动codex，然后输入后若有回复则配置部署成功

    <img src="https://files.seeusercontent.com/2026/05/30/J4wk/codex.png" alt="codex进入界面.png" style="zoom:50%;" />

5. 温馨提示：若启动后自动为中文界面，建议后续暂时不要更新，因为有可能更新后设置中文之后还是英文界面，比如博主就是

# mimo配置部署

其实mimo配置和deeseek类似，同样的操作。

## 配ccx









# 答疑

## 无法设置成中文

&ensp;&ensp;&ensp;&ensp;这个问题已经研究明白了，其实就是要使用一下某些工具才会生效，如果没有可能真没办法，只要开了使用一会，然后把codex退出，重新启动后，就会自动变成中文了，国外的软件都懂的！

## 使用过程经常断开

&ensp;&ensp;&ensp;&ensp;我发现codex只要使用替我审批功能，就会百分百触发cxx驱动API熔断，这个问题我也研究明白了，ccx渠道里面有很多个模型，然后请求的时候会跳转到别的模型去请求，然而，我们别的模型又没有配置，所以请求失败，自然就断开了，比如我只配置了gpt-5.5，然后codex又会自动跳去请求gpt-5.4，而我们渠道又没加这个模型，导致断开。

<img src="https://files.seeusercontent.com/2026/06/03/R7np/ccx.png" alt="ccx故障图.png" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;解决办法就是直接把ccx渠道里面的全部模型都配置了，这样就解决了。

<img src="https://files.seeusercontent.com/2026/06/03/km0P/ccx.png" alt="ccx故障解决.png" style="zoom:50%;" />

























