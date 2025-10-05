---
title: Windows相关设置
author: 星仔极客
top: false
toc: ture
mathjax: false
date: 2025-09-23 19:21:14
img:
coverImg:
cover: https://i.postimg.cc/tgWYM8Dd/Windows.jpg
password:
categories: 技术积累
tags: Windows相关设置
---

# Win11 使用 Win10的文件资源管理器

在 Windows 11 中恢复旧文件资源管理器 首先打开记事本并粘贴以下文本代码，然后保存，将记事本重命名为：文件名.reg，如：`file.reg`，然后双击添加注册表即可

```plain
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Classes\CLSID\{2aa9162e-c906-4dd9-ad0b-3d24a8eef5a0}]
@="CLSID_ItemsViewAdapter"

[HKEY_CURRENT_USER\Software\Classes\CLSID\{2aa9162e-c906-4dd9-ad0b-3d24a8eef5a0}\InProcServer32]
@="C:\\Windows\\System32\\Windows.UI.FileExplorer.dll_"
"ThreadingModel"="Apartment"

[HKEY_CURRENT_USER\Software\Classes\CLSID\{6480100b-5a83-4d1e-9f69-8ae5a88e9a33}]
@="File Explorer Xaml Island View Adapter"

[HKEY_CURRENT_USER\Software\Classes\CLSID\{6480100b-5a83-4d1e-9f69-8ae5a88e9a33}\InProcServer32]
@="C:\\Windows\\System32\\Windows.UI.FileExplorer.dll_"
"ThreadingModel"="Apartment"

[HKEY_CURRENT_USER\Software\Microsoft\Internet Explorer\Toolbar\ShellBrowser]
"ITBar7Layout"=hex:13,00,00,00,00,00,00,00,00,00,00,00,20,00,00,00,10,00,01,00,\
  00,00,00,00,01,00,00,00,01,07,00,00,5e,01,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,\
  00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00
```

关闭 Windows 10 的文件资源管理器，切换回 Windows 11

再次打开记事本，把下面的文本粘贴进去，保存同样的 .reg 文件，双击执行即可

```plain
Windows Registry Editor Version 5.00 

[-HKEY_CURRENT_USER\Software\Classes\CLSID\{2aa9162e-c906-4dd9-ad0b-3d24a8eef5a0}] 

[-HKEY_CURRENT_USER\Software\Classes\CLSID\{6480100b-5a83-4d1e-9f69-8ae5a88e9a33}]
```

# Win11右键修改成Win10

`win + r`以管理员运行命令窗口，输入下列代码，重启电脑或文件管理区

```shell
reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
```

恢复，与上相同方法

```shell
reg delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" /f
```

# Win11关闭桌面拖动到此处分享

![](https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250923194402907.png)

在管理员命令窗口中输入下面代码后回车执行，然后重启电脑

```shell
reg add "HKLM\SYSTEM\ControlSet001\Control\FeatureManagement\Overrides\14\3895955085" /v EnabledState /t REG_DWORD /d 1 /f & reg add "HKLM\SYSTEM\ControlSet001\Control\FeatureManagement\Overrides\14\3895955085" /v EnabledStateOptions /t REG_DWORD /d 0 /f
```



# 家庭版系统增加Hyper-V

新建txt文件，将下面复制进去，改名为`Hyper-V.bat`，以管理员身份运行，然后重启电脑

```shell
pushd "%~dp0"

dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt

for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"

del hyper-v.txt

Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
```

# Win10系统复制或新建文件后需要刷新的解决办法

按Win + r输入 regedit 后回车，在注册表中依次展开并定位到HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control，在Control 文件夹下新建一个名为Updata项，再刚创建的Updata文件夹下再创建一个UpdataMode项，然后再新建一个可扩充字符串值，名为：DWORD，值为：0

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250923194258782.png" alt="新建项的方法" style="zoom:50%;" />

<img src="https://images.weserv.nl/?url=frp1.mmszxc.xin:24191/Blog/20250923194303677.png" alt="新建可扩充字符串值方法" style="zoom:50%;" />

# 火狐浏览器优化

iTab 标签设置：

[🌏Firefox安装教程 | iTab新标签页](https://itab.link/install/firefox.html)

配置滚轮切换标签：

[火狐浏览器两个非常适合国人的配置项——滚轮切换标签页、双击关闭标签页](https://linux.do/t/topic/359819)

配置双击关闭标签：

[开启火狐浏览器 Firefox 原生「双击关闭标签页」功能_firefox双击关闭标签页-CSDN博客](https://blog.csdn.net/weixin_45498383/article/details/127865392)

解决占用内存大、启动慢问题

[解决firefox火狐浏览器占用内存大、启动慢问题的方法_火狐运行占内存很大-CSDN博客](https://blog.csdn.net/zhuyunier/article/details/79045064)









