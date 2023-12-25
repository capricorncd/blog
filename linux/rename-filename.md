# Linux/Mac Shell 批量重命名

将`独步逍遥.EP04.HD1080p.mp4`重命名为`004.mp4`

```shell
# 获取执行权限 ./*.sh
# chmod 777 *.sh
for file in *.mp4; do
  newname=$(echo "$file" | awk -F '[^0-9]+' '{print $2}')
  # newname=$(printf "%03d" $newname)
  newname=$(printf "%03s" $newname)
  # echo "$newname.mp4"
  mv "$file" "$newname.mp4"
done
```

1、删除所有的 `.bak` 后缀：
```shell
rename 's/\.bak$//' *.bak
```

2、把 `.jpe` 文件后缀修改为 `.jpg`：
```shell
rename 's/\.jpe$/\.jpg/' *.jpe
```

3、把所有文件的文件名改为小写：
```shell
rename 'y/A-Z/a-z/' *
```

4、将 `abcd.jpg` 重命名为 `abcd_efg.jpg`：
```shell
for var in *.jpg; do mv "$var" "${var%.jpg}_efg.jpg"; done
```

5、将 `abcd_efg.jpg` 重命名为 `abcd_lmn.jpg`：
```shell
for var in *.jpg; do mv "$var" "${var%_efg.jpg}_lmn.jpg"; done
```

6、把文件名中所有小写字母改为大写字母：
```shell
for var in `ls`; do mv -f "$var" `echo "$var" |tr a-z A-Z`; done
```

7、把格式 `*_?.jpg` 的文件改为 `*_0?.jpg`：
```shell
for var in `ls *_?.jpg`; do mv "$var" `echo "$var" |awk -F '_' '{print $1 "_0" $2}'`; done
```

8、把文件名的前三个字母变为 `vzomik`：
```shell
for var in `ls`; do mv -f "$var" `echo "$var" |sed 's/^.../vzomik/'`; done
```

9、把文件名的后四个字母变为 `vzomik`：
```shell
for var in `ls`; do mv -f "$var" `echo "$var" |sed 's/....$/vzomik/'`; done
```

10. 把`.txt`变成`.txt_bak` 的后缀
```shell
ls *.txt|xargs -n1 -i{} mv {} {}_bak
```

`xargs -n1 –i{}` 类似`for`循环，`-n1`意思是一个一个对象的去处理，`-i{}` 把前面的对象使用`{}`取代，`mv {} {}_bak` 相当于 `mv 1.txt 1.txt_bak`

```shell
find ./*.txt -exec mv {} {}_bak \;  
```

这个命令中也是把{}作为前面find出来的文件的替代符，后面的”\”为”;”的脱意符，不然shell会把分号作为该行命令的结尾.
