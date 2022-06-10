<template>
  <div class="about">
    <h1>主页访问分析</h1>
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
    <div id="index-chart"></div>
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
      // 指定图表的配置项和数据
      chartOption: {
        legend: {},
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "cross" },
        },
        dataset: {
          dimensions: ["hour", "percent", "amount"],
        },
        xAxis: [
          {
            name: "时间",
            nameLocation: "middle",
            nameGap: "20",
            axisPointer: {
              snap: true,
            },
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "百分比",
            min: 0,
            max: 100,
            axisPointer: {
              snap: true,
            },
            position: "left",
            axisLabel: {
              formatter: "{value} %",
            },
          },
          {
            type: "value",
            name: "访问量",
            minInterval: 1,
            axisPointer: {
              snap: true,
            },
            position: "right",
            axisLabel: {
              formatter: "{value} 次",
            },
          },
        ],
        series: [
          {
            name: "占比(%)",
            type: "line",
            smooth: false,
            yAxisIndex: 0,
            encode: {
              x: 0,
              y: 1,
              itemId: 1,
              itemName: 1,
              tooltip: 1,
            },
          },
          {
            name: "访问量(次)",
            type: "bar",
            yAxisIndex: 1,
            encode: {
              x: 0,
              y: 2,
              itemId: 1,
              itemName: 1,
              tooltip: 2,
            },
          },
        ],
      },
    };
  },
  methods: {
    // 将数据转化为 Echarts 库需要的格式
    processData(data) {
      for (let hour in data) {
        this.model[hour].amount = data[hour].amount;
        this.model[hour].percent = data[hour].percent;
      }
    },
    // 根据时间范围拉取数据，转化后更新数据
    async fetch() {
      const res = await this.$http.get(`/rest/tea/check`, {
        params: {
          type: "Index",
          fromTime: dayjs(this.pickedTime[0]).subtract(1, "day").format(),
          toTime: dayjs(this.pickedTime[1]).format(),
        },
      });
      await this.processData(res.data);
      console.log("wzh - ", res.data);
      this.updateChart();
    },
    initChart() {
      const chartEl = document.getElementById("index-chart");
      this.indexChart = echarts.init(chartEl);
      window.onresize = () => {
        this.indexChart.resize();
      };
    },
    updateChart() {
      // 更新数据
      this.chartOption.dataset.source = this.model;

      // 使用刚指定的配置项和数据显示图表。
      this.indexChart.setOption(this.chartOption);
    },
    initData() {
      for (let i = 0; i < 24; i++) {
        const item = {
          hour: i + "点",
          amount: 0,
          percent: 0,
        };
        this.model.push(item);
      }
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
    this.indexChart && this.indexChart.dispose();
  },
};
</script>

<style scoped>
#index-chart {
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