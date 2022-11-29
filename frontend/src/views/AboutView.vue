  <!-- 메인페이지 -->
<template>
  <div>
    <!-- 배너 이미지 표시 -->
    <v-carousel :show-arrows="false" cycle height="650">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="require(`@/views/images/banners/${item.name}.jpg`)"
        reverse-transition="fade-transition"
        transition="fade-transition"
        class="bannerItem"
      ></v-carousel-item>
    </v-carousel>
    <!-- 소개내용 -->
    <!-- Introduce.vue를 컴포넌트로 가져와 출력 -->
    <introduce></introduce>
  </div>
</template>
<script>
import Introduce from '../components/main/Introduce.vue';
export default {
  data() {
    return {
      items: [
        {
          name: 'banner01',
        },
        {
          name: 'banner02',
        },
        {
          name: 'banner03',
        },
        {
          name: 'banner04',
        },
      ],
    };
  },
  components: {
    Introduce,
  },
};
</script>
<style></style>





<!-- 
<template>
  <div class="about">
    <img src="https://image.istarbucks.co.kr/common/img/coffee/coffeeCultivation_info_img01.jpg">
    <h1>저희카페는 온도, 일광, 강우량 등 커피 재배에 이상적인 기후가
나타나는 고지대에서 생산된 아라비카 커피만 구매합니다.</h1>
<h1>그 이유는 고지대에서 재배된 원두는
풍부한 풍미와 세련된 바디감과 산미를 가지고 있기 때문입니다.</h1>
<h1>이를 위해 저희카페는 농장과 농부들의 곁에서 커피 경작을 함께 연구합니다.</h1>
<h1>각 산지의 커피가 가지고 있는 최상의 풍미와 더불어
산지의 농부와 가게의 노력이 담겨있습니다.</h1>
  </div>
</template>
-->
