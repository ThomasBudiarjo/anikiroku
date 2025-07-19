<script setup>
import { ref, onMounted } from 'vue';
import anilistApi from '../services/anilistApi';
import { TrendingNowQuery } from '../services/graphqlQueries';
import AppLayout from '../components/layout/AppLayout.vue';
import AnimeGrid from '../components/anime/AnimeGrid.vue';

const trendingNow = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await anilistApi.query(TrendingNowQuery, { page: 1, perPage: 20 });
    trendingNow.value = response.Page.media;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <AppLayout>
    <div class="home-view">
      <div class="hero-section">
        <h1 class="hero-title">Discover Amazing Anime</h1>
        <p class="hero-subtitle">Explore trending shows and find your next favorite series</p>
      </div>

      <div v-if="loading" class="loading-state">
        <p>Loading anime data...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <h2>Error Loading Data</h2>
        <p>{{ error }}</p>
      </div>

      <div v-else>
        <AnimeGrid 
          :animes="trendingNow" 
          title="Trending Now" 
        />
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
.home-view {
  padding: 0;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 1rem 0;
  background: linear-gradient(45deg, #3498db, #9b59b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin: 0;
  font-weight: 400;
}

.loading-state, .error-state {
  text-align: center;
  padding: 3rem 0;
  color: #666;
}

.error-state h2 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-section {
    margin-bottom: 2rem;
    padding: 1rem 0;
  }
}
</style>