# PostgreSQL

使用 `psql` 命令行工具

### 登录

```bash
psql -U username
```

```bash
psql -U username -d databasename
```

```bash
psql -U john -d mydatabase -h 192.168.1.100 -p 5432
```

Unix-like系统

```bash
psql -U john -d mydatabase -h 192.168.1.100 -p 5432 -w
```

### 退出当前会话

使用select语句后，当前会话不会结束，即无法输入其他命令，此时需要手动结束会话。

```bash
\q
```


### 查看数据库中的表

```bash
\dt
```

查看特定模式下的表

```bash
\dt public.*
```

查询系统表 information_schema.tables

```bash
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_type = 'BASE TABLE'
  AND table_schema NOT IN ('information_schema', 'pg_catalog');
```

查看某个特定模式下的表

```bash
SELECT table_name
FROM information_schema.tables
WHERE table_type = 'BASE TABLE'
  AND table_schema = 'public';
```

### 查看某一个表的字段（列）的信息

```bash
\d table_name
```

### 删除表可以使用 `DROP TABLE` 命令

```bash
DROP TABLE table_name;
```

忽略不存在的错误

```bash
DROP TABLE IF EXISTS table_name;
```

删除多个表

```bash
DROP TABLE table1, table2, table3;
```

删除表并删除相关的依赖对象

```bash
DROP TABLE table_name CASCADE;
```

如果表有外键约束或者其他依赖对象，并且你想删除这些依赖对象，可以使用 `CASCADE`。
使用 `CASCADE` 时要小心，因为它会删除所有依赖于该表的对象，包括视图、索引、触发器等。
