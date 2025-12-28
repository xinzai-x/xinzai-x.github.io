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

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151203729.webp" style="zoom:50%;" />

注册好之后，我们直接登陆，直接添加域名

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151208619.webp)

输入购买的域名

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151219678.webp" style="zoom:50%;" />

进入添加记录

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151222280.webp)

添加对应的类型添加，按照如下方式添加`类型为A`，名称为`@`，IPv4地址为`185.199.108.153`，**按照上述方式再添加以下三条记录，类型和名称和上述相同，IPv4地址分别为**：

```plain
185.199.109.153
185.199.110.153
185.199.111.153
```

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151230176.webp)

添加好后我们去购买域名的地方，[域名交易_一口价域名_域名抢注-阿里云万网](https://mi.aliyun.com/?spm=5176.29045373.J_2177541330.5.3d1d183838ot1j#eyJwcm9kdWN0VHlwZSI6MiwicXVpY2tTZWFyY2giOiJbXCJcIl0iLCJrZXl3b3JkIjoiIiwiY29uc3RpdHV0ZUFyciI6WyIiXSwiZml4ZWRQcmljZVNlYXJjaFR5cGUiOiIiLCJxdWlja1NvcnQiOlsicHJpY2UiLCJhc2NlbmQiXSwibWF4U2FsZUF2YWlsRGF5IjoiIiwic2FsZUF2YWlsRGF5UmFuZ2UiOnsibWluU2FsZUF2YWlsRGF5IjoiIiwibWF4U2FsZUF2YWlsRGF5IjoiIn0sIm1pbkRvbWFpbkF2YWlsRGF5IjozMDAsImRvbWFpbkF2YWlsRGF5UmFuZ2UiOnsibWluRG9tYWluQXZhaWxEYXkiOjMwMCwibWF4RG9tYWluQXZhaWxEYXkiOiIifSwic2Vzc2lvbkNvZGUiOiIxZXhsWEVsYTZsRGhfb21sT2M5ZzUiLCJjb25zdGl0dXRlIjoiIiwibWluU2FsZUF2YWlsRGF5IjoiIiwibWF4RG9tYWluQXZhaWxEYXkiOiIiLCJ0YWIiOiJzZWxlY3RlZCJ9)，进入控制台

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151233196.webp" style="zoom:50%;" />

进入域名管理

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151241083.webp" style="zoom:67%;" />

进入域名列表，点击管理

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151252843.webp)

进入DSN管理，修改DNS

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151256230.webp)

将以下这些全部填入

```latex
NS1.HE.NET、NS2.HE.NET、NS3.HE.NET、NS4.HE.NET、NE5.HE.NET
```

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151303623.webp" style="zoom:50%;" />

每次上传好之后，需要去GitHub对应项目里面，进入设置，进入pages，设置一下域名

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151307024.webp)

# cloudflare CDN解析

## 域名购买

阿里可能需要实名认证等，在注册账号是，按照提示注册即可，购买期间若需补充其它信息，按要求补充即可

这里选择阿里云的域名，提供的这个的非常便宜实惠的域名，但是续费可能就是原价，可以一年换一次，购买：[域名交易_一口价域名_域名抢注-阿里云万网](https://mi.aliyun.com/?spm=5176.29045373.J_2177541330.5.3d1d183838ot1j#eyJwcm9kdWN0VHlwZSI6MiwicXVpY2tTZWFyY2giOiJbXCJcIl0iLCJrZXl3b3JkIjoiIiwiY29uc3RpdHV0ZUFyciI6WyIiXSwiZml4ZWRQcmljZVNlYXJjaFR5cGUiOiJzZWxlY3RlZCIsInF1aWNrU29ydCI6WyJwcmljZSIsImFzY2VuZCJdLCJtYXhTYWxlQXZhaWxEYXkiOiIiLCJzYWxlQXZhaWxEYXlSYW5nZSI6eyJtaW5TYWxlQXZhaWxEYXkiOiIiLCJtYXhTYWxlQXZhaWxEYXkiOiIifSwibWluRG9tYWluQXZhaWxEYXkiOjMwMCwiZG9tYWluQXZhaWxEYXlSYW5nZSI6eyJtaW5Eb21haW5BdmFpbERheSI6MzAwLCJtYXhEb21haW5BdmFpbERheSI6IiJ9LCJzZXNzaW9uQ29kZSI6ImV6bXZHaF81WWEyVGtxNXZGMEs5cyIsImNvbnN0aXR1dGUiOiIiLCJtaW5TYWxlQXZhaWxEYXkiOiIiLCJtYXhEb21haW5BdmFpbERheSI6IiIsInRhYiI6InNlbGVjdGVkIn0=)。

购买完成后，在控制台看是否成功，可能需要等待几分钟

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151315317.png)

进入控制台后，进入域名控制台

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151321233.png)

这里可查看域名

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151325026.png)

## 修改DNS

在域名列表点击 管理

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151333627.png)

修改DNS，添加需要的

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151338211.png)

## 域名购买

[科赋锐信息科技Cloudflare](https://www.cloudflare-cn.com/)，进入后直接先注册账号

设置成中文，进入网站绑定域名

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151343679.png)

在左侧栏中进入网站一栏，点击右方添加站点，第一次可能没有这个，但中间有一个可以直接添加

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151346497.png)

输入自己的域名，注意不要带`www`或者`https`，比如我的就直接填写`qinyu.space`

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151402151.png" style="zoom:50%;" />

选择套餐，`free`即可

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151404458.png" style="zoom: 33%;" />

点击继续后 cloudflare 会自动扫描域名的 dns 记录，如果是刚刚创建的域名，可能扫描的结果为空。**截图中的几条记录可以不用管**

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151415908.png" style="zoom:50%;" />

这一步很重要，点击添加记录，按照如下方式添加`类型为A`，名称为`@`，IPv4地址为`185.199.108.153`，**按照上述方式再添加以下三条记录，类型和名称和上述相同，IPv4地址分别为**：

```plain
185.199.109.153
185.199.110.153
185.199.111.153
```

完成之后应该能看到列表中有以下四条这样的记录，除了名称是自己的域名外其他应该都和图中相同

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151430166.png" style="zoom:50%;" />

上述添加的4条ip地址均是GitHub Pages 的 IP 地址，具体可查看[地址](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

点击继续后，往下滑 cloudflare 会要求将我们DNS服务器修改为以下图中所示的的服务器，可以先截个图或者存文档里

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151438914.png" style="zoom:50%;" />

点击下方继续后会有一个快速入门指南，里面的配置可以都开启：

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151441098.png" style="zoom:50%;" />

回到上面讲述修改DNS，DNS服务器更改后生效需要一段时间，少则几分钟，慢则需要几个小时

返回 cloudflare，如果看到 “Cloudflare 正在保护您的站点”说明已经配置成功了：

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151450989.png" style="zoom: 33%;" />

## 设置Github page

进入github.io对应的仓库，进入 `Settings`：

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151455918.png)

进入左栏中的`pages`，在 `Custom domain`中输入自己的域名，点击`save`，如果成功会显示下图：

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151513351.png)

这样就可以通过域名来访问自己的博客了，还可以在上图中勾选 `Enforcrs HTTPS`，这样网站仅会通过https提供服务

> 如果如下图显示dns配置不正确，推测可能是使用了cloudflare后，GitHub验证DNS时返回的是cdn服务器的ip地址，而不是在cloudflare上开始配置的4个GitHub page的ip地址，可以在线dig一下自己的域名验证一下。不过只要网站能通过域名正常访问就没什么问题。
>
> ![](https://s2.loli.net/2024/08/19/1aWPU4ry8Obgj9l.png)

本文参考：[博客搭建（一）| 利用cloudflare加速github博客访问](https://qinyu.space/%E5%8D%9A%E5%AE%A2%E6%90%AD%E5%BB%BA/%E5%88%A9%E7%94%A8cloudflare%E5%8A%A0%E9%80%9Fgithub%E4%B8%BB%E9%A1%B5%E8%AE%BF%E9%97%AE/#%E9%85%8D%E7%BD%AE-cloudflare)

## cloudflare自动部署博客

新建部署，绑定GitHub账号选择对应仓库绑定即可

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151602111.png" style="zoom:50%;" />

绑定自己的域名，这里的域名可以设置成自己的子域名，这样就可以拥有两个不同域名的博客，详细设置看下文

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151627798.png)

# DNS解析填写

首先进入我们购买域名的页面，这里以阿里为例，进入阿里控制台

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151640387.webp)

进入域名列表，进入管理

![](https://cdn.nlark.com/yuque/0/2025/webp/51403960/1736326466449-8266a15c-a284-457f-97de-7fdcdf71423e.webp)

这里的DNS修改，意思就是说，你DNS要选择哪家来控制你域名的解析，例如：如果你域名想在腾讯控制，填写解析，你就要先去腾讯的DNS服务添加你的域名，然后将服务地址复制到这里更换，更换完成之后，以后域名的相关解析就在腾讯控制，不在阿里控制了

这里一般选择一家即可，不能添加多家的DNS，这里我是配置到腾讯控制

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151644664.webp" style="zoom:50%;" />

现在我们打开腾讯的DNS：[登录 - 腾讯云](https://console.dnspod.cn/)，添加域名(可能要添加TXT记录在原域名解析里面添加后验证即可)，然后进入解析

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151647940.webp)

进入解析页面后，点击域名设置，可以看到我们腾讯所属的服务器，然后去阿里的域名管理将DNS修改成腾讯的服务器地址，则就完成了，如果你想更换别家的NDS也是相同的步骤，先添加域名，后查看服务器地址，再修改DNS

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151651190.webp" style="zoom:50%;" />

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

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151659316.webp)

目前我是这样的，域名在阿里购买，再阿里将DNS修改为cloudflare ，后面解析都在cloudflare 添加和删除

主域名在cloudflare自动部署页面绑定，再使用NS解析，将子域名指向阿里、腾讯，在阿里、腾讯添加A解析(GitHub服务地址)，再去GitHub页面设置绑定子域名，这样就两个域名访问博客

# Cloudflare 和 JsDelivr 免费加速博客 GitHub 图床等静态资源(失效)

使用免费图床，参考已写博文：[Just a moment...](https://68565200.xyz/post/2ec6e870)

## 前言

本文通过学习此博客编写：[通过 Cloudflare 和 jsDelivr 免费加速博客 GitHub 图床等静态资源](https://www.haoyep.com/posts/github-graph-beds-cdn/#%E9%85%8D%E7%BD%AE%E5%9F%9F%E5%90%8D)，通过 Cloudflare 和 jsDelivr 免费加速博客 GitHub 静态资源(GitHub图床)，自动实现 CDN 资源的海内外分流，加速博客访问速度

## 配置

首先，要配置好域名以及DNS，进入部署好的DNS

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151722665.png)

在 DNS 配置中，新增一条 CNAME 解析记录，并启用代理。 如图，我这里是将 cdn.haoyep.com 解析到了 jsd.cdn.zzko.cn，并使用 Cloudflare 代理（点亮小云朵）

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151724905.png)

目标：资源链接都使用 cdn.haoyep.com，Cloudflare 在代理 cdn.haoyep.com 时，判断请求来源是国内，则将 cdn.haoyep.com 重定向到 jsd.cdn.zzko.cn；国外的请求则重定向到 cdn.jsdelivr.net。

### 配置国内重定向

规则名称 （必需）：标注国内，方便区分

自定义筛选表达式：`(http.host eq "cdn.haoyep.com" and ip.geoip.country eq "CN")`

URL 重定向

+ 类型：`动态`
+ 表达式：`concat("https://jsd.cdn.zzko.cn", http.request.uri.path)`
+ 状态代码：`302`

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151738099.png)

### 配置国外重定向

规则名称 （必需）：标注国外，方便区分

自定义筛选表达式：(`http.host eq "cdn.haoyep.com" and ip.geoip.country ne "CN"`)

URL 重定向

+ 类型：`动态`
+ 表达式：`concat("https://cdn.jsdelivr.net", http.request.uri.path)`
+ 状态代码：`302`

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151742402.png)

> 技巧：  
> HTTP 重定向状态选择302而不是301。虽然两类请求都会被 Cloudflare 缓存，但301理论上是永久跳转而302是临时跳转，因此301可能会导致长时间缓存，不利于今后修改重定向到新地址。

### PicGo 设置

我们已经除了GitHub上传图片教程：[GitHub+Picgo图片上传_github上传图片-CSDN博客](https://blog.csdn.net/qq_65047384/article/details/140401010)

这里只需修改，自定义域名连接里面的`cdn.haoyep.com`，修改成自己的，其它按之前的配置即可

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250831151747676.png" style="zoom:50%;" />

之前已经上传的图片，也只需要将图片链接中的`cdn.haoyep.com`，修改成自己的，在Typora可以ctrl+f，直接全部替换即可

后续没有什么效果，已转至云图床



