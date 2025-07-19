<script setup>
import AnimeCard from './AnimeCard.vue'

defineProps({
  animes: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="anime-grid-container">
    <h2 v-if="title" class="section-title">{{ title }}</h2>
    
    <div class="anime-grid">
      <AnimeCard 
        v-for="anime in animes" 
        :key="anime.id" 
        :anime="anime"
      />
    </div>
    
    <div v-if="animes.length === 0" class="empty-state">
      <p>No anime found</p>
    </div>
  </div>
</template>

<style scoped>
.anime-grid-container {
  margin-bottom: 2rem;
}

.section-title {
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 2rem;
}

@media (max-width: 768px) {
  .anime-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .section-title {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .anime-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}
</style>