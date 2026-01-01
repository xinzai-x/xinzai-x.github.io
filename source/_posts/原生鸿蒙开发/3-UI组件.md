---
title: 3.UI组件
author: 星仔极客
top: false
toc: ture
mathjax: false
date: 2025-09-14 21:58:08
img:
coverImg:
cover: https://s2.loli.net/2025/12/28/FZgRoYaPr1N8WVc.webp
password:
categories: 原生鸿蒙开发
tags: 原生鸿蒙开发
---

Ctrl+p：提示方法

[莓创图表](https://meichuangit.net.cn/)

# 自定义组件[点击](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-custom-components)

```arkts
@Component
struct 自定义组件名{
    build() {
        //内容
    }
}
//export：导出组件，申明导出后再使用会自动导入
export default 组件名
```

# 组件重用样式[文档中心](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-style)

只能在当前文件内使用，不支持export 和传参，仅支持**通用属性**和**通用事件**

```arkts
@Styles
函数名(){
  //通用样式和事件抽离
}
.函数名()
```

```arkts
@Styles
styleFunction(){
  .width('100%')
  .height('100%')
  .backgroundColor(Color.Blue)
}
.styleFunction()		//调用
```

# 扩展组件样式

不支持export，扩展 组件的 样式、事件，实现 复用 效果

```arkts
@Extend(组件名称)
function styleFunction01(形参: 类型, ...) {
  //属性和事件
}
```

```arkts
@Extend(Button)
function styleFunction01(bgc: string) {
  .width('100%')
  .backgroundColor(bgc)
}
.styleFunction01('#3c3c')		//调用
```

# 自定义构建函数

@Builder装饰器有两种使用方式，分别是定义在自定义组件内部的私有自定义构建函数和定义在全局的全局自定义构建函数

```arkts
//全局
@Builder
function 自定义函数名(参数){
    //封装的结构以及组件 样式等
}
//局部
@Builder
自定义函数名(参数){
    //封装的结构以及组件 样式等
}
```

```arkts
@Builder
function navItem(icon: ResourceStr, text: string){
    Column(){
        Image(icon)
            .width('80%')
        Text(text)
    }
    .width('25%')
    .onClick(() =>{
        AlertDialog.show({message: '点了' + text})
    })
}
```

# 循环渲染

```arkts
//item：arr数组中的数据项，index：arr数组中的数据项索引
ForEach(数组, (item: 类型, index: 类型)=>{
})

```

```arkts
/*
Array.from({ length: 10 }：生成个数10的数组，里面没有赋值
value: string：数组里的值，index: number：下标索引，返回 index作为数组的值
item: number：下标索引
*/
ForEach(Array.from({ length: 10 }, (value: string, index: number) => index), (item: number) => {
  Text(item.toString())
})
```

# 文本[点击](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-use-text)

## 文本显示

新版中默认创建不会自动创建 en 国际化文件夹，需要在 **resources **右键新建 资源目录 选择对用的语言，后在新创建的资源文件夹中创建一个 **string.json**，再将 **resources**\element 中的 **string.json** 中内容复制到新的 string.json 文件中，即可编辑国际化对应的文本

<img src="https://s2.loli.net/2025/12/31/vmU4uLsj8d3EQK7.png" style="zoom: 50%;" />

<img src="https://s2.loli.net/2025/12/31/U7JNdST3APacGoq.png" style="zoom:50%;" />

```arkts
Text('文本')
//Text与Span同时配置文本内容时，Span内容覆盖Text内容
Text(){
    Span('文本')
        .decoration({ 
            type: TextDecorationType.枚举值,		//划线位置
            color: 颜色格式 			//文本划线颜色
        })
}
Text($r('app.string.枚举值'))	//根据系统不同语言显示不同文本
.borderWidth(数字)				//线框
.lineHeight(数字)				//行高
.fontSize(数字)					//字体大小
.textAlign(TextAlign.枚举值)		//文本对齐
.fontColor(颜色格式)				//字体颜色
.fontWeight(数字)               //字体粗细
.maxLines(数字)					//显示最大的行数
.textOverflow({ overflow: TextOverflow.枚举值 })		//配合maxLines字体超出行数的样式
.fontStyle(FontStyle.Italic)	//字体倾斜
.borderWidth(数字)				//线框
.copyOption(CopyOptions.枚举值)	//是否可以复制
```

## 文本输入

```arkts
TextArea()       // 多行输入框

TextInput({	placeholder: '占位符文本', text: '输入文本内容'})		//单行输入框
.placeholderColor(颜色格式)	//提示文本颜色
.type(InputType.枚举值)		//输入框类型
//事件
//文本内容发生变化时触发
.onChange((value) => {		//value为输入框内容
})
// 按下输入法回车键时触发
.onSubmit(() => {
})
```

```arkts
TextInput({ placeholder: '请输入用户名', text: '输入文本内容' })
  .onChange((value) => {
    promptAction.showToast({  //轻提示
      message: value
    })
  })
  .onSubmit(() => {
    promptAction.showToast({
      message: 'onsubmit'
    })
  })
```

# 下拉选择菜单[点击](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-select)

```arkts
Select([{ value: '下拉框值' }, ...])
  .value('下拉框值')					//默认显示
  .optionWidth(200)					//下拉框宽度
  .optionHeight(200)			//下拉框高度
  .menuAlign(MenuAlignType.CENTER)	//下拉框对齐方式
  .onSelect((index: number) => {		//选择回调
  })
```

```arkts
Select([{ value: '男' }, { value: '女' }])
  .value('女')
```

# 图片组件[点击](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-image)

工程中图片存放路径：`src/main/resources/base/media` 中，[HarmonyOS_icon素材](https://developer.huawei.com/consumer/cn/design/harmonyos-icon/)、[申请权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)

```arkts
Image('图片网址')	//网络图片资源，需要申请权限ohos.permission.INTERNET
Image( $r('app.media.文件名') )	//本地图片资源
.fillColor(颜色格式)				//若图片为svg格式可使用这个填充颜色
```

```arkts
Column() {
    Image('https://www.itheima.com/images/logo.png')
        .width(200)			//只需设置宽或高 就会等比例缩放
    Image($r('app.media.background'))
      .fillColor('#b0473d')
      .width(200)
}
```

# 按钮组件[文档中心](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-button)

```arkts
Button('按钮展示的文本', 
  { 
    type: ButtonType.枚举值,		//按钮形状 
    stateEffect: true 				//是否开启按压态显示效果
  }
)
```

```arkts
Button('OK', { type: ButtonType.Normal, stateEffect: true })
```

# 下拉选择菜单[文档中心](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-select)

```arkts
Select([
  {value:'菜单文本',icon:$r('app.media.MQTT')
}])
.value('未选择显示的文本')
.menuAlign(MenuAlignType.枚举值)		//下拉菜单对齐方式
.optionWidth(200)					//下拉菜单宽度
.optionHeight(200)					//下拉菜单高度
.menuAlign(MenuAlignType.枚举值)		//下拉菜单对齐方式
.onSelect((index: number) => {		//选中回调函数
})
```

```arkts
Select([
  {value:'MQTT',icon:$r('app.media.MQTT')
}]).layoutWeight(1)
.value('请选择').menuAlign(MenuAlignType.CENTER)
.optionWidth(200)
```

# 进度条组件[文档中心](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-progress)

```arkts
Progress({
  total: 数字,					//指定进度总长
  value: 数字,					//指定当前进度值
  type: ProgressType.枚举值		//指定进度条类型
})
```

```arkts
Progress({
  total: 100,
  value: this.value,
  type: ProgressType.Ring
})
```

# 加载动效组件[文档中心](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-loadingprogress)

```arkts
LoadingProgress()
.color(颜色格式)
```

# 下拉刷新组件[文档中心](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-refresh)

页面下拉操作并显示刷新动效的容器组件

```arkts
@State 变量名: boolean = false
//builder：自定义刷新区域显示内容
Refresh(
  { refreshing: $$this.变量名, promptText: '下拉刷新展示文本', builder: this.自定义函数名() 
  }) {
  //刷新的组件
}
.refreshOffset(数字)        //当下拉距离小于该属性设置值时离手不会触发刷新
.onRefreshing(() => {		//进入刷新状态时触发回调
  //数据更新地方
  //手动关闭刷新状态
  this.变量名 = false
}
```

```arkts
@State list: number[] = Array(20).fill(Math.random())
@State isRefresh: boolean = false

@Builder
refreshConten() {
  Row({ space: 8 }) {
    LoadingProgress()
      .width(20)
    Text('正在玩命加载...')
  }
  .width('100%')
}
Refresh({ refreshing: $$this.isRefresh, promptText: '正在刷新', builder: this.refreshConten() }) {
  List() {
    ForEach(this.list, (item: number) => {
      ListItem() {
        Text(item.toString())
          .height(100)
          .width("100%")
      }
    })
  }
  .divider({ strokeWidth: 2 })
}
.refreshOffset(150)
.onRefreshing(() => {
  setTimeout(() => {
    //数据更新地方
    this.list = Array(20).fill(Math.random())
    //手动关闭刷新状态
    this.isRefresh = false
  }, 1000)
})
```

# 角标组件

```arkts
Badge({
    count: 数字,	//角标数值
    position: BadgePosition.枚举值,	//角标位置
    style: {
        fontSize: 14,			//角标文字大小
        badgeSize: 20,			// 角标大小
        badgeColor:'#fa2a2d'	// 角标底色
    }
}){
    //这里写角标下面的图片
    Image(图片链接)
}

Badge({
    count: 1,
    position: BadgePosition.RightTop,
    style: {
        fontSize: 14,
        badgeSize: 20,
        badgeColor:'#fa2a2d'
    }
}){
    Image($r('app.media.bg_00'))
        .width(100)
}
```

# 勾选开关组件[文档中心](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-common-components-switch)

```arkts
Toggle({
  type: ToggleType.枚举值, 	//开关样式
  isOn: true    //默认开关状态
})
.selectedColor(颜色格式)//打开状态的背景颜色
.switchPointColor(颜色格式)//圆形滑块颜色,仅对type为ToggleType.Switch生效
.switchStyle({
  //仅对type为ToggleType.Switch生效
  pointRadius: 数字, //圆形滑块半径
  unselectedColor: 颜色格式, //关闭状态的背景颜色
  trackBorderRadius: 数字   //滑轨的圆角
})
.onChange((isOn: boolean) => {
    if(isOn) {
      // 需要执行的操作
    }
})
```

```arkts
Toggle({
  type: ToggleType.Switch, //样式
  isOn: true    //默认开关状态
})
  .selectedColor(Color.Red)//打开状态的背景颜色
  .switchPointColor(Color.Gray)//圆形滑块颜色,仅对type为ToggleType.Switch生效
  .switchStyle({
    //仅对type为ToggleType.Switch生效
    pointRadius: 5, //圆形滑块半径
    unselectedColor: Color.Pink, //关闭状态的背景颜色
    trackBorderRadius: 10   //滑轨的圆角
  })
Toggle({ type: ToggleType.Button, isOn: false }) {
  Text('status button').fontColor('#182431').fontSize(12)
}
```

# 分段按钮[文档中心](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-segmentbuttonv2#capsulesegmentbuttonv2)

```arkts
// 必须 @ComponentV2 修饰
@Local textItems: SegmentButtonV2Items = new SegmentButtonV2Items([
  { text: '手机' },
  { text: '平板' },
  { text: '2in1' },
  { text: '智能穿戴' },
],);
@Local textSelectedIndex: number = 0;
CapsuleSegmentButtonV2({
  items: this.textItems,
  selectedIndex: this.textSelectedIndex!!,
  onItemClicked: (index: number) => {
    console.log('点击了选项:', index);
  }
})

// 不需要 @ComponentV2 修饰
@State textSelectedIndex: number = 0;
CapsuleSegmentButtonV2({
  items: new SegmentButtonV2Items([
    { text: '关闭' },
    { text: '红色' },
  ]),
  selectedIndex: this.textSelectedIndex!!,
  onItemClicked: async (index: number) => {
  }
})
```

# 轮播组件[文档中心](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-layout-development-create-looping)

容器组件，当设置了多个子组件后，可以对子组件 进行轮播显示

## 语法

一般轮播要设置宽高比例

```arkts
Swiper() {
    //  轮播内容
}
//设置尺寸（内容会自动拉伸）

Swiper(){
    Text('1')
    Text('2')
    Text('3')
}
.width('100%')
.height(100)
```

## 基本属性

```arkts
//是否开启循环
.loop(false)	//默认true

//是否自动播放
.autoPlay(true)	//默认false

//自动播放的时间间隔（ms）
.interval(1000)	//3000

//纵向滑动轮播
.vertical(true)	//默认false
```

## 样式自定义

一般选中的比默认的要高一点点，动画会好些

```arkts
Swiper() {
   // ...
}
.indicator(
    Indicator.dot()	// 小圆点
    .itemWidth(20)	// 默认的宽
    .itemHeight(20)	// 默认的高
    .color(Color.Black)	// 默认的颜色
    .selectedItemWidth(30)	// 选中的宽
    .selectedItemHeight(30)	// 选中的高
    .selectedColor(Color.White)	// 选中的颜色
)
```

# 动画

元素配合点击事件来改变 缩放中xy值、透明度、层级等等的值 再配置动画才有效果 

```arkts
//元素有状态的改变，可以添加animation做动画
.animation({
    duration: 300	//动画时间，单位毫秒
})

//缩放
.scale({
    x: 1,	//1：原组件大小
    y: 1
})
```

# 分类容器组件

当页面内容较多时，可以通过`Tabs`组件进行 分类展示

## 语法

```arkts
Tabs(){
    TabContent(){
        //导航显示的内容
    }
    .tabBar(导航按钮样式)
}

Tabs(){
    TabContent(){
        Text('首页内容')
    }
    .tabBar('首页')
    TabContent(){
        Text('推荐内容')
    }
    .tabBar('推荐')
}
```

## 常用属性

```arkts
//调整导航栏位置(垂直：左还是右，水平：上方、下方)
Tabs({barPosition: BarPosition.枚举值})

//设置导航栏方向，true：垂直，flase：水平
.vertical(false)

//设置导航栏是否允许滑动
.scrollable(true)

//导航切换动画时间
.animationDuration(1)

//TabBar的背景颜色
.barBackgroundColor('#ffffffff')

//设置导航栏是否滚动
.barMode(BarMode.枚举值)	//Scrollable：滚动
```

## 自定义TabBar

导航栏显示 图形 和 文字，甚至有 特殊的图标，若有

onChange：滑动切换、点击切换 均会触发

onTabBarClick：只有点击才会触发

```arkts
@Builder
自定义函数名() {
    // 自定义的Tabbar结构
}
Tabs() {
    TabContent() {
        // 内容略
    }.
    tabBar(this.自定义函数名())
}
.onChange((index: number) => {	//index索引值，从0开始，但代表的是导航栏1开始
})

//存储激活的索引值
@State selectedIndex:number = 0
@Builder
mytabs(itemIndex: number, name: string,url: ResourceStr,selurl: ResourceStr){
    Column({space: 5}){
        Image(itemIndex == this.selectedIndex? selurl : url)
            .width(30)
        Text(name)
            .fontSize(12)
        //通过传递本身和获取到的索引作比较，从而知道选中的是哪个
            .fontColor(itemIndex == this.selectedIndex? Color.Red: Color.Black)
    }
}
build() {
    Tabs(){
        TabContent(){
            Text('购物车内容')
        }
        .tabBar(this.mytabs(0,'购物车',$r('app.media.ic_tabbar_icon_2'),$r('app.media.ic_tabbar_icon_2_selected')))
        TabContent(){
            Text('我的内容')
        }
        .tabBar(this.mytabs(1,'我的',$r('app.media.ic_tabbar_icon_3'),$r('app.media.ic_tabbar_icon_3_selected')))
    }
    .onChange((index: number) => {
        this.selectedIndex = index
    })
}
```



