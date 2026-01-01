---
title: 博客CDN解析
author: 星仔极客
top: false
cover: https://s2.loli.net/2025/12/28/jpYxcyKJSR7Dvku.webp
toc: ture
mathjax: false
date: 2025-08-31 15:09:45
img:
coverImg:
password:
categories: 技术积累
tags: 博客CDN解析
---

# HurricaneDNS解析博客

首先需要一个域名，购买完域名之后，我们打开HurricaneDNS：[Hurricane Electric Hosted DNS](https://dns.he.net/)

先注册账号，注册过程按照提示填写注册即可

<img src="https://s2.loli.net/2025/12/28/L49gmjzav63pq8X.webp" style="zoom:50%;" />

注册好之后，我们直接登陆，直接添加域名

![](https://s2.loli.net/2025/12/28/8QD4TysxSLzeP9U.webp)

输入购买的域名

<img src="https://s2.loli.net/2025/12/28/gM9o4tUbmhn3NTS.webp" style="zoom:50%;" />

进入添加记录

![](https://s2.loli.net/2025/12/28/rSgL8olkOIpyE19.webp)

添加对应的类型添加，按照如下方式添加`类型为A`，名称为`@`，IPv4地址为`185.199.108.153`，**按照上述方式再添加以下三条记录，类型和名称和上述相同，IPv4地址分别为**：

```plain
185.199.109.153
185.199.110.153
185.199.111.153
```

![](https://s2.loli.net/2025/12/28/8ju51opQgPhMbTa.webp)

添加好后我们去购买域名的地方，[域名交易_一口价域名_域名抢注-阿里云万网](https://mi.aliyun.com/?spm=5176.29045373.J_2177541330.5.3d1d183838ot1j#eyJwcm9kdWN0VHlwZSI6MiwicXVpY2tTZWFyY2giOiJbXCJcIl0iLCJrZXl3b3JkIjoiIiwiY29uc3RpdHV0ZUFyciI6WyIiXSwiZml4ZWRQcmljZVNlYXJjaFR5cGUiOiIiLCJxdWlja1NvcnQiOlsicHJpY2UiLCJhc2NlbmQiXSwibWF4U2FsZUF2YWlsRGF5IjoiIiwic2FsZUF2YWlsRGF5UmFuZ2UiOnsibWluU2FsZUF2YWlsRGF5IjoiIiwibWF4U2FsZUF2YWlsRGF5IjoiIn0sIm1pbkRvbWFpbkF2YWlsRGF5IjozMDAsImRvbWFpbkF2YWlsRGF5UmFuZ2UiOnsibWluRG9tYWluQXZhaWxEYXkiOjMwMCwibWF4RG9tYWluQXZhaWxEYXkiOiIifSwic2Vzc2lvbkNvZGUiOiIxZXhsWEVsYTZsRGhfb21sT2M5ZzUiLCJjb25zdGl0dXRlIjoiIiwibWluU2FsZUF2YWlsRGF5IjoiIiwibWF4RG9tYWluQXZhaWxEYXkiOiIiLCJ0YWIiOiJzZWxlY3RlZCJ9)，进入控制台

<img src="https://s2.loli.net/2025/12/28/7ijFtkQlYhnMewC.webp" style="zoom:50%;" />

进入域名管理

<img src="https://s2.loli.net/2025/12/28/9A5FJp2IhkeOG8Y.webp" style="zoom:67%;" />

进入域名列表，点击管理

![](https://s2.loli.net/2025/12/28/cOYvKQarwZebfpI.webp)

进入DSN管理，修改DNS

![](https://s2.loli.net/2025/12/28/J8qSM2guhkK9viL.webp)

将以下这些全部填入

```latex
NS1.HE.NET、NS2.HE.NET、NS3.HE.NET、NS4.HE.NET、NE5.HE.NET
```

<img src="https://s2.loli.net/2025/12/28/4r7bT6maL1HchDA.webp" style="zoom:50%;" />

每次上传好之后，需要去GitHub对应项目里面，进入设置，进入pages，设置一下域名

![](https://s2.loli.net/2025/12/28/r7OBegR9xU8kMt4.webp)

# cloudflare CDN解析

## 域名购买

阿里可能需要实名认证等，在注册账号是，按照提示注册即可，购买期间若需补充其它信息，按要求补充即可

这里选择阿里云的域名，提供的这个的非常便宜实惠的域名，但是续费可能就是原价，可以一年换一次，购买：[域名交易_一口价域名_域名抢注-阿里云万网](https://mi.aliyun.com/?spm=5176.29045373.J_2177541330.5.3d1d183838ot1j#eyJwcm9kdWN0VHlwZSI6MiwicXVpY2tTZWFyY2giOiJbXCJcIl0iLCJrZXl3b3JkIjoiIiwiY29uc3RpdHV0ZUFyciI6WyIiXSwiZml4ZWRQcmljZVNlYXJjaFR5cGUiOiJzZWxlY3RlZCIsInF1aWNrU29ydCI6WyJwcmljZSIsImFzY2VuZCJdLCJtYXhTYWxlQXZhaWxEYXkiOiIiLCJzYWxlQXZhaWxEYXlSYW5nZSI6eyJtaW5TYWxlQXZhaWxEYXkiOiIiLCJtYXhTYWxlQXZhaWxEYXkiOiIifSwibWluRG9tYWluQXZhaWxEYXkiOjMwMCwiZG9tYWluQXZhaWxEYXlSYW5nZSI6eyJtaW5Eb21haW5BdmFpbERheSI6MzAwLCJtYXhEb21haW5BdmFpbERheSI6IiJ9LCJzZXNzaW9uQ29kZSI6ImV6bXZHaF81WWEyVGtxNXZGMEs5cyIsImNvbnN0aXR1dGUiOiIiLCJtaW5TYWxlQXZhaWxEYXkiOiIiLCJtYXhEb21haW5BdmFpbERheSI6IiIsInRhYiI6InNlbGVjdGVkIn0=)。

购买完成后，在控制台看是否成功，可能需要等待几分钟

![](https://s2.loli.net/2025/12/28/XWhfcP3yTj5aFgK.png)

进入控制台后，进入域名控制台

![](https://s2.loli.net/2025/12/28/4ylnUXEp1NkuvqH.png)

这里可查看域名

![](https://s2.loli.net/2025/12/28/e5N9wfuv7STWHYP.png)

## 修改DNS

在域名列表点击 管理

![](https://s2.loli.net/2025/12/28/OuZmKrjF3LXlxIU.png)

修改DNS，添加需要的

![](https://s2.loli.net/2025/12/28/DlroGmp14nBt7MA.png)

## 域名购买

[科赋锐信息科技Cloudflare](https://www.cloudflare-cn.com/)，进入后直接先注册账号

设置成中文，进入网站绑定域名

![](https://s2.loli.net/2025/12/28/sT6exdg2XAl3PBc.png)

在左侧栏中进入网站一栏，点击右方添加站点，第一次可能没有这个，但中间有一个可以直接添加

![](https://s2.loli.net/2025/12/28/ESBxa1uF93eR2gb.png)

输入自己的域名，注意不要带`www`或者`https`，比如我的就直接填写`qinyu.space`

<img src="https://s2.loli.net/2025/12/28/T6lSUF7G8thpqYf.png" style="zoom:50%;" />

选择套餐，`free`即可

<img src="https://s2.loli.net/2025/12/28/xhArlWCbOizS4wg.png" style="zoom: 33%;" />

点击继续后 cloudflare 会自动扫描域名的 dns 记录，如果是刚刚创建的域名，可能扫描的结果为空。**截图中的几条记录可以不用管**

<img src="https://s2.loli.net/2025/12/28/968vCwl3ZpAEasD.png" style="zoom:50%;" />

这一步很重要，点击添加记录，按照如下方式添加`类型为A`，名称为`@`，IPv4地址为`185.199.108.153`，**按照上述方式再添加以下三条记录，类型和名称和上述相同，IPv4地址分别为**：

```plain
185.199.109.153
185.199.110.153
185.199.111.153
```

完成之后应该能看到列表中有以下四条这样的记录，除了名称是自己的域名外其他应该都和图中相同

<img src="https://s2.loli.net/2025/12/28/LlEWPTeY6utDUpZ.png" style="zoom:50%;" />

上述添加的4条ip地址均是GitHub Pages 的 IP 地址，具体可查看[地址](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

点击继续后，往下滑 cloudflare 会要求将我们DNS服务器修改为以下图中所示的的服务器，可以先截个图或者存文档里

<img src="https://s2.loli.net/2025/12/28/XNP6RVKsDtdrSu3.png" style="zoom:50%;" />

点击下方继续后会有一个快速入门指南，里面的配置可以都开启：

<img src="https://s2.loli.net/2025/12/28/cOlTuZFDW4h6EMH.png" style="zoom:50%;" />

回到上面讲述修改DNS，DNS服务器更改后生效需要一段时间，少则几分钟，慢则需要几个小时

返回 cloudflare，如果看到 “Cloudflare 正在保护您的站点”说明已经配置成功了：

<img src="https://s2.loli.net/2025/12/28/In4VCmsRxOZt5Do.png" style="zoom: 33%;" />

## 设置Github page

进入github.io对应的仓库，进入 `Settings`：

![](https://s2.loli.net/2025/12/28/1WX8tCaDul594ZQ.png)

进入左栏中的`pages`，在 `Custom domain`中输入自己的域名，点击`save`，如果成功会显示下图：

![](https://s2.loli.net/2025/12/28/39splLa5QNUjJ6A.png)

这样就可以通过域名来访问自己的博客了，还可以在上图中勾选 `Enforcrs HTTPS`，这样网站仅会通过https提供服务

本文参考：[博客搭建（一）| 利用cloudflare加速github博客访问](https://qinyu.space/%E5%8D%9A%E5%AE%A2%E6%90%AD%E5%BB%BA/%E5%88%A9%E7%94%A8cloudflare%E5%8A%A0%E9%80%9Fgithub%E4%B8%BB%E9%A1%B5%E8%AE%BF%E9%97%AE/#%E9%85%8D%E7%BD%AE-cloudflare)

## cloudflare自动部署博客

新建部署，绑定GitHub账号选择对应仓库绑定即可

<img src="https://s2.loli.net/2025/12/28/ZtuTfzrm3NoMyxh.png" style="zoom:50%;" />

绑定自己的域名，这里的域名可以设置成自己的子域名，这样就可以拥有两个不同域名的博客，详细设置看下文

![](https://s2.loli.net/2025/12/28/h8P16mpoSi9qNKD.png)

# DNS解析填写

首先进入我们购买域名的页面，这里以阿里为例，进入阿里控制台

![](https://s2.loli.net/2025/12/28/s3HhSny8oP2Gc5A.webp)

进入域名列表，进入管理

![](https://s2.loli.net/2025/12/28/t7FTos6WaBrpyDb.webp)

这里的DNS修改，意思就是说，你DNS要选择哪家来控制你域名的解析，例如：如果你域名想在腾讯控制，填写解析，你就要先去腾讯的DNS服务添加你的域名，然后将服务地址复制到这里更换，更换完成之后，以后域名的相关解析就在腾讯控制，不在阿里控制了

这里一般选择一家即可，不能添加多家的DNS，这里我是配置到腾讯控制

<img src="https://s2.loli.net/2025/12/28/t7FTos6WaBrpyDb.webp" style="zoom:50%;" />

现在我们打开腾讯的DNS：[登录 - 腾讯云](https://console.dnspod.cn/)，添加域名(可能要添加TXT记录在原域名解析里面添加后验证即可)，然后进入解析

![](https://s2.loli.net/2025/12/28/LScju7g51YxWIaH.webp)

进入解析页面后，点击域名设置，可以看到我们腾讯所属的服务器，然后去阿里的域名管理将DNS修改成腾讯的服务器地址，则就完成了，如果你想更换别家的NDS也是相同的步骤，先添加域名，后查看服务器地址，再修改DNS

<img src="https://s2.loli.net/2025/12/28/xXAv817Yibyn5eZ.webp" style="zoom:50%;" />

现在来看解析里面应该怎么添加（以腾讯为例），对应的意思是什么。一般www.主域名等于主域名不能作为子域名使用

主机记录：

+ @：则你原域名
+ 如果写了别的则就是子域名，如：xinzai，则为xinzai.主域名（注意：www不能作为子域名）

记录类型：

+ A：将主机记录的域名解析到记录值的服务器地址
+ CNAME：将域名指向另一个域名地址，与其保持相同解析
+ TXT：一般添加域名等作为验证用，一般验证的时候会给出`主机记录`及`记录值`
+ NS：一般是将子域名交给别家DNS解析，也就是，现在主域名是在腾讯DNS，子域名要在阿里解析，则需要选择NS

记录值：

+ 记录类型为A：填写解析的服务器地址，例解析GitHub的静态博客，则将GitHub的服务器地址填写进入
+ 记录类型为CNAME：填写域名，需要指向的域名
+ 记录类型为TXT：按照需要验证的给出值填写即可
+ 记录类型为NS：填写你要在哪家解析的服务地址（先去添加域名，再查看服务器地址）

TTL ：

+ **指解析记录在 DNS 服务器缓存的生存时间，数值越小则生效越快**
+ 600：一般默认值，如不了解请保留 600 秒即可
+ 3600：当记录值较少变动时，建议选择 3600 秒，有利于提升解析速度
+ 60：当记录值频繁变动，可选择 60 秒，但解析速度可能略受影响

![](https://s2.loli.net/2025/12/28/NrejZhut3iOQysA.webp)

目前我是这样的，域名在阿里购买，再阿里将DNS修改为cloudflare ，后面解析都在cloudflare 添加和删除

主域名在cloudflare自动部署页面绑定，再使用NS解析，将子域名指向阿里、腾讯，在阿里、腾讯添加A解析(GitHub服务地址)，再去GitHub页面设置绑定子域名，这样就两个域名访问博客

