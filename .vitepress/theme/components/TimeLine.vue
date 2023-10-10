<template>
  <section id="cd-timeline" class="cd-container">

    <a :href="withBase(item.regularPath)" class="cd-timeline-block" v-for="(item, index) in data" :key="index">
      <div class="cd-timeline-img cd-picture"></div>
      <div class="cd-timeline-content">
        <h4>{{item.frontMatter.title}}</h4>
        <div class="timeline-content-info">
          <span class="timeline-content-info-date">
            📅 {{item.frontMatter.date}}
          </span>
        </div>
        <p>
          {{item.frontMatter.description}}
        </p>
        <ul class="content-skills" >
          <li v-for="(tags, keys) in item.frontMatter.tags" :key="keys"># {{tags}}</li>
        </ul>
      </div>
    </a>

  </section>
</template>

<script lang="ts" setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import { useYearSort } from '../../utils/functions'

const { theme } = useData()
const data = computed(() => theme.value.posts)

</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Raleway:400,900);
.cd-container {
  width: 100%;
  margin: 0 auto;
  border-radius: 2px;
  height: 100%;
  font-family: 'Raleway', sans-serif;
}
.cd-container::after {
  content: '';
  display: table;
  clear: both;
}
/* -------------Main-------------- */
#cd-timeline {
  position: relative;
}
#cd-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 25px;
  height: 100%;
  width: 4px;
  background: rgb(213,213,213);
}
@media only screen and (min-width: 1170px) {
  #cd-timeline::before {
    left: 50%;
    margin-left: -2px;
  }
}
.cd-timeline-block {
  position: relative;
  margin: 2em 0;
}
.cd-timeline-block:after {
  content: '';
  display: table;
  clear: both;
}
.cd-timeline-block:first-child {
  margin-top: 0;
}
.cd-timeline-block:last-child {
  margin-bottom: 0;
}
@media only screen and (min-width: 1170px) {
  .cd-timeline-block {
    margin: 4em 0;
  }
  .cd-timeline-block:first-child {
    margin-top: 0;
  }
  .cd-timeline-block:last-child {
    margin-bottom: 0;
  }
}
.cd-timeline-img {
  position: absolute;
  top: 8px;
  left: 12px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.cd-timeline-img {
  background: #00c4f3;
}
@media only screen and (min-width: 1170px) {
  .cd-timeline-img {
    width: 30px;
    height: 30px;
    left: 50%;
    margin-left: -15px;
    margin-top: 15px;
    -webkit-transform: translateZ(0);
    -webkit-backface-visibility: hidden;
  }
}

.cd-timeline-content {
  position: relative;
  margin: 0 30px 20px 60px;
  background: #333c42;
  border-radius: 2px;
  padding: 1em;
  .timeline-content-info {
    background: #2b343a;
    padding: 5px 10px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    i {
      margin-right: 5px;
    }
    .timeline-content-info-title,
    .timeline-content-info-date {
      width: calc(50% - 2px);
      display: inline-block;
    }
    @media (max-width: 500px) {
      .timeline-content-info-title,
      .timeline-content-info-date {
        display: block;
        width: 100%;
      }
    }
  }
  .content-skills {
    font-size: 12px;
    padding: 0;
    margin-bottom: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li {
      background: #40484d;
      border-radius: 2px;
      display: inline-block;
      padding: 2px 10px;
      color: rgba(255, 255, 255, 0.7);
      margin: 3px 2px;
      text-align: center;
      flex-grow: 1;
    }
  }
}
.cd-timeline-content:after {
  content: '';
  display: table;
  clear: both;
}
.cd-timeline-content h4 {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 0;
  padding-top: 0;
  margin-bottom: 5px;
}
.cd-timeline-content p,
.cd-timeline-content .cd-date {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8125rem;
}
.cd-timeline-content .cd-date {
  display: inline-block;
}
.cd-timeline-content p {
  margin: 1em 0;
  line-height: 1.6;
}

.cd-timeline-content::before {
  content: '';
  position: absolute;
  top: 16px;
  right: 100%;
  height: 0;
  width: 0;
  border: 7px solid transparent;
  border-right: 7px solid #333c42;
}

@media only screen and (min-width: 768px) {
  .cd-timeline-content h4 {
    padding-top: 0;
    padding-bottom: 5px;
    font-size: 1rem;
  }
  .cd-timeline-content p {
    font-size: 16px;
    font-size: 1rem;
  }
  .cd-timeline-content .cd-read-more,
  .cd-timeline-content .cd-date {
    font-size: 14px;
    font-size: 0.875rem;
  }
}
@media only screen and (min-width: 1170px) {
  .cd-timeline-content {
    color: white;
    margin-left: 0;
    padding: 1.2em;
    width: 38%;
    margin: 0 5%;
  }
  .cd-timeline-content::before {
    top: 24px;
    left: 100%;
    border-color: transparent;
    border-left-color: #333c42;
  }
  .cd-timeline-content .cd-date {
    position: absolute;
    width: 100%;
    left: 150%;
    top: 6px;
    font-size: 16px;
    font-size: 1rem;
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content {
    float: right;
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content::before {
    top: 24px;
    left: auto;
    right: 100%;
    border-color: transparent;
    border-right-color: #333c42;
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-read-more {
    float: right;
  }
  .cd-timeline-block:nth-child(even) .cd-timeline-content .cd-date {
    left: auto;
    right: 150%;
    text-align: right;
  }
}
</style>
