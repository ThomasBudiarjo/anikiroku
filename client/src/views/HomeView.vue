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
  min-height: 100vh;
}

.hero-section {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 1.5rem 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%);
  border-radius: 16px;
  margin-bottom: 3rem;
}

.hero-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.025em;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
  letter-spacing: -0.025em;
}

.loading-state, .error-state {
  text-align: center;
  padding: 4rem 0;
  color: #64748b;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(226, 232, 240, 0.5);
}

.loading-state p {
  font-size: 1.1rem;
  font-weight: 500;
}

.error-state h2 {
  color: #dc2626;
  margin-bottom: 1rem;
  font-weight: 600;
}

.error-state p {
  font-weight: 500;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 1.8rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-section {
    margin-bottom: 2rem;
    padding: 1.25rem 0;
  }
  
  .loading-state, .error-state {
    padding: 3rem 0;
  }
}
</style>