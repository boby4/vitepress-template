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
    return (next - today).days + 1

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
    return (next_birthday - datetime.now()).days

# 每日一句
def get_words():
    words = requests.get("https://v1.hitokoto.cn/")
    print(words)
    return words.json()['hitokoto']

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