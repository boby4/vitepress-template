<script setup lang="ts">
import { reactive, watch } from 'vue'
import { Solar, SolarMonth, SolarWeek, HolidayUtil } from 'lunar-typescript'

const now = Solar.fromDate(new Date())

class Day {
  public month: number = 0
  public day: number = 0
  public lunarDay: string = ''
  public lunarMonth: string = ''
  public yearGanZhi: string = ''
  public yearShengXiao: string = ''
  public monthGanZhi: string = ''
  public dayGanZhi: string = ''
  public ymd: string = ''
  public desc: string = ''
  public isToday: boolean = false
  public isSelected: boolean = false
  public isRest: boolean = false
  public isHoliday: boolean = false
  public festivals: string[] = []
  public yi: string[] = []
  public ji: string[] = []
}

class Week {
  public days: Day[] = []
}

class Month {
  public heads: string[] = []
  public weeks: Week[] = []
}

class Holiday {
  public name: string = ''
  public month: number = 0
}

const state = reactive({
  year: now.getYear(),
  month: now.getMonth(),
  weekStart: 1,
  selected: new Day(),
  data: new Month(),
  holidays: new Array<Holiday>(),
  holidayMonth: 0,
})

function buildDay(d: Solar) {
  const ymd = d.toYmd()
  const lunar = d.getLunar()
  const day = new Day()
  day.month = d.getMonth()
  day.day = d.getDay()
  day.lunarMonth = lunar.getMonthInChinese()
  day.lunarDay = lunar.getDayInChinese()
  day.yearGanZhi = lunar.getYearInGanZhi()
  day.yearShengXiao = lunar.getYearShengXiao()
  day.monthGanZhi = lunar.getMonthInGanZhi()
  day.dayGanZhi = lunar.getDayInGanZhi()
  day.ymd = ymd
  day.isToday = ymd == now.toYmd()
  day.isSelected = ymd == state.selected.ymd
  if (day.isToday && state.selected.day === 0) {
    state.selected = day
  }
  const solarFestivals = d.getFestivals()
  solarFestivals.forEach((f) => {
    day.festivals.push(f)
  })
  d.getOtherFestivals().forEach((f) => {
    day.festivals.push(f)
  })
  lunar.getFestivals().forEach((f) => {
    day.festivals.push(f)
  })
  lunar.getOtherFestivals().forEach((f) => {
    day.festivals.push(f)
  })
  let rest = false
  if (d.getWeek() === 6 || d.getWeek() === 0) {
    rest = true
  }
  const holiday = HolidayUtil.getHoliday(ymd)
  if (holiday) {
    rest = !holiday.isWork()
  }
  day.isHoliday = !!holiday
  day.isRest = rest
  day.yi = lunar.getDayYi()
  day.ji = lunar.getDayJi()
  let desc = lunar.getDayInChinese()
  const jq = lunar.getJieQi()
  if (jq) {
    desc = jq
  } else if (lunar.getDay() === 1) {
    desc = lunar.getMonthInChinese() + '月'
  } else if (solarFestivals.length > 0) {
    const f = solarFestivals[0]
    if (f.length < 4) {
      desc = f
    }
  }
  day.desc = desc
  return day
}

function render() {
  const month = new Month()
  const weeks: SolarWeek[] = []
  const solarWeeks = SolarMonth.fromYm(
    parseInt(state.year + '', 10),
    parseInt(state.month + '', 10)
  ).getWeeks(state.weekStart)
  solarWeeks.forEach((w) => {
    weeks.push(w)
  })
  while (weeks.length < 6) {
    weeks.push(weeks[weeks.length - 1].next(1, false))
  }
  weeks.forEach((w) => {
    const week = new Week()
    const heads: string[] = []
    w.getDays().forEach((d) => {
      heads.push(d.getWeekInChinese())
      week.days.push(buildDay(d))
    })
    month.heads = heads
    month.weeks.push(week)
  })
  state.data = month
  const holidays: Holiday[] = []
  HolidayUtil.getHolidays(state.year).forEach((h) => {
    const holiday = new Holiday()
    holiday.name = h.getName()
    holiday.month = parseInt(h.getTarget().substring(5, 7), 10)
    const exists = holidays.some((a) => {
      return a.name == holiday.name
    })
    if (!exists) {
      holidays.push(holiday)
    }
  })
  state.holidays = holidays
}

function onSelect(day: Day) {
  state.selected = day
}

function onBack() {
  state.holidayMonth = 0
  state.year = now.getYear()
  state.month = now.getMonth()
  state.selected = buildDay(now)
}

render()

watch(
  () => state.year,
  () => {
    render()
  }
)

watch(
  () => state.month,
  () => {
    render()
  }
)

watch(
  () => state.selected,
  () => {
    render()
  }
)

watch(
  () => state.holidayMonth,
  (newVal) => {
    const month = parseInt(newVal + '', 10)
    if (month > 0) {
      state.month = month
      render()
    }
  }
)
</script>

<template>
  <div class="calendar">
    <div class="container">
      <div class="bar">
        <div><input v-model="state.year" /><span>年</span></div>
        <div>
          <select v-model="state.month">
            <option :value="i" v-for="i in 12">{{ i }}月</option>
          </select>
        </div>
        <div>
          <select v-model="state.holidayMonth">
            <option value="0">假期安排</option>
            <option :value="h.month" v-for="h in state.holidays">
              {{ h.name }}
            </option>
          </select>
        </div>
        <div>
          <div class="button" @click="onBack">返回今天</div>
        </div>
      </div>
      <ul class="head">
        <li v-for="head in state.data.heads">{{ head }}</li>
      </ul>
      <ul class="body">
        <li v-for="week in state.data.weeks">
          <ol>
            <li
              @click="onSelect(day)"
              v-for="day in week.days"
              :class="{
                today: day.isToday,
                selected: day.isSelected,
                other: day.month != state.month,
                rest: day.isRest,
                holiday: day.isHoliday,
              }"
            >
              <div class="inner">
                <b>{{ day.day }}</b>
                <i>{{ day.desc }}</i>
                <u v-if="day.isHoliday">{{ day.isRest ? '休' : '班' }}</u>
              </div>
            </li>
          </ol>
        </li>
      </ul>
    </div>
    <div class="side">
      <div class="ymd">{{ state.selected.ymd }}</div>
      <div class="day">{{ state.selected.day }}</div>
      <div class="lunar">
        <div>
          {{ state.selected.lunarMonth }}月 {{ state.selected.lunarDay }}
        </div>
        <div>
          {{ state.selected.yearGanZhi }}年 {{ state.selected.yearShengXiao }}
        </div>
        <div>
          {{ state.selected.monthGanZhi }}月 {{ state.selected.dayGanZhi }}日
        </div>
      </div>
      <div class="festival" v-for="f in state.selected.festivals">
        {{ f }}
      </div>
      <div class="yiji">
        <div class="yi">
          <b>宜</b>
          <div v-for="f in state.selected.yi">
            {{ f }}
          </div>
        </div>
        <div class="ji">
          <b>忌</b>
          <div v-for="f in state.selected.ji">
            {{ f }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 设置根元素的字体大小为基准，通常为16px */
:root {
  font-size: 16px;
}

.calendar * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.calendar {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  margin: 0;
  box-sizing: border-box;
  border: 0.125rem solid #4e6ef2;
  display: flex;
  height: 29.0625rem;
  overflow: hidden;

  .container {
    padding: 0.875rem;

    .bar {
      position: relative;
      display: flex;
      height: 1.875rem;
      padding: 0 0.625rem;
      margin-bottom: 1.5rem;

      div {
        position: relative;
        flex: 1;
        span{
          position: absolute;
          right: 36px;
          top: 3px;
          font-size: .8rem;
        }
      }

      div.button {
        position: absolute;
        right: 0;
        width: 4.25rem;
        height: 1.875rem;
        line-height: 1.875rem;
        text-align: center;
        background: #f5f5f6;
        border-radius: 0.375rem;
        color: #333;
        cursor: pointer;
        font-size: 0.8125rem;
      }

      input,
      select {
        border: 0.0625rem solid #d7d9e0;
        box-sizing: border-box;
        padding: 0.4375rem;
        border-radius: 0.375rem;
        line-height: 1rem;
        cursor: pointer;
        position: relative;
        background: #ffffff;
        width: 5rem;
        margin-right: 0.375rem;
        text-align: center;
      }

      select {
        appearance: none;
      }
    }

    ul,
    ol {
      list-style: none;
      width: 28rem;
    }

    ul.head {
      li {
        text-align: center;
        float: left;
        width: 4rem;
        height: 2.25rem;
        font-size: 0.8125rem;
      }
    }

    ul.body {
      ol {
        li {
          float: left;
          width: 4rem;
          position: relative;
          height: 3.75rem;
          padding: 0.125rem;
          cursor: pointer;

          div.inner {
            padding: 0.25rem;
            border-radius: 0.375rem;
            border: 0.125rem solid transparent;
            text-align: center;

            b {
              display: block;
              font-weight: normal;
              height: 1.375rem;
              font-size: 1.125rem;
              color: #000;
            }

            i {
              display: block;
              font-style: normal;
              color: #333;
              font-size: 0.75rem;
            }

            u {
              position: absolute;
              text-decoration: none;
              left: 0.4375rem;
              top: 0.4375rem;
              color: #626675;
              font-size: 0.75rem;
              line-height: 0.75rem;
            }
          }
        }

        li.other {
          filter: alpha(opacity=40);
          opacity: 0.4;
        }

        li:hover {
          div.inner {
            border: 0.125rem solid #bdbfc8;
          }
        }

        li.selected {
          div.inner {
            border: 0.125rem solid #bdbfc8;
          }
        }

        li.holiday {
          div.inner {
            background: #f5f5f6;
          }
        }

        li.holiday.rest {
          div.inner {
            background: #fde3e4;
          }
        }

        li.rest {
          div.inner {
            b {
              color: #f73131;
            }

            u {
              color: #f73131;
            }
          }
        }

        li.today {
          div.inner {
            border: 0.125rem solid #4e6ef2 !important;
          }
        }
      }
    }
  }

  .side {
    background: #4e6ef2;
    width: 100%;
    color: #fff;
    text-align: center;

    .ymd {
      line-height: 2.8125rem;
      font-size: 0.8125rem;
    }

    .day {
      position: relative;
      width: 5rem;
      height: 5rem;
      margin: 0 auto;
      line-height: 5rem;
      font-size: 3.25rem;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 0.75rem;
    }

    .lunar {
      margin-top: 0.375rem;

      div {
        font-size: 0.8125rem;
        line-height: 1.3125rem;
      }
    }

    .festival {
      position: relative;
      margin-top: 0.8125rem;
      padding-left: 1.375rem;
      padding-right: 0.875rem;
      text-align: justify;
      color: #fff;
      font-size: 0.75rem;
      line-height: 1rem;
    }

    .festival::before {
      content: '';
      position: absolute;
      top: 0.375rem;
      left: 0.875rem;
      width: 0.1875rem;
      height: 0.1875rem;
      background: #fff;
      border-radius: 50%;
    }

    .yiji {
      position: relative;
      margin-top: 0.75rem;
      padding-top: 0.75rem;
      background: rgba(255, 255, 255, 0.15);
      height: 60%;
      overflow: scroll;

      .yi {
        float: left;
        width: 50%;
        height: 100%;

        div {
          font-size: 0.75rem;
          line-height: 1.25rem;
        }
      }

      .ji {
        float: right;
        width: 50%;
        height: 100%;

        div {
          font-size: 0.75rem;
          line-height: 1.25rem;
        }
      }

      b {
        display: block;
        width: 1.875rem;
        height: 1.875rem;
        line-height: 1.875rem;
        text-align: center;
        margin: 0 auto;
        font-style: normal;
        font-size: 1.5rem;
        color: #fff;
      }
    }
  }
}
@media (max-width: 900px) {
  .calendar{
    display: block;
    height: 100%;
    width: 100%;
  }
  .container{
    overflow: scroll;
    .bar{
      input{
        width: 4rem !important;
        text-align: left !important;
      }
      div span{
        top: 3px !important;
        right: 15px !important;
      }
      div.button{
        left: 7rem;
      }
    }
  }
  .side .yiji{
    height: 100%;
    max-height: 15rem;
    overflow: hidden;
  }
}
</style>