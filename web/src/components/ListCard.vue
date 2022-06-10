<template>
  <div>
    <my-card :title="title" :icon="icon">
      <div class="nav jc-between">
        <div
          class="nav-item"
          :class="{ active: active === i }"
          v-for="(category, i) in categories"
          :key="i"
          @click="$refs.list.$swiper.slideTo(i)"
        >
          <!-- 上面写swiper -->
          <div>{{ category.name }}</div>
        </div>
      </div>
      <div class="listInfo">
        <swiper
          ref="list"
          @slide-change="() => (active = $refs.list.$swiper.realIndex)"
          :options="{ autoHeight: true }"
        >
          <swiper-slide v-for="(category, i) in categories" :key="i">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </my-card>
  </div>
</template>

<style scoped>
.nav {
    padding-top: 0.3rem;
}
.listInfo {
    padding-top: 0.3rem;
}
</style>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>