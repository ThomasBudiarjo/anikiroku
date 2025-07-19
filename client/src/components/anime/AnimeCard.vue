<script setup>
defineProps({
  anime: {
    type: Object,
    required: true
  }
})

const getTitle = (titleObj) => {
  return titleObj.english || titleObj.romaji || titleObj.native
}

const getScore = (score) => {
  return score ? `${score}%` : 'N/A'
}
</script>

<template>
  <div class="anime-card">
    <div class="anime-cover">
      <img 
        :src="anime.coverImage.large" 
        :alt="getTitle(anime.title)"
        loading="lazy"
      />
      <div class="anime-score" v-if="anime.averageScore">
        {{ getScore(anime.averageScore) }}
      </div>
    </div>
    
    <div class="anime-info">
      <h3 class="anime-title">{{ getTitle(anime.title) }}</h3>
      
      <div class="anime-meta">
        <span v-if="anime.episodes" class="episodes">
          {{ anime.episodes }} eps
        </span>
        <span class="status">{{ anime.status }}</span>
      </div>
      
      <div class="anime-genres" v-if="anime.genres && anime.genres.length">
        <span 
          v-for="genre in anime.genres.slice(0, 3)" 
          :key="genre" 
          class="genre-tag"
        >
          {{ genre }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.anime-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.anime-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.anime-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
}

.anime-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.anime-score {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
}

.anime-info {
  padding: 12px;
}

.anime-title {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.anime-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.875rem;
  color: #666;
}

.episodes {
  font-weight: 500;
}

.status {
  text-transform: capitalize;
}

.anime-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.genre-tag {
  background: #f0f0f0;
  color: #555;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}
</style>