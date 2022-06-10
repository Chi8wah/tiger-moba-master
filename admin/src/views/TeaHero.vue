<template>
  <div class="about">
    <h1>英雄页访问分析</h1>
    <div class="time-picker">
      <span class="time-picker-title">请选择需要查询的时间段：</span>
      <el-date-picker
        v-model="pickedTime"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <el-button class="time-picker-btn" type="primary" v-on:click="fetch"
        >查询</el-button
      >
    </div>
    <div id="hero-chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timeZone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timeZone);
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      model: [],
      pickedTime: [],
      chartOption: {
        tooltip: {
          trigger: "item",
          formatter: "{b}<br />点击量: {c}次<br />占比: {d}%",
        },
        series: [
          {
            type: "pie",
          },
        ],
      },
    };
  },
  methods: {
    processData(data) {
      this.model = [];
      for (let hero in data) {
        const item = {
          name: data[hero].name,
          value: data[hero].amount,
          percent: data[hero].percent,
        };
        this.model.push(item);
      }
    },
    async fetch() {
      const res = await this.$http.get(`/rest/tea/check`, {
        params: {
          type: "Hero",
          fromTime: dayjs(this.pickedTime[0]).subtract(1, "day").format(),
          toTime: dayjs(this.pickedTime[1]).format(),
        },
      });
      console.log("wzh - ", res.data);
      await this.processData(res.data);
      this.updateChart();
    },
    initChart() {
      const chartEl = document.getElementById("hero-chart");
      this.heroChart = echarts.init(chartEl);
      window.onresize = () => {
        this.heroChart.resize();
      };
    },
    updateChart() {
      // 更新数据
      console.log("beforeupdate - ", this.chartOption.series);
      this.chartOption.series[0].data = this.model;
      console.log("updated - ", this.chartOption.series);

      // 使用刚指定的配置项和数据显示图表。
      this.heroChart.setOption(this.chartOption);
    },
    initData() {
      const start = dayjs().subtract(1, "day").format();
      const end = dayjs().format();
      this.pickedTime[0] = start;
      this.pickedTime[1] = end;
    },
  },
  async created() {
    await this.initData();
    this.fetch();
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    this.heroChart && this.heroChart.dispose();
  },
};
</script>

<style scoped>
#hero-chart {
  height: 300px;
  width: 100%;
}
.time-picker {
  margin-bottom: 20px;
  text-align: center;
}
.time-picker-title {
  margin-bottom: 20px;
}
.time-picker-btn {
  margin-left: 20px;
}
</style>