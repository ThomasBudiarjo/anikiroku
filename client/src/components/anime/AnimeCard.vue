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
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid rgba(226, 232, 240, 0.5);
}

.anime-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  border-color: rgba(102, 126, 234, 0.2);
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
  top: 10px;
  right: 10px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%);
  color: white;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.anime-info {
  padding: 16px;
}

.anime-title {
  margin: 0 0 10px 0;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.4;
  color: #1e293b;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: -0.025em;
}

.anime-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

.episodes {
  font-weight: 600;
  color: #475569;
}

.status {
  text-transform: capitalize;
  color: #667eea;
  font-weight: 500;
}

.anime-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.genre-tag {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #475569;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.2s ease;
}
</style>