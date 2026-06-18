---
date: 2023-12-10
title: github-action接入微信公众平台测试号实现每日早安推送
tags:
- 日常
description: 基于python脚本实现利用github-action接入微信公众平台测试号实现每日早安推送
---

# 每日早安推送给你的女朋友

这个东西其实前段时间不忙的时候逛github看到的，原创地址<a href="https://github.com/13812851221/-rxrw-daily_morning" style="color:blue;">点这里</a>，主要实现就是两个python脚本，python我本身是不懂的，但是看到这个项目，觉得挺有意思的，就打算自己实现一下，然后就搞出来了。也在上面做了一些小改动，天气数据来源是和风天气，因为天气数据是免费的，所以就直接用了，然后就实现了每日早安推送。python脚本的话有点开发基础基本上都能看懂，然后就是github-action的配置。实现方法原创作者讲的很清楚了，我这里就不再赘述了

## 先看一下我修改后的实现效果

<a data-fancybox="gallery" href="https://i.miji.bid/2023/12/13/88dfa575538339fdb03943186ed90796.png" data-caption="早安晚安午安">
<img v-lazy="'https://i.miji.bid/2023/12/13/88dfa575538339fdb03943186ed90796.png'"/>
</a>

## 代码实现

### 获取天气数据

我这里直接用的和风天气的api，因为作者提供的那个api失效了，和风虽然有请求限制但是我每天只发一次肯定是够了，免费的

* 加了一个距离发工资时间 *

```python
import os
import math
import random
import requests

from datetime import date, datetime
from wechatpy import WeChatClient
from wechatpy.client.api import WeChatMessage, WeChatTemplate

today = datetime.now()

# 微信公众测试号ID和SECRET
app_id = os.environ["APP_ID"]
app_secret = os.environ["APP_SECRET"]

# 可把os.environ结果替换成字符串在本地调试
user_ids = os.environ["USER_ID"].split(',')
template_ids = os.environ["TEMPLATE_ID"]
citys = os.environ["CITY"]
solarys = os.environ["SOLARY"]
start_dates = os.environ["START_DATE"]
# birthdays = os.environ["BIRTHDAY"].split(',')
birthdayf = os.environ["BIRTHDAY_FANG"]
birthdayr = os.environ["BIRTHDAY_RUI"]
birthdaym = os.environ["BIRTHDAY_MING"]
weather_key = os.environ["WEATHER_KEY"]

# 获取天气和温度
def get_weather(city):
    url = f"https://api.seniverse.com/v3/weather/now.json?key={weather_key}&location={city}&language=zh-Hans&unit=c"
    res = requests.get(url).json()
    print(res)
    weather = res['results'][0]['now']
    return weather['text'], weather['temperature']

# 当前城市、日期
def get_city_date(city):
    return city, today.date().strftime("%Y-%m-%d")

# 距离设置的日期过了多少天
def get_count(start_date):
    delta = today - datetime.strptime(start_date, "%Y-%m-%d")
    return delta.days

# 距离发工资还有多少天
def get_solary(solary):
    next = datetime.strptime(str(date.today().year) + "-" + str(date.today().month) + "-" + solary, "%Y-%m-%d")
    if next < datetime.now():
        if next.month == 12:
            next = next.replace(year=next.year + 1)
        next = next.replace(month=(next.month + 1) % 12)
    return (next - today).days

# 距离过生日还有多少天
def get_birthday(birthday):
    try:
        datetime.strptime(birthday, "%Y-%m-%d")
    except ValueError:
        print(f"Invalid birthday format: {birthday}. It should be in the format '%Y-%m-%d'")
        return None
    today = date.today()
    next_birthday = datetime.strptime(birthday, "%Y-%m-%d")
    if next_birthday < datetime.now():
        next_birthday = next_birthday.replace(year=next_birthday.year + 1)
    print('sda', (next_birthday - datetime.now()).days)
    return (next_birthday - datetime.now()).days

# 每日一句
def get_words():
    words = requests.get("https://api.shadiao.pro/chp")
    return words.json()['data']['text']

# 字体随机颜色
def get_random_color():
    return "#%06x" % random.randint(0, 0xFFFFFF)

client = WeChatClient(app_id, app_secret)
wm = WeChatMessage(client)

for i in range(len(user_ids)):
    wea, tem = get_weather(citys)
    cit, dat = get_city_date(citys)
    birthday_fang_days = get_birthday(birthdayf)
    birthday_rui_days = get_birthday(birthdayr)
    birthday_ming_days = get_birthday(birthdaym)
    data = {
        "date": {"value": dat, "color": get_random_color()},
        "city": {"value": cit, "color": get_random_color()},
        "weather": {"value": wea, "color": get_random_color()},
        "temperature": {"value": tem, "color": get_random_color()},
        "love_days": {"value": get_count(start_dates), "color": get_random_color()},
        "birthday_fang": {"value": birthday_fang_days, "color": get_random_color()},
        "birthday_rui": {"value": birthday_rui_days, "color": get_random_color()},
        "birthday_ming": {"value": birthday_ming_days, "color": get_random_color()},
        "solary": {"value": get_solary(solarys), "color": get_random_color()},
        "words": {"value": get_words(), "color": get_random_color()}
    }
    # if get_birthday(birthdays[i]) == 0:
    #     data["birthday_left"]['value'] = "今天是她的生日哦，快去一起甜蜜吧"
    if get_solary(solarys) == 0:
        data["solary"]['value'] = "今天发工资啦，快去犒劳一下自己吧"
    res = wm.send_template(user_ids[i], template_ids, data)
    print(res)
```

<Fancybox />
<Comment />