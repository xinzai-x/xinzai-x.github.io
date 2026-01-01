---
title: 1.MySQL基础
author: 星仔极客
top: false
toc: ture
mathjax: false
date: 2025-09-14 22:51:09
img:
coverImg:
cover: https://s2.loli.net/2025/12/28/Uqn7Gf6MEAv9JXS.webp
password:
categories: MySQL数据库
tags: MySQL数据库
---

|   关键字    |       含义       |
| :---------: | :--------------: |
|  database   |        库        |
|    table    |        表        |
|   create    |       创建       |
|    drop     | 删除(数据库或表) |
|    alter    |       修改       |
|   update    |     数据修改     |
| insert into |       插入       |
|    where    |       筛选       |
| delete from |    删除(数据)    |
|   select    |       查询       |


# 查看所有数据库

```sql
-- 查看所有数据库
show databases;
```

# 查看当前数据库所有的表

```sql
show tables;
```

# 查看指定表的创建语句

```sql
show create table 查看的表名;
show create table student;
```

# 查看表结构

```sql
desc 表名;
desc student;
```

# 创建数据库

```sql
create database 创建数据库名字;
create database mydb1;

-- if not exists：当数据库mydbq不存在时才创建
create database if not exists 创建数据库名字;
create database if not exists mydbq;
```

# 使用哪个数据库

```sql
use 使用的数据库名;
use mydb1;
```

# 删除数据库

```sql
drop database 删除的数据库名;
drop database mydb1;

-- if exists：当数据库mydb1存在时才删除
drop database if exists 删除的数据库名;
drop database if exists mydb1;
```

# 修改数据库编码（默认utf8）

```sql
alter database 修改的数据库名 character set 编码格式;
alter database mydb1 character set utf8;
```

# 创建表

```sql
-- 创建表是构建一张空表，指定这个表的名字，这个表有几列，每一列叫什么名字，以及每一列存储的数据类型
-- 字段名：每一列的名字，中括号中的内容可以省略也可以添加
create table [if not exists]表名(
  字段名1 类型[(宽度)] [约束条件] [comment '字段说明'],
  字段名2 类型[(宽度)] [约束条件] [comment '字段说明'],
  字段名3 类型[(宽度)] [约束条件] [comment '字段说明']
)[表的一些设置];

create table if not exists student(
  sid int,
  name varchar(20),
  gender varchar(10),
  age int,
  birth date,
  address varchar(20),
  score double
);
```

# 数据类型

|   数据类型   |                           描述                            |  大小  |
| :----------: | :-------------------------------------------------------: | :----: |
|   tinyint    |                       非常小的整数                        | 1 byte |
|   smallint   |                        较小的整数                         | 2 byte |
|  mediumint   |                      中等大小的整数                       | 3 byte |
| int或integer |                      普通大小的整数                       | 4 byte |
|    bigint    |                          大整数                           | 8 byte |
|    float     |                       单精度浮点数                        | 4 byte |
|    double    |                       双精度浮点数                        | 8 byte |
|   decimal    |                   小数，精度和标度可变                    |        |
|   varchar    |                    变长字符串，0-65535                    |        |
|     date     |                  日期，格式为YYYY-MM-DD                   |   3    |
|   datetime   | 混合日期和时间值(1000-01-01 00:00:00~9999-12-31 23:59:59) |   8    |
|  timestamp   |         混合日期和时间值 时间戳(获取当前时区时间)         |   4    |


# 删除表

```sql
drop table 表名;
drop table student;
```

# 修改表结构

## 表添加列

```sql
alter table 表名 add 列名 类型(长度) [约束];

-- 为student表添加一个新的字段为：系别 dept 类型为 varchar(20)
alter table student add dept varchar(20);
```

## 修改列名和类型

```sql
alter table 表名 change 旧列名 新列名 类型(长度) 约束; 

-- 为student表的dept字段更换为department varchar(30)
alter table student change dept department varchar(30);
```

## 删除列

```sql
alter table 表名 drop 列名;

-- 删除student表中department这列
alter table student drop department;
```

## 修改表名

```sql
rename table 表名 to 新表名;

-- 将表student改名成 stu
rename table student to stu;
```

# 表的增删改(DML)

## 插入数据

```sql
-- 向某些列插入值
-- 值要与列名的数据类型保持一致
insert into 表 (列名1,列名2,列名3...) values (值1,值2,值3...);
-- 向表中所有列插入值
insert into 表 values (值1,值2,值3...);

insert into student(sid,name,gender,age,birth,address,score)
    values (1001,'张三','男',18,'2001-11-12','北京',13.9),
    (1002,'李四','女',15,'2001-11-12','北京',10.9);
    
insert into student values (1003,'王五','女',34,'1992-12-01','深圳',23);
```

## 数据修改

```sql
-- 将字段名那一列全部行都修改
update 表名 set 字段名=值,字段名=值...;
-- 满足条件的行才修改
update 表名 set 字段名=值,字段名=值... where 条件;

-- 将所有学生的地址修改为重庆
update student set address='重庆';
-- id为1002的学生的地址修改为北京
update student set address='北京' where sid = 1002;
-- id为1001的学生的地址修改为上海，成绩修成绩修改为100
update student set address='上海',score=100 where sid = 1001;
```

## 数据删除

```sql
delete from 表名 [where 条件];
-- 整个表删除，然后再创建该表
truncate table 表名; 或者 truncate 表名;

-- 删除sid为1004的学生数据
delete from student where sid = 1003;
-- 2.删除表所有数据
delete from student;
-- 3.清空表数据
truncate table student;
truncate student;
```

# 约束

## 主键约束

主键可以是一个列或者多个列的组合，其值能唯一地标识表中的每一行，方便在RDBMS中尽快的找到某一行

`不允许重复，不允许空值`，每个表最多只允许`一个主键`，当创建主键的约束时，系统默认会在所在的列和列组合上建立对应的唯一索引

关键字：`primary key`

### 添加单列主键

方式1：在定义字段的同时指定主键

```sql
create table 表名(
   ...
   <字段名> <数据类型> primary key
   ...
);

create table emp1(
    -- 将eid添加主键约束
    eid int primary key,
    name varchar(20),
    deptId int,
    salary double
);
```

方式2：在定义字段之后再指定主键

```sql
create table 表名(
   ...
    -- []里面可以省略
   [constraint <约束名>] primary key [字段名]
);

create table emp2(
    eid int,
    name varchar(20),
    deptId int,
    salary double,
    -- constraint pk1可以省略
    constraint pk1 primary key(eid)
);
```

### 添加多列联合主键

+ 主键由一张表中多个字段组成，只要主键的字段不完全相同即可但任何一个都不能为空
+ 当主键是由多个字段组成时，不能直接在字段名后面声明主键约束
+ 一张表只能有一个主键，联合主键也是一个主键

```sql
create table 表名(
   ...
   primary key (字段1，字段2，…,字段n)
);

create table emp3(
    eid int,
    name varchar(20),
    deptId int,
    salary double,
    constraint pk2 primary key (eid,deptId)
);
insert into emp3 values(1001,'李四',2001,23);
-- eid 和 deptId两个都相同添加不了
-- insert into emp3 values(1001,'李四',2001,23);
-- 只要两个有一个不同即可添加，但是两个任何一个都不能为空
insert into emp3 values(1001,'李四',2002,23);
```

### 修改表结构添加主键

```sql
create table 表名(
   ...
);
alter table <表名> add primary key（字段列表);

create table emp4(
    eid int,
    name varchar(20),
    deptId int,
    salary double
);
-- 添加单列主键
alter table emp4 add primary key(eid);

create table emp5(
    eid int,
    name varchar(20),
    deptId int,
    salary double
);
-- 添加联合主键
alter table emp5 add primary key(name,eid);
```

### 删除主键

修改表结构实现删除主键，删除主键不分单列主键或多列联合主键，删除全删

```sql
alter table <数据表名> drop primary key;

-- 删除单列主键
alter table emp1 drop primary key;
-- 删除多列联合主键
alter table emp5 drop primary key;
```

## 自增长约束

当主键定义为自增长后，这个主键的值就不再需要用户输入数据了，而由数据库系统根据定义自动赋值。每增加一条记录，主键会自动以相同的步长进行增长

> 给字段添加 `auto_increment` 属性来实现主键自增长
>
> + 初始值是 1，每新增一条记录，字段值自动加 1
> + 一个表中只能有一个字段使用 auto_increment约束，且该字段必须有唯一索引，以避免序号重复（即为主键或主键的一部分）
> + 字段必须具备 NOT NULL 属性
> + 字段只能是整数类型(TINYINT、SMALLINT、INT、BIGINT )
> + 增长的最大值为该字段数据类型的最大值

```sql
字段名 数据类型 primary key auto_increment

-- 添加自增站约束
create table t_user1(
    id int primary key auto_increment,
    name varchar(20)
);
-- 从1开始自增长，每次加1
insert into t_user1 values(NULL,'张三');
insert into t_user1(name) values('李四');
```

> **指定自增字段初始值**

```sql
-- 方式一：创建表时指定
create table t_user2(
    id int primary key auto_increment,
    name varchar(20)
)auto_increment=100;

-- 方式二：创建表之后指定
create table t_user3(
    id int primary key auto_increment,
    name varchar(20)
);
-- 通过修改表结构来指定初始值
alter table t_user3 auto_increment = 200;
```

> `delete`** 和 **`truncate`** 在删除后自增列的变化**

+ delete 数据之后自动增长从断点开始
+ truncate 数据之后自动增长从默认起始值开始

```sql
-- delete删除数据之后，自增长还是在最后一个值基础上加1
delete from t_user2;
-- 如最后一个id值为100，则删除重新添加数据之后从101开始
insert into t_user2(name) values('李四');

-- truncate删除之后，自增长从1开始
truncate t_user3;
insert into t_user3(name) values('李四');
```

## 非空约束

使用了非空约束的字段，如果用户在添加数据时没有指定值，数据库系统就会报错

> 添加

```sql
-- 方式一：创建表时指定
字段名 数据类型 not null;
create table t_user6(
    id int,
    name varchar(20) not null,	-- 指定非空约束
    address varchar(20) not null
);
-- insert into t_user6(id) values(1001);	name、address为空报错
-- 控制字符串可以
insert into t_user6(id,name,address) values(1001,'','');
-- 字符串为NULL
insert into t_user6(id,name,address) values(1001,'NULL','NULL');

-- 方式二：创建表之后通过修改表结构指定
alter table 表名 modify 字段 类型 not null;
create table t_user7(
    id int,
    name varchar(20),
    address varchar(20)
);
alter table t_user7 modify name varchar(20) not null;
```

> 删除

```sql
alter table t_user7 modify name varchar(20);
```

## 唯一约束

一个表可以有多个唯一约束，可以包含NULL值

> 添加

```sql
-- 方式一：创建表时指定
<字段名> <数据类型> unique
create table t_user8(
    id int,
    name varchar(20),
    phone_number varchar(20) unique
);
insert into t_user8 values(1001,'张三',138);
-- phone_number不能重复
-- insert into t_user8 values(1001,'张三',138);
-- 在mysql中NULL和任何值都不相同，甚至和自己都不相同
insert into t_user8 values(1002,'张1',NULL);
insert into t_user8 values(1003,'张2',NULL);

-- 方式二：创建表之后通过修改表结构指定
alter table 表名 add constraint 约束名 unique(列);
create table t_user9(
    id int,
    name varchar(20),
    phone_number varchar(20)
);
alter table t_user9 add constraint unique_pn unique(phone_number);
```

> 删除

```sql
alter table <表名> drop index <唯一约束名>;

-- 使用第二种创建的约束删除
alter table t_user9 drop index unique_pn;
-- 使用第一种创建的约束删除，约束名为约束那一列的列名
alter table t_user8 drop index phone_number;
```

## 默认约束

默认值约束用来指定某列的默认值

> 创建

```sql
-- 方式一：创建表时指定
<字段名> <数据类型> default <默认值>;
create table t_user10(
    id INT,
    name varchar(20),
    address varchar(20) default '北京'
);
-- address没给定值，默认为北京
insert into t_user10(id,name) values(1001,'李四');

-- 方式二：创建表之后通过修改表结构指定
alter table 表名 modify 列名 类型 default 默认值;
create table t_user11(
    id INT,
    name varchar(20),
    address varchar(20)
);
alter table t_user11 modify address varchar(20) default '深圳';
insert into t_user11(id,name) values(1001,'李四');
```

> 删除

```sql
alter table <表名> modify column <字段名> <类型> default null;

alter table t_user11 modify address varchar(20) default null;
```

## 零填充约束

插入数据时，当该字段的值的长度小于定义的长度时，会在该值的前面补上相应的0

> 创建

```sql
create table t_user12(
    id int zerofill,
    name varchar(20)
);
insert into t_user12 values(20,'李四');
```

> 删除

```sql
alter table t_user12 modify id int;
```

# 基本查询

```sql
select
  [all | distinct]
  <目标列的表达式1> [别名],
  <目标列的表达式2> [别名]...
from <表名或视图名> [别名],<表名或视图名> [别名]...
[where<条件表达式>]
[group by <列名> 
[having <条件表达式>]]
[order by <列名> [asc|desc]]
[limit <数字或者列表>];

-- 简化版
select *|列名 from 表 where 条件
```

使用

```sql
-- 查询所有商品
select pid,pname,price,category_id from product;
-- *：代表所有列
select * from product;

-- 查询商品名和商品价格
select 列名1,列名2 from product;
select pname,price from product;

-- 别名查询.使用的关键字是as（as可以省略的）
select * from product 别名;
-- 别名在多表查询有作用，表别名
select * from product as p;
select * from product p;

-- 列别名
select pname as 别名,price 别名 from product;
select pname as '商品名',price '商品价格' from product;

-- 去掉重复值
select distinct 列名 from product;
select distinct price from product;
select distinct * from product;

-- 查询结果是表达式（运算查询）：将所有商品的价格+10元进行显示
select pname, price+10 别名 from product;
select pname, price+10 new_price from product;
```

## 运算符

|    算术运算符    |        说明        |
| :--------------: | :----------------: |
|      **+**       |      加法运算      |
|      **-**       |      减法运算      |
|        *         |      乘法运算      |
| **/** 或 **DIV** |  除法运算，返回商  |
| **%** 或 **MOD** | 求余运算，返回余数 |


```sql
-- 将每件商品的价格加10
select pname,price +10 as new_price from product;
-- 将所有商品的价格上调10%
select pname,price *1.1 as new_price from product;
```

|          比较运算符           |                             说明                             |
| :---------------------------: | :----------------------------------------------------------: |
|             **=**             |                             等于                             |
|     **<**  **和**  **<=**     |                        小于和小于等于                        |
|     **>**  **和**  **>=**     |                        大于和大于等于                        |
|            **<=>**            | 完全等于，两个操作码均为NULL时，其所得值为1；而当一个操作码为NULL时，其所得值为0 |
|        **<>** **或!=**        |                            不等于                            |
| **IS NULL** **或** **ISNULL** |                    判断一个值是否为  NULL                    |
|        **IS NOT NULL**        |                   判断一个值是否不为  NULL                   |
|           **least**           |               当有两个或多个参数时，返回最小值               |
|         **greatest**          |               当有两个或多个参数时，返回最大值               |
|        **between and**        |                 判断一个值是否落在两个值之间                 |
|            **in**             |               判断一个值是IN列表中的任意一个值               |
|          **NOT IN**           |              判断一个值不是IN列表中的任意一个值              |
|           **like**            |                          通配符匹配                          |
|          **regexp**           |                        正则表达式匹配                        |


|  **逻辑运算符**   | **说明** |
| :---------------: | :------: |
| **NOT** 或 **!**  |  逻辑非  |
| **AND** 或 **&&** |  逻辑与  |
|   **OR** 或 **    |          |
|      **XOR**      | 逻辑异或 |


| **位运算符** |        **说明**        |
| :----------: | :--------------------: |
|      **      |           **           |
|    **&**     |         按位与         |
|    **^**     |        按位异或        |
|    **<<**    |        按位左移        |
|    **>>**    |        按位右移        |
|    **~**     | 按位取反，反转所有比特 |


```sql
-- 查询商品名称为“海尔洗衣机”的商品所有信息：
select * from product where pname = '海尔洗衣机';

-- 查询价格为800商品
select * from product where price = 800;

-- 查询价格不是800的所有商品
select * from product where price != 800;
select * from product where price <> 800;
select * from product where not (price = 800);

-- 查询商品价格大于60元的所有商品信息
select * from product where price > 60;

-- 查询商品价格在200到1000之间所有商品
select * from product where price between 200 and 1000;
select * from product where price >= 200 and price <= 1000;
select * from product where price >= 200 && price <= 1000;

-- 查询商品价格是200或800的所有商品
select * from product where price in (200,800);
select * from product where price = 200 or price = 800;
select * from product where price = 200 || price = 800;

-- 查询含有‘裤'字的所有商品
-- %：用来匹配任意字符
select * from product where pname like '%裤';

-- 查询以'海'开头的所有商品
select * from product where pname like '海%';

-- 查询第二个字为'蔻'的所有商品
-- _：匹配单个字符
select * from product where pname like '_蔻%';

-- 查询category_id为null的商品
select * from product where category_id is null;

-- 查询category_id不为null分类的商品
select * from product where category_id is not null;

-- 使用least求最小值
select least(10,5,20) as small_number;
-- 如果最小或最大值，有为null，则不会比较，结果直接为null
select least(10,null,20) as small_number; -- null

-- 使用greatest求最大值
select greatest(10,5,20) as small_number;
select least(10,null,20) as small_number; -- null
```

## 排序查询

> 对读取的数据进行排序使用 `order by` 子句来设定你想按哪个字段哪种方式来进行排序，再返回搜索结果
>
> asc代表升序，desc代表降序，如果不写默认升序
>
> 放在查询语句的最后面，LIMIT子句除外

```sql
select 
 字段名1，字段名2，……
from 表名
order by 字段名1 [asc|desc]，字段名2[asc|desc]……

-- 使用价格排序(降序)
select * from product order by price desc;

-- 在价格排序(降序)的基础上，以分类排序(降序)
select * from product order by price desc, category_id desc;

-- 显示商品的价格(去重复)，并排序(降序)
select distinct price from product order by price desc;
```

## 聚合查询

纵向查询，对一列的值进行计算，返回一个单一的值，会忽略空值

| **聚合函数** |                           **作用**                           |
| :----------: | :----------------------------------------------------------: |
| **count()**  |                 统计指定列不为NULL的记录行数                 |
|  **sum()**   | 计算指定列的数值和，如果指定列类型不是数值类型，计算结果为0  |
|  **max()**   | 计算指定列的最大值，如果指定列是字符串类型，那么使用字符串排序运算 |
|  **min()**   | 计算指定列的最小值，如果指定列是字符串类型，那么使用字符串排序运算 |
|  **avg()**   | 计算指定列的平均值，如果指定列类型不是数值类型，那么计算结果为0 |


```sql
-- 查询商品的总条数
select count(pid) from product;
select count(*) from product;

-- 查询价格大于200商品的总条数
select count(pid) from product where price > 200;

-- 查询分类为'c001'的所有商品的总和
select sum(price) from product where category_id = 'c001';

-- 查询商品的最大价格
select max(price) from	product;

-- 查询商品的最小价格
select min(price) from product;

select max(price) max_price,min(price) min_price from product;

-- 查询分类为'c002'所有商品的平均价格
select avg(price) from product where category_id = 'c003';
```

> NULL值的处理

count函数：参数为星号（*），则统计所有记录的个数，参数为某字段，不统计含null值的记录个数

sum和avg函数：忽略null值的存在

max和min函数：忽略null值的存在

## 分组查询

使用`group by`字句对查询信息进行分组

> SELECT子句之后，只能出现分组的字段和统计函数，其他的字段不能出现

```sql
-- 按照分组字段进行分组，每个分组字段相同的变成一张临时表
-- 再按照字段的规则进行查询
select 字段1,字段2… from 表名 group by 分组字段1,... having 分组条件;

--  统计各个分类商品的个数
select category_id,count(pid) from product group by category_id;
```

> 分组之后条件筛选 - `having`

> [!CAUTION]
>
> `where`子句：筛选 FROM 子句中指定的操作所产生的行
>
> `group by`子句：分组 WHERE 子句的输出
>
> `having`子句：从分组的结果中筛选行

```sql
-- 统计各个分类商品的个数，且只显示个数大于4的信息
select category_id,count(pid) from product group by category_id having count(pid) > 4;
```

## 分页查询

由于数据量很大，显示屏长度有限，因此对数据需要采取分页显示方式

例如数据共有30条，每页显示5条，第一页显示1-5条，第二页显示6-10条

```sql
-- 方式1-显示前n条
select 字段1，字段2... from 表明 limit n

-- 方式2-分页显示
select 字段1，字段2... from 表明 limit m,n

-- m: 整数，表示从第几条索引开始，计算方式 ：(当前页-1) * 每页显示条数
-- n: 整数，表示查询多少条数据

-- 查询product表的前5条记录
select * from product limit 5;

-- 从第4条开始显示，显示5条 
select * from product limit 3,5;
```

## 导入表格

将一张表的数据导入到另一张表中，`目标表必须存在`

```sql
-- 将查询出来的表插入前面的表，两个表列需要一致
insert into Table2(field1,field2,…) select value1,value2,… from Table1
-- 全部导入
insert into Table2 select * from Table1

-- 创建表
create table test(
    pname varchar(20),
    price double
);
-- 导入test表格
insert into test(pname,price) select pname,price from product;

create table test1(
    category_id varchar(20),
    product_count int
);
insert into test1 select category_id, count(*) from product group by category_id;
```

## 正则表达式

本身就是一个字符串，用来检索、替换哪些符合某个规则的文本

通过`REGEXP`关键字支持正则表达式进行字符串匹配

|  **模式**  |                           **描述**                           |
| :--------: | :----------------------------------------------------------: |
|   **^**    |                   匹配输入字符串的开始位置                   |
|   **$**    |                   匹配输入字符串的结束位置                   |
|   **.**    |                匹配除 "\n" 之外的任何单个字符                |
| **[...]**  | 字符集合。匹配所包含的任意一个字符。例如：'[abc]' 可以匹配 "plain" 中的 'a' |
| **[^...]** | 负值字符集合。匹配未包含的任意字符。例如：'[^abc]' 可以匹配  "plain" 中的'p' |
|    **p1    |                              p2                              |
|   *****    | 匹配前面的子表达式零次或多次。例如：zo* 能匹配 "z" 以及 "zoo" *等价于{0,} |
|   **+**    | 匹配前面的子表达式一次或多次。例如：'zo+' 能匹配  "zo" 以及  "zoo"，但不能匹配  "z"。+ 等价于  {1,} |
|  **{n}**   | n 是一个非负整数。匹配确定的 n 次。例如：'o{2}' 不能匹配 "Bob" 中的 'o'，但是能匹配 "food" 中的两个 o |
| **{n,m}**  | m 和 n 均为非负整数，其中n  <= m。最少匹配 n 次且最多匹配 m 次 |


```sql
-- ^ 在字符串开头处进行匹配
select 'abc' regexp '^a';  -- 1
select * from product where pname regexp '^海';

-- $ 在字符串末尾开始匹配
select 'abc' regexp 'a$';	-- 0
select 'abc' regexp 'c$';	-- 1
select * from product where pname regexp '水$';

-- . 匹配任意字符(除了换行符)
select 'abc' regexp '.b';	-- 1

-- [...] 括号内任意单个字符是否有与之匹配的
select 'abc' regexp '[xyz]';	-- 0
select 'abc' regexp '[xaz]';	-- 1

-- [^...] 没有出现在括号内任意的字符
-- 注意^符合只有在[]内才是取反的意思，在别的地方都是表示开始处匹配
select 'a' regexp '[^abc]';	-- 0
select 'abc' regexp '[^axz]';	-- 1

-- a* 匹配0个或多个a,包括空字符串。 可以作为占位符使用.有没有指定字符都可以匹配到数据
select 'stab' regexp '.ta*b'; -- 1
select '' regexp 'a*';

-- a+ 匹配1个或者多个a,但是不包括空字符
select 'stab' regexp '.ta+b';	-- 1
select 'stb' regexp '.ta+b';	-- 0

-- a? 匹配0个或者1个a
select 'stb' regexp 'ta?b';	-- 1
select 'staab' regexp 'ta?b'; -- 0

-- a1|a2 匹配a1或者a2
select 'a' regexp 'a|b';	-- 1
select 'c' regexp 'a|b';	-- 0
select 'a' regexp '^(a|b)';	-- 1,以a或b开头的

-- a{m} 匹配m个a(小于等于m个)
select 'abc' regexp 'a{1}b';	-- 1
select 'aaad' regexp 'a{6}d'; -- 0

-- a{m,} 匹配m个或更多个u
select 'auuuuuc' regexp 'au{3,}c';	-- 1
select 'auuc' regexp 'au{3,}c';	-- 0

-- a{m,n} 匹配m到n个a,包含m和n
select 'auuuuc' regexp 'au{2,3}c';	-- 0
select 'auuuc' regexp 'au{2,3}c';	-- 1

-- (abc) abc作为一个序列匹配，不用括号括起来都是用单个字符去匹配，如果要把多个字符作为一个整体去匹配就需要用到括号，所以括号适合上面的所有情况
select 'xababy' regexp 'x(abab)y';	-- 1
select 'xababy' regexp 'x(ab)*y';	-- 1
select 'xababy' regexp 'x(ab){1,2}y';	-- 1
```

# 多表操作

## 多表关系

> 一对多/多对一关系

部门和员工

分析：一个部门有多个员工，一个员工只能对应一个部门

实现原则：在多的一方建立外键，指向一的一方的主键

> 多对多关系

学生和课程

分析：一个学生可以选择很多门课程，一个课程也可以被很多学生选择

原则：多对多关系实现需要借助第三张中间表。中间表至少包含两个字段，将多对多的关系，拆成一对多的关系，中间表至少要有两个外键，这两个外键分别指向原来的那两张表的主键

## 外键约束

经常与主键约束一起使用，对于两个具有关联关系的表而言，相关联字段中主键所在的表就是主表（父表）外键所在的表就是从表（子表）

<img src="https://s2.loli.net/2025/12/28/kiWqYz2xU49NL7J.jpg" style="zoom:50%;" />


+ 外键中列的数据类型必须和主表主键中对应列的数据类型相同
+ 必须给主表定义主键
+ 主表必须已经存在于数据库中，或者是当前正在创建的表

### 添加外键约束

通过 `foreign key` 关键字来指定外键

```sql
-- 创建表时设置外键约束
[constraint 外键名] foreign key (字段名) [，字段名2，…] references 主表名 主键列1 [，主键列2，…]

-- 创建表后设置外键约束
alter table 数据表名 add constraint 外键名 foreign key(列名) references 主表名 (<列名>);
```

```sql
-- 创建部门表
create table if not exists dept(
    deptno varchar(20) primary key, -- 部门号 主键列
    name varchar(20) -- 部门名字
);

-- 在创建表时设置外键约束
-- 员工表
create table if not exists emp(
    eid varchar(20) primary key,	-- 员工编号
    ename varchar(20),	-- 员工名字
    age int,	-- 员工年龄
    dept_id varchar(20),	-- 员工所属部门
    constraint emp_fk foreign key (dept_id) references dept(deptno)	 -- 外键约束
);

-- 员工表
create table if not exists emp1(
    eid varchar(20) primary key,	-- 员工编号
    ename varchar(20),	-- 员工名字
    age int,	-- 员工年龄
    dept_id varchar(20)	-- 员工所属部门
);
-- 创建表后设置外键约束
alter table emp1 add constraint emp_fk1 foreign key(dept_id) references dept(deptno); 
```

### 删除外键约束

```sql
alter table <表名> drop foreign key <外键约束名>;

alter table emp1 drop foreign key emp_fk1;
```

### 外键约束下的数据操作

> 数据插入

```sql
 -- 添加主表数据
 -- 注意必须先给主表添加数据
insert into dept values('1001','研发部');
insert into dept values('1002','销售部');
insert into dept values('1003','财务部');
insert into dept values('1004','人事部');

-- 添加从表数据
-- 注意给从表添加数据时，外键列的值不能随便写，必须依赖主表的主键列
insert into emp values('1','乔峰',20, '1001');
insert into emp values('2','段誉',21, '1001');
insert into emp values('3','虚竹',23, '1001');
insert into emp values('4','阿紫',18, '1002');
insert into emp values('5','扫地僧',35, '1002');
insert into emp values('6','李秋水',33, '1003');
insert into emp values('7','鸠摩智',50, '1003'); 
insert into emp values('8','天山童姥',60, '1005');	 -- 不可以(外键需要添加主键有的)
```

> 删除数据

主表的数据被从表依赖时，不能删除，否则可以删除

从表的数据可以随便删除

```sql
-- 1001部门号被外键绑定，不能删除
delete from dept where deptno = '1001';
-- 1004部门号没有被外键依赖，可以删除
delete from dept where deptno = '1004';
-- 从表数据随便删
delete from emp where eid = '7';
```

### 多对多关系

<img src="https://s2.loli.net/2025/12/28/UbQOFf3X4TapMsR.jpg" style="zoom:50%;" />

修改和删除时，中间从表可以随便删除和修改，但是两边的主表受从表依赖的数据不能删除或者修改

```sql
-- 创建学生表student(左侧主表)
create table if not exists student(
    sid int primary key auto_increment,
    name varchar(20),
    age int,
    gender varchar (20)
);

-- 创建课程表course(右侧主表)
create table course(
    cid int primary key auto_increment,
    cidname varchar(20)
);

-- 创建中间表student_course/score(从表)
create table score(
    sid int,
    cid int,
    score double
);

-- 建立外键约束(2次)
alter table score add foreign key(sid) references student(sid);
alter table score add foreign key(cid) references course(cid);

-- 给学生表添加数据
insert into student values(1,'小龙女',18,'女'),
    (2,'阿紫',19,'女'),
    (3,'周芷若',20,'男');
-- 给课程表添加数据
insert into course values(1,'语文'),(2,'数学'),(3,'英语');
-- 给中间表添加数据
insert into score values(1,1,58),(1,3,50),(2,1,89),(2,2,64),(3,2,25),(3,3,82);
```

## 多表联合查询

### 交叉连接查询(了解)

一张表的每一行去和另外一张表的任意一行进行匹配

假如A表有m行数据，B表有n行数据，则返回m*n行数据

笛卡尔积会产生很多冗余的数据，后期的其他查询可以在该集合的基础上进行条件筛选

```sql
select * from 表1,表2,表3….; 

select * from dept3,emp3;
```

### 内连接查询

> [!NOTE]
>
> 查询求多张表的`交集`，关键字 `inner join` (inner可以省略)

```sql
-- 隐式内连接（SQL92标准）
select * from A,B where 条件;
-- 显示内连接（SQL99标准）
select * from A inner join B on 条件;
```

```sql
-- 查询每个部门的所属员工
-- 隐式内连接
select * from dept3,emp3 where dept3.deptno = emp3.dept_id;
-- 显示内连接
select * from dept3 join emp3 on dept3.deptno = emp3.dept_id;

-- 查询研发部所属员工
-- 隐式内连接
select * from dept3 a,emp3 b where a.deptno = b.dept_id and a.name = '研发部';
-- 显示内连接
select * from dept3 a join emp3 b on a.deptno = b.dept_id and a.name = '研发部';

-- 查询研发部和销售部的所属员工
-- 隐式内连接
select * from dept3 a,emp3 b where a.deptno = b.dept_id and (a.name = '研发部' or a.name = '销售部');
-- 显示内连接
select * from dept3 a join emp3 b on a.deptno = b.dept_id and (a.name = '研发部' or a.name = '销售部');
select * from dept3 a join emp3 b on a.deptno = b.dept_id and a.name in ('研发部' or '销售部');

-- 查询每个部门的员工数,并升序排序
select a.name,a.deptno,count(1) c
from dept3 a
    join emp3 b on a.deptno = b.dept_id
group by
    a.deptno,a.name
order by 
     c desc;

-- 查询人数大于等于3的部门，并按照人数降序排序
select a.deptno,a.name,count(1) as total_cnt
from dept3 a
    join emp3 b on a.deptno = b.dept_id
group by a.deptno,a.name
having total_cnt >= 3
order by total_cnt desc;
```

### 外连接查询

> [!NOTE]
>
> 关键字 `outer join `(`outer`可以省略)
>
> 显示符合连接条件的信息，信息内容是左表还是右边或都显示，看是左连接还是右连接或满连接
>
> `union`操作符用于合并两个或多个`select`语句的结果集，但是每个`select`语句必须选择相同数量的列，列也必须具有相似的数据类型，`union`默认会去除重复的行，如果需要保留重复的行，可以使用`union all`

```sql
-- 左外连接：left outer join
select * from A left outer join B on 条件;
-- 右外连接：right outer join
select * from A right outer join B on 条件;
--  满外连接: full outer join
-- oracle里面有full join,可是在mysql对full join支持的不好，使用union来达到目的
select * from A full outer join B on 条件;
```

```sql
-- 左连接
-- 查询哪些部门有员工，哪些部门没有员工
select * from dept3 a left outer join emp3 b on a.deptno = b.dept_id;
select * from dept3 a left join emp3 b on a.deptno = b.dept_id;

select * from A 
    left join B on 条件1
    left join C on 条件2
    left join D on 条件3;

-- 右连接
-- 查询哪些员工有对应的部门，哪些没有
select * from dept3 a right outer join emp3 b on a.deptno = b.dept_id;
select * from dept3 a right join emp3 b on a.deptno = b.dept_id;

-- 满外连接
-- 使用union关键字实现左外连接和右外连接的并集
-- select * from dept3 a full join emp3 b on a.deptno = b.dept_id;	-- 不能执行
select * from dept3 a left join emp3 b on a.deptno = b.dept_id
union
select * from dept3 a right join emp3 b on a.deptno = b.dept_id;
```

### 基本子查询

`select`的嵌套

> [!IMPORTANT]
>
> 子查询返回的数据类型：
>
> 单行单列：返回的是一个具体列的内容，可以理解为一个单值数据
>
> 单行多列：返回一行数据中多个列的内容
>
> 多行单列：返回多行记录之中同一列的内容，相当于给出了一个操作范围
>
> 多行多列：查询返回的结果是一张临时表

```sql
-- 查询年龄最大的员工信息，显示信息包含员工号、员工名字，员工年龄
-- 1.查询最大年龄
select max(age) from emp3;
-- 2.每一个员工的年龄和最大年龄进行比较，相等则满足条件
select * from emp3 where age = (select max(age) from emp3);	-- 单行单列可以作为一个值来用

-- 查询年研发部和销售部的员工信息，包含员工号、员工名字
-- 内连接查询
select * from emp3 a join dept b 
on a.dept_id = b.deptno 
and (b.name = '研发部' or b.name = '销售部');

-- 子查询
-- 1.先查询研发部和销售部的部门号：deptno 1001 1002
select dept.deptno from dept where dept.name = '研发部' or dept.name = '销售部';
-- 2.查询哪个员工的部门号是1001 或 1002
select a.dept_id,a.ename from emp3  a where a.dept_id 
in (select dept.deptno from dept 
    where dept.name = '研发部' or dept.name = '销售部');	-- 多行单列，多个值

-- 查询研发部20岁以下的员工信息,包括员工号、员工名字，部门名
-- 关联查询
select * from emp3 a join dept b on (b.name = '研发部' and a.age < 20);
-- 子查询
-- 2.1在部门表中查询研发部信息
select * from dept3 where name ='研发部'; -- 一行多列
-- 2.2在员工表中查询年龄小于30岁的员工信息慕容博
select * from emp3 where age < 30;
-- 2.3将以上两个查询的结果进行关联查询
select * 
from (select * from dept3 where name ='研发部') t1 
join (select *from emp3 where age< 30) t2 
on t1.deptno = t2.dept_id;	-- 多行多列
```

#### all关键字

> [!NOTE]
>
> ALL: 与子查询返回的所有值比较为true 则返回true
>
> ALL可以与=、>、>=、<、<=、<>结合是来使用，分别表示等于、大于、大于等于、小于、小于等于、不等于其中的其中的所有数据
>
> ALL表示指定列中的值必须要大于子查询集的每一个值，即必须要大于子查询集的最大值；如果是小于号即小于子查询集的最小值。同理可以推出其它的比较运算符的情况

```sql
select …from …where c > all(查询语句)
-- 等价于：select ...from ... where c > result1 and c > result2 and c > result3

-- 查询年龄大于‘1003’部门所有年龄的员工信息
select * from emp3 where emp3.age > all (select age from emp3 where emp3.dept_id = '1003');

-- 查询不属于任何一个部门的员工信息 
select * from emp3 where emp3.dept_id <> all (select deptno from dept3);
```

#### any和some关键字

> [!NOTE]
>
> ANY：与子查询返回的任意值比较为true 则返回true
>
> ANY可以与=、>、>=、<、<=、<>结合是来使用，分别表示等于、大于、大于等于、小于、小于等于、不等于其中的其中的任何一个数据
>
> 表示制定列中的值要大于子查询中的任意一个值，即必须要大于子查询集中的最小值。同理可以推出其它的比较运算符的情况
>
> SOME和ANY的作用一样，SOME可以理解为ANY的别名

```sql
select … from … where c > any(查询语句)
-- 等价于：select ...from ... where c > result1 or c > result2 or c > result3

-- 查询年龄大于‘1003’部门任意一个员工年龄的员工信息
select * from emp3 where age > any (select age from emp3 
where dept_id = '1003')
and dept_id != '1003';
```

#### in关键字

> [!NOTE]
>
> 用于判断某个记录的值，是否在指定的集合中
>
> 在IN关键字前边加上not可以将条件反过来

```sql
select …from …where c in(查询语句)
-- 等价于：select ...from ... where c = result1 or c = result2 or c = result3

-- 查询研发部和销售部的员工信息，包含员工号、员工名字
select eid,ename from emp3 where dept_id 
in (select deptno from dept3 where name = '研发部' or name = '销售部');
```

#### exists关键字

> [!NOTE]
>
> 该子查询如果“有数据结果”(至少返回一行数据)，则该EXISTS() 的结果为“true”，外层查询执行
>
> 该子查询如果“没有数据结果”（没有任何数据返回），则该EXISTS()的结果为“false”，外层查询不执行
>
> EXISTS后面的子查询不返回任何实际数据，只返回真或假，当返回真时 where条件成立
>
> 注意，EXISTS关键字，比IN关键字的运算效率高，因此，在实际开发中，特别是大数据量时，推荐使用EXISTS关键字

```sql
select …from …where exists(查询语句)

-- 查询公司是否有大于60岁的员工，有则输出
select * from emp3 a where exists (select * from emp3 where a.age > 60);

-- 查询有所属部门的员工信息
select * from emp3 a where exists (select * from dept3 b where a.dept_id = b.deptno);
```

### 自关联查询

> [!NOTE]
>
> 有时在信息查询时需要进行对表自身进行关联查询，即一张表自己和自己关联，一张表当成多张表来用。注意自关联时表必须给表起别名

```sql
select 字段列表 from 表1 a , 表1 b where 条件;
或者 
select 字段列表 from 表1 a [left] join 表1 b on 条件;

-- 1.查询每个三国人物及他的上级信息，如:  关羽  刘备 
select a.ename,b.ename from t_sanguo a, t_sanguo b where a.manager_id = b.eid;
select a.ename,b.ename from t_sanguo a join t_sanguo b on a.manager_id = b.eid;

-- 查询所有任务及上级
select a.ename,b.ename from t_sanguo a left join t_sanguo b on a.manager_id = b.eid;
```

# 函数

## 聚合函数

group_concat()函数，数据的某一列合并成一行

```sql
-- 将所有员工的名字合并成一行(默认;分隔)
select group_concat(emp_name) from emp;

-- 指定分隔符合并 
select group_concat(emp_name separator ';') from emp;

-- 指定排序方式和分隔符
select department,group_concat(emp_name separator ';')
from emp
group by department;

select department,group_concat(emp_name order by salary desc separator ';')
from emp
group by department;
```

## 数学函数

|               **abs(x)**               |                       返回 x 的绝对值                        |
| :------------------------------------: | :----------------------------------------------------------: |
|              **ceil(x)**               |                 返回大于或等于 x 的最小整数                  |
|              **floor(x)**              |                 返回小于或等于 x 的最大整数                  |
| **greatest(expr1, expr2, expr3, ...)** |                      返回列表中的最大值                      |
|  **least(expr1, expr2, expr3, ...)**   |                      返回列表中的最小值                      |
|              **mod(x,y)**              |                   返回 x 除以 y 以后的余数                   |
|                **pi()**                |                    返回圆周率(3.141593）                     |
|              **pow(x,y)**              |                       返回 x 的 y 次方                       |
|               **rand()**               |                     返回 0 到 1 的随机数                     |
|              **round(x)**              |             返回离 x 最近的整数（遵循四舍五入）              |
|             **round(x,y)**             |              返回指定位数的小数（遵循四舍五入）              |
|           **truncate(x,y)**            | 返回数值 x 保留到小数点后 y 位的值（与 ROUND 最大的区别不会四舍五入） |


```sql
-- 求绝对值
select abs (-10);	-- 10

-- 向上取整
select ceil(1.1);	-- 2
select ceil(1.0);	-- 1

-- 向下取整
select floor(1.1);	-- 1
select floor(1.9);	-- 1

-- 取列表最大值
select greatest(1,2,3);	-- 3
```

## 字符串函数

|       **char_length(s)**        |                    返回字符串 s 的字符数                     |
| :-----------------------------: | :----------------------------------------------------------: |
|     **character_length(s)**     |                    返回字符串 s 的字符数                     |
|     **concat(s1,s2...sn)**      |          字符串 s1,s2 等多个字符串合并为一个字符串           |
|   **concat_ws(x,s1,s2...sn)**   |  同 concat 函数，但是每个字符串之间要加上 x，x 可以是分隔符  |
|      **field(s,s1,s2...)**      |      返回第一个字符串 s 在字符串列表(s1,s2...)中的位置       |
|          **ltrim(s)**           |                  去掉字符串 s 开始处的空格                   |
|      **position(s1 IN s)**      |               从字符串 s 中获取 s1 的开始位置                |
|      **replace(s,s1,s2)**       |             字符串 s2 替代字符串 s 中的字符串 s1             |
|         **reverse(s)**          |                    将字符串s的顺序反过来                     |
|         **right(s,n)**          |                  返回字符串 s 的后 n 个字符                  |
|          **rtrim(s)**           |                  去掉字符串 s 结尾处的空格                   |
|        **strcmp(s1,s2)**        | 比较字符串 s1 和 s2，若 s1 与 s2 相等返回 0，若 s1>s2 返回 1，若 s1<s2 返回 -1 |
|        **mid(s,n,len)**         |        从字符串 s 的 n 位置截取长度为 len 的子字符串         |
|  **subste(s, start, length)**   |     从字符串 s 的 start 位置截取长度为 length 的子字符串     |
| **substring(s, start, length)** |     从字符串 s 的 start 位置截取长度为 length 的子字符串     |
|           **trim(s)**           |               去掉字符串 s 开始和结尾处的空格                |
|          **ucase(s)**           |                       字符串转换为大写                       |
|          **upper(s)**           |                       字符串转换为大写                       |
|          **lcase(s)**           |              将字符串 s 的所有字母变成小写字母               |
|          **lower(s)**           |              将字符串 s 的所有字母变成小写字母               |


```sql
-- 获取字符串字符个数
select char_length('hello');	-- 5
select char_length('你好吗');	-- 3

-- length取长度，返回单位是字节
select length('hello');	-- 5
select length('你好吗'); -- 9

-- 指定分隔符进行字符串合并
select concat_ws('-','hello','world');	-- hello-world

-- 返回字符串在列表中第一次出现的位置
select field('bbb','aaa','bbb');	-- 2

-- 去除字符串左边空格
select ltrim('  aaa');

-- 去除字符串右边空格
select rtrim('aaa   ');

-- 去除字符串两边空格
select trim('   aaa   ');

-- 字符串截取
select mid("helloworld",2,3);	-- 第二个字符开始截取，截取长度为3

-- 获取字符串A在字符串中出现的位置
select position('abc' in 'helloabcworld');	-- 6

-- 字符串替换
select replace('helloaaaworld','aaa','bbb');

-- 字符串翻转
select reverse('hello');

-- 返回字符串后几个字符
select right('hello',2);	-- lo

-- 字符串比较
select strcmp('hello','world');	-- -1

-- 字符串截取
select substr('hello',2,3);
select substring('hello',2,3);

-- 小写转大写
select ucase("helloworlD");
select upper("helloworlD");

-- 大写转小写
select lcase("HEllowdord");
select lower("HEllowdord");
```

## 日期函数

|                 **uix_timestamp()**                  |           返回从 1970-01-01 00:00:00 到当前毫秒值            |
| :--------------------------------------------------: | :----------------------------------------------------------: |
|           **unix_timestamp(DATE_STRING)**            |                  将制定日期转为毫秒值时间戳                  |
| **from_unixtime(BIGINT UNIXTIME[,  STRING FORMAT])** |                将毫秒值时间戳转为指定格式日期                |
|                    **curdate()**                     |                         返回当前日期                         |
|                  **current_date()**                  |                         返回当前日期                         |
|                  **current_time()**                  |                         返回当前时间                         |
|                    **curtime()**                     |                         返回当前时间                         |
|               **current_timestamp()**                |                      返回当前日期和时间                      |
|                      **date()**                      |              从日期或日期时间表达式中提取日期值              |
|                 **datediff(d1,d2)**                  |                计算日期 d1->d2 之间相隔的天数                |
|              **timediff(time1, time2)**              |                         计算时间差值                         |
|                 **date_format(d,f)**                 |                  按表达式 f的要求显示日期 d                  |
|         **str_to_date(string, format_mask)**         |                      将字符串转变为日期                      |
|        **date_sub(date, interval expr type)**        |           函数从日期减去指定的时间间隔，expr：数字           |
|     **adddate/date_add(d，interval expr type)**      | 计算起始日期 d 加上一个时间段后的日期，expr：数字   type 值可以是：microsecond(微秒)、second(秒)、minute(分钟)、hour(小时)、day(天)、week(周)、month(月)、quarter(季)、year(年)、DAY_MINUTE day_minute(天和分钟)、day_hour(天和小时)、ear_month(年和月) |
|               **extract(type from d)**               | 从日期 d 中获取指定的值，type指定返回的值   type 可取值为：microsecond(微秒)、second(秒)、minute(分钟)、hour(小时) |
|                   **last_day(d)**                    |              返回给给定日期的那一月份的最后一天              |
|           **makedate(year, day-of-year)**            | 基于给定参数年份 year 和所在年中的天数序号 day-of-year 返回一个日期 |
|                     **year(d)**                      |                           返回年份                           |
|                     **MONTH(d)**                     |                 返回日期d中的月份值，1 到 12                 |
|                      **day(d)**                      |                   返回日期值 d 的日期部分                    |
|                     **hour(t)**                      |                      返回 t 中的小时值                       |
|                    **minute(t)**                     |                      返回 t 中的分钟值                       |
|                    **second(t)**                     |                      返回 t 中的秒钟值                       |
|                    **quarter(d)**                    |               返回日期d是第几季节，返回 1 到 4               |
|                   **monthname(d)**                   |             返回日期当中的月份名称，如 November              |
|                     **month(d)**                     |                 返回日期d中的月份值，1 到 12                 |
|                    **dayname(d)**                    |            返回日期 d 是星期几，如 Monday,Tuesday            |
|                  **dayofmonth(d)**                   |                  计算日期 d 是本月的第几天                   |
|                   **dayofweek(d)**                   |      日期 d 今天是星期几，1 星期日，2 星期一，以此类推       |
|                   **dayofyear(d)**                   |                  计算日期 d 是本年的第几天                   |
|                     **week(d)**                      |        计算日期 d 是本年的第几个星期，范围是 0 到 53         |
|                    **weekday(d)**                    |         日期 d 是星期几，0 表示星期一，1 表示星期二          |
|                  **weekofyear(d)**                   |        计算日期 d 是本年的第几个星期，范围是 0 到 53         |
|               **yearweek(date, mode)**               | 返回年份及第几周（0到53）mode 中 0 表示周天，1表示周一，以此类推 |
|                      **now()**                       |                      返回当前日期和时间                      |


```sql
-- 日期函数
-- 1:获取时间戳 （毫秒值）
select unix_timestamp();

-- 2:将一个日期字符串转为毫秒值
select unix_timestamp('2021-12-21 08:08:08');

-- 3：将时间戳毫秒值转为指定格式的日期
select from_unixtime(1640045288,'%Y-%m-%d %H:%i:%s');

-- 4：获取当前的年月日
select curdate();
select current_date();

-- 5：获取当前的时分秒
SELECT CURRENT_TIME();
SELECT CURTIME();

-- 6：获取年月日和时分秒
SELECT CURRENT_TIMESTAMP();

-- 从日期字符串中获取年月日
select date('2022-12-12 12:34:56');

-- 8:获取日期之间的差值
select datediff('2021-12-23','2008-08-08');

-- 9：获取时间的差值（秒级）
select timediff('12:12:34','10:18:56'); -- 01:53:38

-- 10:日期格式化
select date_format('2021-1-1 1:1:1','%Y-%m-%d %H:%i:%s');
select date_format('2021-12-13 11:11:11','%Y-%m-%d %H:%i:%s');

-- 11:将字符串转为日期
select str_to_date('2021-12-13 11:11:11','%Y-%m-%d %H:%i:%s');

-- 12：将日期进行减法  日期向前跳转
select date_sub('2021-10-01',interval 2 day);
select date_sub('2021-10-01',interval 2 month);

-- 13：将日期进行加法  日期向后跳转
select date_add('2021-10-01',interval 2 day);
select date_add('2021-10-01',interval 2 month);

-- 14：从日期中获取小时
select extract(hour from'2021-12-13 11:12:13');
select extract(year from '2021-12-13 11:12:13');

-- 15：获取给定日期所在月的最后一天
select last_day('2021-08-13');

-- 16：获取指定年份和天数的日期
select makedate('2021',53);

-- 17:根据日期获取年月日，时分秒
select year('2021-12-13 11:12:13');
select minute('2021-12-13 11:12:13');
select quarter('2021-12-13 11:12:13');	-- 获取季度

-- 18:根据日期获取信息
SELECT MONTHNAME('2021-12-13 11:12:13');	-- 获取月份的英文
SELECT DAYNAME('2021-12-13 11:12:13');	-- 获取周几：Monday
SELECT DAYOFMONTH('2021-12-13 11:12:13');	-- 当月的第几天
SELECT DAYOFWEEK('2021-12-13 11:12:13');	-- 1:周日 2:周一
SELECT DAYOFYEAR('2021-12-13 11:12:13');	-- 获取一年的第几天
```

## 控制流函数

> **if逻辑判断语句**

|                      **if(expr,v1,v2)**                      |     如果表达式 expr 成立，返回结果 v1 否则，返回结果 v2      |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| [ifnull(v1,v2)](https://www.runoob.com/mysql/mysql-func-ifnull.html) |        如果 v1 的值不为 NULL，则返回 v1，否则返回 v2         |
|                    **isnull(expression)**                    |                    判断表达式是否为 NULL                     |
|                   **nullif(expr1, expr2)**                   | 比较两个字符串，如果字符串 expr1 与 expr2 相等 返回 NULL，否则返回 expr1 |


```sql
-- 成绩大于85则优秀反之及格
select *,if(score >=85,'优秀','及格') falg from score;

-- comm为空则显示0
select*,ifnull(comm,0)comm_flagfromemp

selectisnull(5);	-- 0
selectisnull(NULL); -- 1

select nullif(12,12);	-- null
select nullif(12,13);	-- 12
```

> **ucase when语句**

| **CASE expression**   **WHEN condition1 THEN  result1**   **WHEN condition2 THEN  result2**   **...**      **WHEN conditionN THEN resultN**   **ELSE result**   **END** | CASE 表示函数开始，END 表示函数结束。如果 condition1 成立，则返回 result1，如果 condition2 成立，则返回 result2，当全部不成立则返回 result，而当有一个成立之后，后面的就不执行了 |
| :----------------------------------------------------------: | :----------------------------------------------------------: |


```sql
select
    case 5
        when 1 then '1'
        when 2 then '2'
        when 5 then '3'
        else
            '4'
    end as info;

-- 方式1
select *  ,
case 
    when payType=1 then '微信支付' 
    when payType=2 then '支付宝支付' 
    when payType=3 then '银行卡支付' 
    else '其他支付方式' 
end  as payTypeStr
from orders;

-- 方式2
select *  ,
case payType
    when 1 then '微信支付'
    when 2 then '支付宝支付'
    when 3 then '银行卡支付'
    else '其他支付方式' 
end  as payTypeStr
from orders;
```

# 窗口函数

```sql
window_function ( expr ) over ( 
    PARTITION BY ... 
    ORDER BY ... 
    frame_clause 
)
```

+ 分区（PARTITION BY）
    - PARTITION BY 选项用于将数据行拆分成多个分区（组）它的作用类似于GROUP BY分组。如果省略了 PARTITION BY，所有的数据作为一个组进行计算
+ 排序（ORDER BY）
    - OVER 子句中的 ORDER BY 选项用于指定**分区内**的排序方式，与 ORDER BY 子句的作用类似
+ 以及窗口大小（frame_clause）
    - frame_clause 选项用于在**当前分区**内指定一个计算窗口，也就是一个与当前行相关的数据子集

## 序号函数

序号函数有三个：row_number()、rank()、dense_rank()，可以用来实现分组排序，并添加序号

这三个功能相同但排序的序号方式不同

```sql
row_number() | rank() | dense_rank() over ( 
  partition by ... 
  order by ... 
) 

-- 对每个部门的员工按照薪资降序排序，并给出排名
select
    dname,
    ename,
    salary,
    row_number() over(partition by dname order by salary desc) as rn1,
    rank() over(partition by dname order by salary desc) as rn2,
    dense_rank() over(partition by dname order by salary desc) as rn3
from employee;

--求出每个部门薪资排在前三名的员工- 分组求TOPN
select 
* 
from 
(
    select 
        dname,
        ename,
        salary,
        dense_rank() over(partition by dname order by salary desc)  as rn
    from employee
)t
where t.rn <= 3

-- 对所有员工进行全局排序（不分组）
-- 不加partition by表示全局排序
select 
     dname,
     ename,
     salary,
     dense_rank() over( order by salary desc)  as rn
from employee;
```

## 开窗聚合函数

> sum()、avg()、max()、min()、count()

```sql
select
    dname,
    ename,
    salary,
    sum(salary) over(partition by dname order by hiredate) as pvl
from employee;

-- 如果没有order by排序语句默认把分组内的所有
select dname,ename,hiredate,salary,
sum(salary) over(partition by dname) as c1
-- sum(salary) over(partition by dname order by hiredate rows between unbounded preceding and current row) as c1
from employee;

-- 向前三行及本身及向后一行数据相加
select  
    dname,
    ename,
    salary,
    sum(salary) over(partition by dname order by hiredate   rows between 3 preceding and 1 following) as c1 
from employee;

-- 当前行(包括本身)加到最后一行
select  
    dname,
    ename,
    salary,
    sum(salary) over(partition by dname order by hiredate   rows between current row and unbounded following) as c1 
from employee;
```

## 分布函数

> cume_dist：分组内小于、等于当前值的行数 / 分组内总行数
>
> 应用场景：查询小于等于当前薪资（salary）的比例

```sql
select 
    dname,ename,salary,
    cume_dist() over(order by salary)as rn1,
    cume_dist() over(partition by dname order by salary)as rn2
from employee;
```

> percent_rank：(rank-1) / (rows-1)进行计算，rank为RANK()函数产生的(不常用)

```sql
select dname,ename,salary,
    rank() over(partition by dname order by salary desc) as rn,
    percent_rank() over(partition by dname order by salary desc)as rn2
from employee;
```

## 前后函数

> cume_dist：返回位于当前行的 `前n行`(lag(expr,n)）或 `后n行`（lead(expr,n)）的expr的值
>
> 应用场景：查询前1名同学的成绩和当前同学成绩的差值

```sql
-- lag的用法
select 
    dname, ename, hiredate, salary,
    lag(hiredate,1,'2000-01-01') over(partition by dname order by hiredate) as last_1_time,
    lag(hiredate,2) over(partition by dname order by hiredate) as last_2_time 
from employee;

-- lead的用法
select 
    dname, ename, hiredate, salary,
    lead(hiredate,1,'2000-01-01') over(partition by dname order by hiredate) as last_1_time,
    lead(hiredate,2) over(partition by dname order by hiredate) as last_2_time 
from employee;
```

## 头尾函数

> 返回第一个（first_value(expr)）或最后一个（last_value(expr)）expr的值
>
> 应用场景：截止到当前，按照日期排序查询第1个入职和最后1个入职员工的薪资

```sql
-- 注意,  如果不指定ORDER BY，则进行排序混乱，会出现错误的结果
select
    dname, ename, hiredate, salary,
    first_value(salary) over(partition by dname order by hiredate) as first,
    last_value(salary) over(partition by dname order by  hiredate) as last 
from  employee;
```

## 其他函数

> nth_value(expr,n)
>
> 返回窗口中第n个expr的值。expr可以是表达式，也可以是列名
>
> 应用场景：截止到当前薪资，显示每个员工的薪资中排名第2或者第3的薪资

```sql
-- 查询每个部门截止目前薪资排在第二和第三的员工信息
select 
    dname, ename, hiredate, salary,
    nth_value(salary,2) over(partition by dname order by hiredate) as second_score,
    nth_value(salary,3) over(partition by dname order by hiredate) as third_score
from employee
```

> ntile(n)
>
> 将分区中的有序数据分为n个等级，记录等级数
>
> 应用场景：将每个部门员工按照入职日期分成3组

```sql
-- 根据入职日期将每个部门的员工分成3组
select 
    dname, ename, hiredate, salary,
    ntile(3) over(partition by dname order by  hiredate  ) as rn 
from employee;
```

