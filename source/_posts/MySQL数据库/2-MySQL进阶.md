---
title: 2.MySQL进阶
author: 星仔极客
top: false
toc: ture
mathjax: false
date: 2025-09-14 23:30:32
img:
coverImg:
cover: https://s2.loli.net/2025/12/28/Uqn7Gf6MEAv9JXS.webp
password:
categories: MySQL数据库
tags: MySQL数据库
---

# 视图

一个虚拟表，非真实存在，其本质是根据SQL语句获取动态的数据集，并为其命名，用户使用时只需使用视图名称即可获取结果集，并可以将其当作表来使用

数据库中只存放了视图的定义，而并没有存放视图中的数据。这些数据存放在原来的表中，表中的数据发生改变，显示在视图中的数据也会发生改变

作用：

+ 把重复使用的查询封装成视图重复使用，同时可以使复杂的查询易于理解和使用
+ 安全原因，如果一张表中有很多数据，很多信息不希望让所有人看到，此时可以使用视图视

## 创建视图

```sql
create [or replace] [algorithm = {undefined | merge | temptable}]
view view_name [(column_list)]
as select_statement
[with [cascaded | local] check option]

/*参数说明：
    algorithm：可选项，表示视图选择的算法
    view_name ：表示要创建的视图名称
    column_list：可选项，指定视图中各个属性的名词，默认情况下与SELECT语句中的查询的属性相同
    select_statement：表示一个完整的查询语句，将查询记录导入视图中
    [with [cascaded | local] check option]：可选项，表示更新视图时要保证在该视图的权限范围之内	*/
```

```sql
-- 创建视图
create or replace view view1_emp
as
select ename,job from emp;

-- 查看表和视图
show full tables;

-- 使用视图
select * from view1_emp;
```

## 修改视图

```sql
alter view 视图名 as select语句;

alter view view1_emp
as
select a.deptno,a.dname,a.loc,b.ename,b.sal
from dept a,emp b where a.deptno = b.deptno;
```

## 更新视图

在update(修改)、delete(删除) 或 insert(插入) 等语句中更新视图(实际修改是原表的数据)

视图中虽然可以更新数据，但是有很多的限制。一般情况下，最好将视图作为查询数据的虚拟表，而不要通过视图更新数据。因为，使用视图更新数据时，如果没有全面考虑在视图中更新数据的限制，就可能会造成数据更新失败

不可更新的情况：

+ 聚合函数（sum(), min(), max(), count()等）
+ distinct
+ group by
+ having
+ union或union all
+ 位于选择列表中的子查询
+ join
+ FROM子句中的不可更新视图
+ where子句中的子查询，引用from子句中的表。
+ 仅引用文字值（在该情况下，没有要更新的基本表）

```sql
update view1_emp set ename = '周瑜' where ename = '刘备';

-- 由于原表还有其它列，但视图没法看到添加只有两列其它列没添加，则添加不成功
insert into view1_emp values('孙权','文员');
```

## 重命名视图

```sql
-- rename table 视图名 to 新视图名; 
rename table view1_emp to my_view1
```

## 删除视图

删除视图时，只能删除视图的定义，不会删除数据

```sql
-- drop view 视图名[,视图名…];
drop view if exists view_student;
```

# 存储过程

SQL 语言层面的代码封装与重用，可以实现一些比较复杂的逻辑功能，类似于JAVA语言中的方法

```sql
delimiter 自定义结束符号
create procedure 储存名([ in ,out ,inout ] 参数名 数据类形...)
begin
  sql语句
end 自定义的结束符合
delimiter ;

-- 自定义结束符
delimiter $$
-- 创建
create procedure proc01()
begin
 select empno,ename from emp;
end $$
delimiter ;

-- 调用
call proc01;
```

## 变量定义

### 局部变量

用户自定义，在 begin/end 块中有效

```sql
-- 语法(声明变量)： 
declare 变量名 变量类型及范围 [default var_value]; 

delimiter $$
create procedure proc02()
begin
    declare var_name01 varchar(20) default 'aaa';	-- 定义局部变量
    set var_name01 = '张三';	-- 给变量赋值
    select var_name01;	-- 输出变量的值
end $$
delimiter ;
-- 调用存储过程
call proc02();

delimiter $$
create procedure proc02()
begin
    -- 定义局部变量
    declare var_name01 decimal(7,2);	-- 长度7，小数2
    set var_name01 = 12.2;	-- 给变量赋值
    select var_name01;	-- 输出变量的值
end $$
delimiter ;

call proc02();
```

还可以使用 **SELECT..INTO** 语句为变量赋值

当将查询结果赋值给变量时，返回结果只能是单行单列

```sql
select col_name [...] into var_name[,...] 
from table_name wehre condition 

/*
col_name：查询字段名称
var_name：变量名称
table_name：表的名称
condition：查询条件	*/

delimiter $$
create procedure proc03()
begin
    declare my_ename varchar(20);
    -- 从emp表中查询empno为1001的ename赋值给变量my_ename
    select ename into my_ename from emp where empno=1001;
    -- 输出变量的值
    select my_ename;
end $$
delimiter ;
-- 调用存储过程
call proc03();
```

### 用户变量

用户自定义，当前会话(连接)有效

```sql
-- 语法(不需要提前声明，使用即声明)： 
@var_name

delimiter $$
create procedure proc04()
begin
    set @var_name01 = 'ZS';
    select @var_name01;
end $$
delimiter ;
call proc04();

-- 外部也可以访问用户变量
select @var_name01;
```

### 系统变量

对全局变量的修改会影响到整个服务器，但是对会话变量的修改，只会影响到当前的会话（也就是当前的数据库连接）

#### 全局变量

由服务器自动将它们初始化为默认值，可以通过更改 `my.ini` 这个文件来更改

```sql
-- 语法：
@@global.var_name

-- 查看全局变量
show global variables;

-- 查看某全局变量
select @@global.auto_increment_increment;

-- 修改全局变量的值
set global sort_buffer_size = 40000;
set @@global.sort_buffer_size = 33000;
```

#### 会话变量

每次建立一个新的连接的时候，MYSQL会将当前所有全局变量的值复制一份，来做为会话变量

```sql
-- 语法：
@@session.var_name

-- 查看会话变量
show session variables;

-- 查看某会话变量 
select @@session.auto_increment_increment;

-- 修改会话变量的值
set session sort_buffer_size = 50000; 
set @@session.sort_buffer_size = 50000 ;
```

## 参数传递

### in

传入的参数

```sql
-- 传入员工编号，查找员工信息
delimiter $$
create procedure proc06(in empno01 int)
begin
    select * from emp where empno = empno01;
end $$
delimiter ;

call proc06(1001);

-- 封装有参数的存储过程，可以通过传入部门名和薪资，查询指定部门，并且薪资大于指定值的员工信息
delimiter $$
create procedure dec_param0x(in dname varchar(50), in sal decimal(7,2))
begin
        select * from dept a, emp b where b.sal > sal and a.dname = dname;
end $$
delimiter ;

call dec_param0x('学工部',20000);
```

### out

从存储过程内部传值给调用者

```sql
delimiter $$
create procedure proc08(in in_empno int, out out_ename varchar(50))
begin
    -- 查询emp表中empno与传进来的参数in_empno一致的ename并且赋值给out_ename返回
    select ename into out_ename from emp where empno = in_empno;
end $$
delimiter ;

call proc08(1001,@o_ename);
select @o_ename;

-- 封装有参数的存储过程，传入员工编号，返回员工名字和薪资
delimiter $$
create procedure proc09(in empno int , out out_ename varchar(50) , out out_sal decimal(7,2))
begin
  select ename,sal into out_ename,out_sal from emp where emp.empno = empno;
end $$
delimiter ;
 
call proc09(1001, @o_dname,@o_sal);
select @o_dname;
select @o_sal;
```

### inout

从外部传入的参数经过修改后返回的变量

```sql
delimiter $$
create procedure proc10(inout num int)
begin
    set num = num * 10;
end $$
delimiter ;

set @inout_num = 3;
call proc10(@inout_num);
select @inout_num;

-- 传入员工名，拼接部门号，传入薪资，求出年薪
delimiter $$
create procedure proc10(inout inout_ename varchar(50), inout inout_sal int)
begin
  select  concat(deptno,"_",inout_ename) into inout_ename from emp where ename = inout_ename;
  set inout_sal = inout_sal * 12;
end $$
delimiter ;

set @inout_ename = '关羽';
set @inout_sal = 3000;
call proc10(@inout_ename, @inout_sal) ;
select @inout_ename ;
select @inout_sal ;
```

## 流程控制

### 分支语句

#### if

```sql
-- 语法
if search_condition_1 then statement_list_1
    [elseif search_condition_2 then statement_list_2] ...
    [else statement_list_n]
end if

-- 输入学生的成绩，来判断成绩的级别：
delimiter $$
create procedure proc_12_if(in score int)
begin
    if score < 60
        then
            select '不及格';
    elseif score < 80
        then
            select '及格';
    elseif score >= 80 and score < 90
        then
            select '良好';
    elseif score >= 90 and socre <= 100
        then
            select '优秀';
    end if;
end $$
delimiter ;

call proc_12_if(88);

-- 输入员工的名字，判断工资的情况。
delimiter $$
create procedure proc12_if(in in_ename varchar(50))
begin
    declare result varchar(20);
    declare var_sal decimal(7,2);
        select sal into  var_sal from emp where ename = in_ename;
    if var_sal < 10000 
        then set result = '试用薪资';
    elseif var_sal < 30000
        then set result = '转正薪资';
    else 
        set result = '元老薪资';
    end if;
    select result;
end$$
delimiter ;
call proc12_if('庞统');
```

#### case

```sql
-- 语法一（类比java的switch）：
case case_value
    when when_value then statement_list
    [when when_value then statement_list] ...
    [else statement_list]
end case

-- 语法二：
case
    when search_condition then statement_list
    [when search_condition then statement_list] ...
    [else statement_list]
end case
```

```sql
delimiter $$
create procedure pro14_case(in pay_type int)
begin
    case pay_type
        when 1 then select '微信支付';
        when 2 then select '支付宝支付';
        when 3 then select '银行卡支付';
        else select '其它支付';
    end case;
end $$
delimiter ;

call pro14_case(2);

-- 语法二
delimiter  $$
create procedure proc_15_case(in score int)
begin
    case
        when score < 60 
        then
            select '不及格';
        when  score < 80
        then
            select '及格' ;
        when score >= 80 and score < 90
        then 
            select '良好';
        when score >= 90 and score <= 100
        then
            select '优秀';
        else
            select '成绩错误';
    end case;
end $$
delimiter ;

call proc_15_case(88);
```

### 循环语句

leave：类似于 break，跳出，结束当前所在的循环

iterate：类似于 continue，继续，结束本次循环，继续下一次

#### while

```sql
【标签:】while 循环条件 do
    循环体;
end while【标签】;

delimiter $$
create procedure proc16_while(in insertCount int)
begin
    declare i int default 1;
    while i <= insertCount do
        insert into user(uid,username,password) values(i,concat('user-',i),'123456');
        set i = i +1;
    end while;
end $$
delimiter ;

call proc16_while(10);
```

leave：跳出整个循环

```sql
-- 只插入前五条数据
delimiter $$
create procedure proc17_leave(in insertCount int)
begin
    declare i int default 1;
    label:while i <= insertCount do
        insert into user(uid,username,password) values(i,concat('user-',i),'123456');
        if i = 5 then
            leave label;
        end if;
        set i = i +1;
    end while label;
end $$
delimiter ;

call proc17_leave(10);
```

iterate：跳出本次循环

```sql
delimiter $$
create procedure proc18_iterate(in insertCount int)
begin
    declare i int default 0;
    label:while i < insertCount do
        set i = i +1;
        if i = 5 then
            iterate label;
        end if;
        insert into user(uid,username,password) values(i,concat('user-',i),'123456');
    end while label;
end $$
delimiter ;

call proc18_iterate(10);
```

#### repeat

```sql
-- 条件表达式为真时跳出循环
[标签:]repeat 
 循环体;
until 条件表达式
end repeat [标签];

delimiter $$
create procedure proc18_repeat(in insertCount int)
begin
    declare i int default 1;
    repeat
        insert into user(uid,username,password) values(i,concat('user-',i),'123456');
        set i = i +1;
        until i > insertCount
    end repeat;
end $$
delimiter ;

call proc18_repeat(10);
```

#### loop

```sql
标签: loop
  循环体;
  if 条件表达式 then 
     leave 标签; 
  end if;
end loop;

delimiter $$
create procedure proc19_loop(in insertCount int)
begin
    declare i int default 1;
    label: loop
        insert into user(uid,username,`password`) values(i,concat('user-',i),'123456');
        set i = i+1;
        if i > insertCount
            then
                leave label;
        end if;
    end loop label;
end $$
delimiter ;

call proc19_loop(20);
```

## 游标

用来存储查询结果集的数据类型, 在存储过程和函数中可以使用光标对结果集进行循环的处理

```sql
-- 声明语法
declare 游标名 cursor for 结果集;

-- 打开语法
open 游标名;

-- 取值语法，需要定义变量来保存结果集每一列
fetch 游标名 into 变量名 [, 变量名1] ...;

-- 关闭语法
close 游标名;
```

```sql
delimiter $$
create procedure proc19_cursor(in in_dname varchar(50))
begin
    -- 定义局部变量
    declare var_empno int;
    declare var_ename varchar(50);
    declare var_sal decimal(7,2);

    -- 声明游标
    declare my_cursor cursor for
        select empno,ename,sal
        from dept a,emp b
        where a.deptno = b.deptno and a.dname = in_dname;
    -- 打开语法
    open my_cursor;
    -- 取值语法
    label: loop
        fetch my_cursor into var_empno, var_ename, var_sal;
        select var_empno, var_ename, var_sal;
    end loop label;	-- 后续需要用句柄来结束循环
    -- 关闭语法
    close my_cursor;
end $$;
delimiter ;

call proc19_cursor('销售部');
```

## 异常处理

存储过程提供了对异常处理的功能：通过定义HANDLER来完成异常声明的实现

在语法中，变量声明、游标声明、handler声明是必须按照先后顺序书写的，否则创建存储过程出错 

```sql
declare handler_action handler
    FOR condition_value [, condition_value] ...
    statement

/* handler_action：CONTINUE(继续向下执行)、 EXIT(退出程序)、UNDO
condition_value：
    mysql_error_code(错误码)
    condition_name(错误条件的名称)
    SQLWARNING(警告条件)
    NOT FOUND(没有找到数据)
    SQLEXCEPTION(异常条件)
statement：异常触发之后执行什么
*/
```

```sql
use mysql7_procedure;
drop procedure if exists proc21_cursor_handler;
-- 需求：输入一个部门名，查询该部门员工的编号、名字、薪资 ，将查询的结果集添加游标
delimiter $$
create procedure proc20_cursor(in in_dname varchar(50))
begin
  -- 定义局部变量
    declare var_empno int;
    declare var_ename varchar(50);
    declare var_sal decimal(7,2);

    declare flag int default 1; -- ---------------------

    -- 声明游标
    declare my_cursor cursor for
        select empno,ename,sal
        from dept a, emp b
        where a.deptno = b.deptno and a.dname = in_dname;

    -- 定义句柄，当数据未发现时将标记位设置为0
    declare continue handler for not found set flag = 0;   
    -- 打开游标
    open my_cursor;
    -- 通过游标获取值
    label:loop
        fetch my_cursor into var_empno, var_ename,var_sal;
        -- 判断标志位
        if flag = 1 then
            select var_empno, var_ename,var_sal;
        else
            leave label;
        end if;
    end loop label;

    -- 关闭游标
    close my_cursor;
end $$;

delimiter ;
call proc21_cursor_handler('销售部');
```

综合：每天一张表，存当天的统计数据，就要求提前生产这些表——每月月底创建下一个月每天的表

```sql
-- 使用数据库mysql7_procedure
use mysql7_procedure;

-- 如果存在同名的存储过程，则删除它
drop procedure if exists proc22_demo;

-- 更改默认的语句结束符，以便在存储过程中可以使用分号
delimiter $$

-- 创建存储过程proc22_demo
create procedure proc22_demo()
begin
  -- 声明整型变量用于存储年份、月份和月份中的天数
  declare next_year int;
  declare next_month int;
  declare next_month_day int;
  
  -- 声明字符型变量用于存储格式化的月份和天数
  declare next_month_str char(2);
  declare next_month_day_str char(2);
  
  -- 声明字符型变量用于存储表名
  declare table_name_str char(10);
  
  -- 声明整型变量作为循环索引，并初始化为1
  declare t_index int default 1;

  -- 获取下个月的年份
  set next_year = year(date_add(now(), INTERVAL 1 month));

  -- 获取下个月是几月
  set next_month = month(date_add(now(), INTERVAL 1 month));

  -- 获取下个月最后一天是几号
  set next_month_day = dayofmonth(LAST_DAY(date_add(now(), INTERVAL 1 month)));

  -- 如果月份小于10，则在前面补零
  if next_month < 10 then
    set next_month_str = concat('0', next_month);
  else
    set next_month_str = concat('', next_month);
  end if;

  -- 循环直到下个月的最后一天
  while t_index <= next_month_day do
    -- 如果天数小于10，则在前面补零
    if t_index < 10 then
      set next_month_day_str = concat('0', t_index);
    else
      set next_month_day_str = concat('', t_index);
    end if;

    -- 构建表名，格式为：user_YYYY_MM_DD
    set table_name_str = concat(next_year, '_', next_month_str, '_', next_month_day_str);

    -- 拼接创建表的SQL语句
    set @create_table_sql = concat(
      'create table user_',
      table_name_str,
      '(`uid` INT, `ename` varchar(50), `information` varchar(50)) COLLATE=\'utf8_general_ci\' ENGINE=InnoDB'
    );

    -- 准备并执行动态SQL语句
    prepare create_table_stmt FROM @create_table_sql;
    execute create_table_stmt;
    -- 释放预编译语句
    DEALLOCATE prepare create_table_stmt;

    -- 更新循环索引
    set t_index = t_index + 1;
  end while;
end $$
-- 将语句结束符改回分号
delimiter ;

-- 调用存储过程proc22_demo
call proc22_demo();
```

# 存储函数(自定义函数)

一般用于计算和返回一个值，可以将经常需要使用的计算或功能写成一个函数

```sql
create function func_name ([param_name type[,...]])
returns type
[characteristic ...] 
begin
    routine_body
end;

/*
参数说明：
    func_name ：存储函数的名称
    param_name type：可选项，指定存储函数的参数
    type参数用于指定存储函数的参数类型，该类型可以是MySQL数据库中所有支持的类型
    RETURNS type：指定返回值的类型
    characteristic：可选项，指定存储函数的特性
    routine_body：SQL代码内容	*/
```

```sql
-- 允许创建函数权限
set global log_bin_trust_function_creators = true;
-- 创建存储函数-没有输输入参数
delimiter $$
create function myfunc1_emp() returns int
begin
    -- 定义局部变量
    declare cnt int default 0;
    select count(*) into cnt from emp;
    return cnt;
end $$
delimiter ;

-- 调用存储函数
select myfunc1_emp();

-- 创建存储过程-有输入参数
-- 传入一个员工编号，返回员工名字
delimiter $$
create function myfun2_emp(in_empno int) returns varchar(50)
begin
    declare out_ename varchar(50);
    select ename into out_ename from emp where empno = in_empno;
    return out_ename;
end $$
delimiter ;

-- 调用存储函数
select myfun2_emp(1008);
```

# 触发器

# 索引

# 事务
