在Bash脚本中，for循环是一种常见的控制结构，用于遍历一系列的值。下面是一个for循环的基本结构和一些常见的用法示例。

基本结构：

```bash
for VAR in ITEM1 ITEM2 ITEM3
do
    COMMAND1
    COMMAND2
    COMMAND3
done
```

其中，VAR是循环中使用的变量，ITEM1 ITEM2 ITEM3是需要遍历的值列表。do和done之间的命令会对每个迭代的VAR进行处理。

示例1：遍历数字范围

```bash
for i in {1..5}
do
   echo "Welcome $i times"
done
```

示例2：遍历字符串列表

```bash
for fruit in "apple" "banana" "cherry"
do
   echo "I like $fruit"
done
```

示例3：遍历文件列表

```bash
for file in /path/to/directory/*
do
   echo "Processing $file"
done
```

示例4：使用C风格的语法遍历序列

```bash
for (( i=0; i<5; i++ ))
do
   echo "Count is $i"
done
```

示例5：读取文件的每一行

```bash
for line in $(cat file.txt)
do
   echo "Line: $line"
done
```

注意：在处理文件的每一行时，如果文件中的行包含空格，则最好使用while read line结构而不是for循环，因为for循环会将空格作为字段分隔符，从而可能会拆分包含空格的行。
