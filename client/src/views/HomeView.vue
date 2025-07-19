<script setup>
import { ref, onMounted } from 'vue';
import anilistApi from '../services/anilistApi';
import { TrendingNowQuery } from '../services/graphqlQueries';

const trendingNow = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await anilistApi.query(TrendingNowQuery, { page: 1, perPage: 10 });
    trendingNow.value = response.Page.media;
  } catch (err) {
    error.value = err.message;
  }
});
</script>

<template>
  <main>
    <h1>Anime Listing</h1>
    <div v-if="error">
      <h2>Error</h2>
      <pre>{{ error }}</pre>
    </div>
    <div v-if="trendingNow">
      <h2>Trending Now</h2>
      <pre>{{ trendingNow }}</pre>
    </div>
  </main>
</template>