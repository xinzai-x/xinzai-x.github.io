---
title: codex安装与部署
top: false
categories: 工具分享
abbrlink: fdfe
date: 2026-05-30 16:47:37
password:
---

&ensp;&ensp;&ensp;&ensp;本文详细介绍了如何安装codex，以及如何配置使用deepseek、mimo的API进行codex的使用，配置的方法有三种，可自行选择，前两种无法使用插件，最后一种解锁codex全部功能，如果多种方式存在，启动软件时只启用相对于需要的软件，不然可能会冲突。

1. 单cc switch方式（中文界面下无法显示模型名，也就无法切换模型，只启用cc switch）（以接入mimo为例）
2. cxx + cc switch方式（启用ccx和cc switch）（以接入mimo和deepseek为例）
3. codex++ 方式（启用codex++）（以接入deepseek为例）

> [!NOTE]
>
> 本文已经完结，后续不再更新，由于本人感觉codex并没有想象中那么好用，已经不使用了，所以后续有新的玩法也不再更新。



# 下载安装

&ensp;&ensp;&ensp;&ensp;下载需要安装的软件，采用哪种方式下载对应软件即可，codex以及cc switch正常安装软件双击后安装即可（`codex安装完成之后直接在任务栏退出，等配置完成后再重新启动`）ccx需要配置一下，下载链接：https://yun.139.com/shareweb/#/w/i/2v3EknaoDtT1f  提取码：9rly

- codex，[官方链接](https://apps.microsoft.com/detail/9plm9xgg6vks?hl=zh-CN&gl=CN)
- ccx，[官方链接](https://github.com/BenedictKing/ccx)，Windows下载：ccx-windows-amd64.exe
- cc switch，[官方链接](https://github.com/farion1231/cc-switch)，Windows下载：CC-Switch-v3.16.0-Windows.msi
- codex++，[官方链接](https://github.com/BigPizzaV3/CodexPlusPlus)，Windows下载：CodexPlusPlus-1.2.4-windows-x64-setup.exe

# deepseek配置部署

&ensp;&ensp;&ensp;&ensp;教程：https://v.douyin.com/YQ2uNp0rLKo/

## cxx + cc switch方式

### 配ccx

&ensp;&ensp;&ensp;&ensp;先创建个文件夹，将`ccx-windows-amd64.exe`文件放进去，然后再创建一个名为`.env`的文件

<img src="https://files.seeusercontent.com/2026/05/30/c2mT/ccx.png" alt="ccx安装.png" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;使用记事本或vs code打开`.env`文件，将下面代码复制进去保存即可，这个`PROXY_ACCESS_KEY`是到时候填写在`cc switch`里面的，不是deepseek的key

```bash
PROXY_ACCESS_KEY=your-proxy-access-key
PORT=3000
ENABLE_WEB_UI=true
APP_UI_LANGUAGE=zh-CN
```

<img src="https://files.seeusercontent.com/2026/05/30/9aHb/ccx.png" alt="ccx配置代码.png" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;双击打开`ccx-windows-amd64.exe`文件，启动后如图所示。

<img src="https://files.seeusercontent.com/2026/05/30/eKy0/ccx.png" alt="ccx启动.png" style="zoom:50%;" />

1. 打开浏览器，输入：`http://localhost:3000`回车打开

    <img src="https://files.seeusercontent.com/2026/05/30/Gj5e/ccx.png" alt="ccx界面.png" style="zoom: 50%;" />

2. 在顶部导航栏中选择`Codex`，点击添加渠道进行配置

    <img src="https://files.seeusercontent.com/2026/05/30/pgP3/ccx.png" alt="ccx配置界面.png" style="zoom:50%;" />

3. 在添加渠道弹窗中，切换至`详细配置`。

    <img src="https://files.seeusercontent.com/2026/05/30/aP3f/ccx.png" alt="ccx详细配置.png" style="zoom:50%;" />

4. deepseek API平台进行申请`API keys`，[官方链接](https://platform.deepseek.com)，注意：`创建好key之后复制记得保存（关闭后无法复制）`，API调用官方技术文档：[链接](https://api-docs.deepseek.com/zh-cn/)。API key例如：sk-83db74c3dbb244f8a1260ec2fa43097

    <img src="https://files.seeusercontent.com/2026/05/30/k9Fl/deepseekkeys.png" alt="deepseek建keys.png" style="zoom:50%;" />

5. 填写下面参数，进行配置，

    - 渠道名称：deepseek

    - 服务类型：OpenAI Chat

    - 基础URL（在官方技术文档查看`base_url (OpenAI)`）：https://api.deepseek.com

    - 模型重定向，填写完成后，点击右侧的`添加`按钮添加

        - 模型名选`gpt-5.5`（`把列表的模型都配置`）
        - 目标模型选`deepseek-v4-pro`（这个需要将deepseek的key复制到`API密钥管理`中添加才可以获取到）

    - API密钥管理：将deeseek创建的`API kyes`复制进入（例如：sk-83db74c3dbb244f8a1260ec2fa43097），点击右侧`添加`按钮添加

    - 勾选`规范化非常见 Chat role`

    - 其它不需要填写，直达下方的`创建渠道`按钮创建

        <img src="https://files.seeusercontent.com/2026/06/11/fcB0/ccx.png" alt="ccx添加渠道详细配置.png" style="zoom:50%;" />

6. 至此ccx配置完成

### 配cc switch

注意：`不要开启本地路由`，如果同时使用mimo和deepseek，cc switch只需配置一个，在ccx切换模型即可。

1. 双击打开cc switch图标打开，进入后点击`OpenAI`切换

    <img src="https://files.seeusercontent.com/2026/05/30/Yy9p/cc-switch.png" alt="cc switch界面.png" style="zoom:50%;" />

2. 点击右上角加号添加配置

    <img src="https://files.seeusercontent.com/2026/05/30/Gw4y/cc-switch.png" alt="cc switch添加.png" style="zoom:50%;" />

3. 开始配置，根据下面说明配置即可，配置完成后，重新启动codex，然后输入后若有回复则配置部署成功

    - 选Codex供应商

    - 预设供应商：自定义配置

    - 供应商名称：deepseek

    - API Key：为ccx配置文件`.env`中的`PROXY_ACCESS_KEY=your-proxy-access-key`，等号后面的就是你的API Key（例如：123456）

    - API请求地址：http://localhost:3000/v1（固定）

    - 其它不需要配置，直达最下方点击`添加`按钮添加

        <img src="https://files.seeusercontent.com/2026/06/11/Cg1m/cc-switch.png" alt="cc switch添加配置.png" style="zoom:50%;" />

## codex++配置方式

&ensp;&ensp;&ensp;&ensp;这种方式不同与其它方法，可以解锁插件等完整codex功能，这个不要和cc switch同时混合开，如果cc switch也有配置和codex++同时会冲突的。

1. 下载后，我们先打开Codex++ 管理工具，查看健康检查是否都通过

    <img src="https://files.seeusercontent.com/2026/06/11/w0wW/codex.png" alt="codex++健康查看.png" style="zoom:50%;" />

2. 切换到`供应商配置`页面，点击`添加供应商`。

    <img src="https://files.seeusercontent.com/2026/06/11/Ug5o/codex.png" alt="codex++添加供应商.png" style="zoom:50%;" />

3. deepseek API平台进行申请`API keys`，[官方链接](https://platform.deepseek.com)，注意：`创建好key之后复制记得保存（关闭后无法复制）`，API调用官方技术文档：[链接](https://api-docs.deepseek.com/zh-cn/)。API key例如：sk-83db74c3dbb244f8a1260ec2fa43097

    <img src="https://files.seeusercontent.com/2026/05/30/k9Fl/deepseekkeys.png" alt="deepseek建keys.png" style="zoom:50%;" />

4. 根据下面说明配置，配置完成后，记得点击上方保存按钮保存。

    - 名称：deepseek

    - 接入模式：纯API

    - 配置模型：deepseek-v4-pro（codex默认使用的模型）

    - 勾选启用目标功能

    - Base URL：https://api.deepseek.com（可查看官方技术文档）

    - Key：在官方创建的API key（例如：sk-83db74c3dbb244f8a1260ec2fa43097）

    - 上游协议：Chat Completions

    - 模型列表：点击下方的从上游获取即可

        <img src="https://files.seeusercontent.com/2026/06/11/xz4I/codex.png" alt="codex++详细配置.png" style="zoom:50%;" />

5. 使用配置好的供应商，切记`不要手动启动codex`，点击右上角重启codex++，就会启动codex。使用浏览器以及控制电脑插件最好使用完全访问的权限。

    <img src="https://files.seeusercontent.com/2026/06/11/qeL7/codex.png" alt="启动codex++.png" style="zoom:50%;" />

# mimo配置部署

## 单cc switch方式

&ensp;&ensp;&ensp;&ensp;这种方法其实对于mimo是有点问题的，首先打开我们安装好的cc switch（安装默认下一步即可），切换至open ai，点击右侧`加号`添加配置。

<img src="https://files.seeusercontent.com/2026/06/11/D3is/cc-switch.png" alt="单cc switch添加.png" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;官网创建API key[链接](https://platform.xiaomimimo.com/console/)，[官方技术文档](https://platform.xiaomimimo.com/docs/zh-CN/quick-start/first-api-call)，API key例如：sk-c4tstal75n3zw3wmiq41lpgdoixtin9tke3j8qe8dg4j2lo（自己创建）

![mimo创建API key.png](https://files.seeusercontent.com/2026/06/11/chF0/mimoAPI-key.png)

&ensp;&ensp;&ensp;&ensp;如果是`Token Plan`的（套餐型）创建的API key与普通的不一样，需要在下面图片显示创建才是正确的。

<img src="https://files.seeusercontent.com/2026/06/16/Zqb3/mimo-plan-API-key.webp" alt="mimo plan API key.webp" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;根据下面信息进行配置，只需要选择对应的供应商，以及填入供应商的API key，其它不需要修改

- 预设供应商：Xiaomi MiMo（若是Token Plan的：Xaomi MiMo Token Plan (China)）
- API Key：在mimo官网创建的API key填入（例如：sk-c4tstal75n3zw3wmiq41lpgdoixtin9tke3j8qe8dg4j2lo）
- 模型映射：可以自行添加需要的模型（默认也行）

<img src="https://files.seeusercontent.com/2026/06/11/h9fL/cc-switch.png" alt="单cc switch详细配置.png" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;添加完成后，使用配置，进入设置。

<img src="https://files.seeusercontent.com/2026/06/11/ikJ7/cc-switch.png" alt="单cc switch进入设置.png" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;开启本地路由，勾选一下三个开关。

- 在主页面显示本地路由开关
- 路由总开关
- 路由启用中的Codex开关

<img src="https://files.seeusercontent.com/2026/06/11/Ftz2/cc-switch.png" alt="单cc switch配置本地路由.png" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;确保使用对应的配置并开启本地路由，然后重新启动codex即可。

<img src="https://files.seeusercontent.com/2026/06/11/jwN7/cc-switch.png" alt="单cc switch配置检查.png" style="zoom:50%;" />

## cxx + cc switch方式

### 配ccx

&ensp;&ensp;&ensp;&ensp;先创建个文件夹，将`ccx-windows-amd64.exe`文件放进去，然后再创建一个名为`.env`的文件

<img src="https://files.seeusercontent.com/2026/05/30/c2mT/ccx.png" alt="ccx安装.png" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;使用记事本或vs code打开`.env`文件，将下面代码复制进去保存即可，这个`PROXY_ACCESS_KEY`是到时候填写在`cc switch`里面的，不是deepseek的key

```bash
PROXY_ACCESS_KEY=your-proxy-access-key
PORT=3000
ENABLE_WEB_UI=true
APP_UI_LANGUAGE=zh-CN
```

<img src="https://files.seeusercontent.com/2026/05/30/9aHb/ccx.png" alt="ccx配置代码.png" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;双击打开`ccx-windows-amd64.exe`文件，启动后如图所示。

<img src="https://files.seeusercontent.com/2026/05/30/eKy0/ccx.png" alt="ccx启动.png" style="zoom:50%;" />

1. 打开浏览器，输入：`http://localhost:3000`回车打开

    <img src="https://files.seeusercontent.com/2026/05/30/Gj5e/ccx.png" alt="ccx界面.png" style="zoom: 50%;" />

2. 在顶部导航栏中选择`Codex`，点击添加渠道进行配置

    <img src="https://files.seeusercontent.com/2026/05/30/pgP3/ccx.png" alt="ccx配置界面.png" style="zoom:50%;" />

3. 在添加渠道弹窗中，切换至`详细配置`。

    <img src="https://files.seeusercontent.com/2026/05/30/aP3f/ccx.png" alt="ccx详细配置.png" style="zoom:50%;" />

4. 官网创建API key[链接](https://platform.xiaomimimo.com/console/)，[官方技术文档](https://platform.xiaomimimo.com/docs/zh-CN/quick-start/first-api-call)，API key例如：sk-c4tstal75n3zw3wmiq41lpgdoixtin9tke3j8qe8dg4j2lo（自己创建）

    ![mimo创建API key.png](https://files.seeusercontent.com/2026/06/11/chF0/mimoAPI-key.png)

    如果是`Token Plan`的（套餐型）创建的API key与普通的不一样，需要在下面图片显示创建才是正确的。

    <img src="https://files.seeusercontent.com/2026/06/16/Zqb3/mimo-plan-API-key.webp" alt="mimo plan API key.webp" style="zoom:50%;" />

    

5. 填写下面参数，进行配置，

    - 渠道名称：mimo

    - 服务类型：OpenAI Chat

    - 基础URL（在官方技术文档查看`base_url (OpenAI)`）：https://api.xiaomimimo.com/v1（若是Token Plan的：https://token-plan-cn.xiaomimimo.com/v1）

    - 模型重定向，填写完成后，点击右侧的`添加`按钮添加

        - 模型名选`gpt-5.5`（`把列表的模型都配置`）
        - 目标模型选`mimo-v2.5-pro`（这个需要将mimo的key复制到`API密钥管理`中添加才可以获取到）

    - API密钥管理：将deeseek创建的`API kyes`复制进入（例如：sk-c4tstal75n3zw3wmiq41lpgdoixtin9tke3j8qe8dg4j2lo），点击右侧`添加`按钮添加

    - 勾选`规范化非常见 Chat role`

    - 其它不需要填写，直达下方的`创建渠道`按钮创建

        <img src="https://files.seeusercontent.com/2026/06/11/rY3s/mimo-ccx.png" alt="mimo ccx配置.png" style="zoom:50%;" />

### 配cc switch

注意：`不要开启本地路由`，如果同时使用mimo和deepseek，cc switch只需配置一个，在ccx切换模型即可

1. 双击打开cc switch图标打开，进入后点击`OpenAI`切换

    <img src="https://files.seeusercontent.com/2026/05/30/Yy9p/cc-switch.png" alt="cc switch界面.png" style="zoom:50%;" />

2. 点击右上角加号添加配置

    <img src="https://files.seeusercontent.com/2026/05/30/Gw4y/cc-switch.png" alt="cc switch添加.png" style="zoom:50%;" />

3. 开始配置，根据下面说明配置即可，配置完成后，重新启动codex，然后输入后若有回复则配置部署成功

    - 选Codex供应商
    - 预设供应商：自定义配置
    - 供应商名称：mimo
    - API Key：为ccx配置文件`.env`中的`PROXY_ACCESS_KEY=your-proxy-access-key`，等号 后面的就是你的API Key
    - API请求地址：http://localhost:3000/v1（固定）
    - 其它不需要配置，直达最下方点击`添加`按钮添加

<img src="https://files.seeusercontent.com/2026/06/11/iV7h/mimo-CC-Switch.png" alt="mimo CC Switch配置.png" style="zoom:50%;" />

# 答疑

## 无法设置成中文

&ensp;&ensp;&ensp;&ensp;这个问题已经研究明白了，其实就是要使用一下某些工具（外国网络环境）才会生效，如果没有可能真没办法，只要开了使用一会，然后把codex退出，重新启动后，就会自动变成中文了，国外的软件都懂的！

## ccx使用过程经常断开

&ensp;&ensp;&ensp;&ensp;我发现codex只要使用替我审批功能，就会百分百触发cxx驱动API熔断，这个问题我也研究明白了，ccx渠道里面有很多个模型，然后请求的时候会跳转到别的模型去请求，然而，我们别的模型又没有配置，所以请求失败，自然就断开了，比如我只配置了gpt-5.5，然后codex又会自动跳去请求gpt-5.4，而我们渠道又没加这个模型，导致断开。

<img src="https://files.seeusercontent.com/2026/06/03/R7np/ccx.png" alt="ccx故障图.png" style="zoom:50%;" />

&ensp;&ensp;&ensp;&ensp;解决办法就是直接把ccx渠道里面的全部模型都配置了，这样就解决了。

<img src="https://files.seeusercontent.com/2026/06/03/km0P/ccx.png" alt="ccx故障解决.png" style="zoom:50%;" />

## 插件问题

> [!IMPORTANT]
>
> 使用第三方API是浏览器必须是原生谷歌浏览器，运行必须是完全访问的权限。以及采用下面这种方法可能会导致codex异常，谨慎使用。建议直接使用codex++。

&ensp;&ensp;&ensp;&ensp;解决codex打开内置浏览器：`codex-windows-fast-patch` 技能中提到了类似的 `node_repl` 沙箱故障。根因：`config.toml` 中 `[windows] sandbox = "elevated"` 导致创建子进程时 `CreateProcessAsUserW` 失败（error 5）修改为 `sandbox = "unelevated"` 后，`node_repl` 内核正常启动。

&ensp;&ensp;&ensp;&ensp;解决控制电脑以及插件问题，复制：https://github.com/chen0416ccc-cpu/codex-windows-fast-patch-skill 根据这个修复codex插件无法使用问题，切记不要重装codex，只修复插件问题。然后直接给ai修复即可，如果装完有浏览器插件或电脑控制的插件不能使用再修复一次即可（最好是完全访问权限直接让ai修）





