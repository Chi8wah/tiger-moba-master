<template>
  <div style="background: #ededed">
    <swiper :options="swiperOptions">
      <swiper-slide v-for="ad in Ads" :key="ad._id">
        <a :href="ad.items[0].url">
          <img class="w-100" :src="ad.items[0].image" :alt="ad.name" />
        </a>
      </swiper-slide>

      <div class="swiper-pagination pagination-home" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <!-- sprite start -->
    <div class="bg-white nav-icons text-center text-grey-1">
      <div class="d-flex flex-wrap">
        <div class="nav-items" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div>爆料站</div>
        </div>
      </div>
      <!-- <div class="bg-light nav-btm">
                <span class="sprite sprite-arrow mr-1"></span>
                <span>收起</span>
            </div> -->
    </div>
    <!-- end of nav-icons -->
    <!-- <my-card title="新闻资讯" icon="news">
      <template>
        <div>
          
        </div>
      </template>
    </my-card> -->
    <my-list-card title="新闻资讯" icon="news" :categories="newsCats">
      <template #items="{ category }">
        <router-link
          v-for="(news, i) in category.newsList"
          :key="i"
          :to="`/articles/${news._id}`"
          class="article-container d-flex"
        >
          <span class="text-info"> [{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
            news.title
          }}</span>

          <span class="text-grey-1">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </my-list-card>
    <!-- end of news -->
    <my-list-card title="英雄列表" icon="superhero-" :categories="HeroCats">
      <template #items="{ category }">
        <div class="d-flex flex-wrap">
          <router-link
            class="hero-info text-center"
            tag="div"
            :to="`/heroes/${hero._id}`"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" alt="英雄头像" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </my-list-card>
    <!-- end of hero -->
  </div>
</template>

<style lang="scss">
@import "../assets/scss/variables";

.topbar {
  font-size: 12px;
  position: sticky;
  top: 0;
  z-index: 999;
  height: 1rem;
  padding: 0.1rem;

  .topbar-text {
    height: 1em;
    font-size: 0.26rem;
  }

  img {
    width: auto;
    height: 100%;
    max-width: 100%;
  }
}

.topnav {
  padding-top: 0.3rem;
  padding-bottom: 0.2rem;
}

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    border: 1px solid rgba(0, 0, 0, 0.5);

    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  margin-top: 0.2rem;
  padding-top: 0.2rem;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;

  .nav-items {
    box-sizing: border-box;
    width: 25%;
    border-right: 1px solid $border-color;
    margin-bottom: 0.2rem;
    font-size: 0.24rem;
  }

  .nav-btm {
    height: 0.6rem;
    line-height: 0.6rem;
  }
}

.article-container {
  padding: 0.1rem 0;
  font-size: 0.28rem;
}

.hero-info {
  box-sizing: border-box;
  font-size: 0.24rem;
  float: left;
  width: 1.16rem;
  height: 1.74rem;
  margin-right: 0.23rem;
  overflow: hidden;
}
</style>

<script>
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timeZone from "dayjs/plugin/timezone";
import IsSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(IsSameOrAfter);
dayjs.extend(utc);
dayjs.extend(timeZone);
export default {
  filters: {
    date(val) {
      return dayjs(val).tz("PRC").format("MM/DD");
    },
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      },
      newsCats: [],
      HeroCats: [],
      Ads: [],
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.HeroCats = res.data;
    },
    async fetchAds() {
      const res = await this.$http.get("ads/list");
      this.Ads = res.data;
    },
    async postTea() {
      const time = dayjs().tz("PRC");
      // 隔一个小时后才记录
      if (
        localStorage.expireTeaDate &&
        !time.isSameOrAfter(localStorage.expireTeaDate)
      ) {
        return;
      }
      const teaData = {
        viewedid: "",
        time: time,
        type: "Index",
      };
      await this.$http.post("/tea", teaData);
      localStorage.expireTeaDate = time.add(1, "hour");
    },
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
    this.fetchAds();
    this.postTea();
  },
};
</script>