---
title: Windows相关设置
top: false
categories: 技术积累
abbrlink: 2b22
date: 2025-09-23 19:21:14
password:
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

![](https://s2.loli.net/2025/12/28/Gsrf3TnK8NhERdZ.png)

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

按Win + r输入 regedit 后回车，在注册表中依次展开并定位到`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control`，在Control 文件夹下新建一个名为Updata项，再刚创建的Updata文件夹下再创建一个UpdataMode项，然后再新建一个可扩充字符串值，名为：DWORD，值为：0

<img src="https://s2.loli.net/2025/12/28/PYOrItKf836WEwd.png" alt="新建项的方法" style="zoom:50%;" />

<img src="https://s2.loli.net/2025/12/28/6YnwEXKQRotWAVc.png" alt="新建可扩充字符串值方法" style="zoom:50%;" />

# 脚本运行乱码

如果勾选了此选项（默认设置是不勾选的），需要把.bat文件保存为UTF-8编码，如果未勾选，则需把.bat文件保存为ANSI编码，很多时候我们使用的都是UTF-8编码，然后ANSI编码来运行就乱码。

1. 打开控制面板，点击进入`区域`

   <img src="https://files.seeusercontent.com/2026/06/16/B6bz/fe3ceb5.webp" alt="控制面板图.webp" style="zoom:50%;" />

2. 点击`更改系统区域设置`

   <img src="https://files.seeusercontent.com/2026/06/16/B0yf/4f20e14.webp" alt="管理界面.webp" style="zoom:50%;" />

3. 勾选`Beta版：使用UnicodeUTF-8提供全球语言支持(U)`

   <img src="https://files.seeusercontent.com/2026/06/16/Fma7/0d37456.webp" alt="勾选设置.webp" style="zoom:50%;" />

















