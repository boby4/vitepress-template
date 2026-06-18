---
date: 2023-09-28
title: Linux常用操作命令
tags:
- Linux
description: Linux是一种广泛使用的操作系统，因其开放源代码、稳定性和安全性而备受欢迎。熟练掌握Linux常用操作命令对于测试工程师来说至关重要，可以提高工作效率并简化任务。
---

## Linux是什么？

Linux是一种广泛使用的操作系统，因其开放源代码、稳定性和安全性而备受欢迎。熟练掌握Linux常用操作命令对于测试工程师来说至关重要，可以提高工作效率并简化任务。

一些常用的Linux操作命令，帮助你快速上手并进行日常工作。

## 基本命令

* ls

用于列出当前目录中的文件和子目录。

```bash
ls
ls -l
ls -a
```

* cd

用于切换当前工作目录。

```bash
cd /path/to/directory
cd .. cd ~
```

* mkdir

用于创建新目录。

```bash
mkdir directory_name
mkdir -p path/to/directory
```

* rm

用于删除文件或目录。

```bash
rm file_name
rm -r directory_name
rm -f file_name
```

* cp

用于复制文件或目录。

```bash
cp source_file destination_file
cp -r source_directory destination_directory
```

* mv

用于移动文件或目录，也可用于重命名文件或目录。

```bash
mv source_file destination_file
mv source_directory destination_directory
```

* cat

用于查看文件内容。

```bash
cat file_name
```

* vi

用于查看编辑文件内容。

```bash
vi file_name
```

* head 和 tail

用于查看文件的头部和尾部内容。

```bash
head -n number_of_lines file_name
tail -n number_of_lines file_name
```

* grep

用于在文件中搜索指定模式的文本。

```bash
grep pattern file_name
grep -r pattern directory_name
```

* chmod

用于更改文件或目录的权限。

```bash
chmod permissions file_name
chmod -R permissions directory_name
```

## 进阶命令

* find

用于在文件系统中查找符合指定条件的文件。

```bash
find /path/to/search -name "file_pattern"
find /path/to/search -type f -size +10M
```

* ssh

用于通过安全的远程连接登录到另一台计算机。

```bash
ssh username@remote_host
```

* wget

用于从网络上下载文件。

```bash
wget URL
```

* tar

用于归档和解压文件。

```bash
tar -czvf archive.tar.gz directory_to_archive
tar -xzvf archive.tar.gz
```

* ps

用于列出当前正在运行的进程。

```bash
ps aux
```

* top

用于实时监视系统的运行状态和进程活动。

```bash
top
```

* kill

用于终止正在运行的进程。

```bash
kill process_id
kill -9 process_id
```

## 查看Linux性能和编写相关命令

* top

用于查看系统运行状态、进程活动和资源利用率。

```bash
top
```

* htop

类似于top，但提供更友好的交互界面和更详细的系统性能信息。

```bash
htop
```

* vmstat

用于报告虚拟内存统计信息。

```bash
vmstat
```

* iostat

用于报告CPU使用情况、设备和分区I/O活动信息。

```bash
iostat
```

* free

用于显示系统内存使用情况。

```bash
free -h
```

* df

用于显示磁盘空间使用情况。

```bash
df -h
```

* du

用于估算文件或目录的磁盘空间使用量。

```bash
du -sh directory_name
```

* netstat

用于显示网络连接、路由表和网络接口信息。

```bash
netstat -tuln
```

* ifconfig

用于查看和配置网络接口信息。

```bash
ifconfig
```

* ping

用于测试与另一台计算机之间的网络连接。

```bash
ping remote_host
```

<Comment />
