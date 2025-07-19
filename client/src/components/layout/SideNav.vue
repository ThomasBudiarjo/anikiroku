<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMobileMenuOpen = ref(false)
const isDarkTheme = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  // Theme implementation will be added later
}

defineExpose({
  toggleMobileMenu
})
</script>

<template>
  <nav class="side-nav" :class="{ 'mobile-open': isMobileMenuOpen }">
    <!-- Logo Section -->
    <div class="nav-header">
      <RouterLink to="/" class="logo" @click="isMobileMenuOpen = false">
        <div class="logo-icon">A</div>
        <h1 class="logo-text">AniKiroku</h1>
      </RouterLink>
    </div>

    <!-- Navigation Menu -->
    <div class="nav-menu">
      <RouterLink 
        to="/" 
        class="nav-item"
        @click="isMobileMenuOpen = false"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
        <span class="nav-text">Home</span>
      </RouterLink>

      <button class="nav-item nav-button" disabled>
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <span class="nav-text">Search</span>
        <span class="coming-soon">Soon</span>
      </button>
    </div>

    <!-- Theme Toggle -->
    <div class="nav-footer">
      <button 
        class="nav-item nav-button theme-toggle" 
        @click="toggleTheme"
        :title="isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
      >
        <svg v-if="!isDarkTheme" class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <svg v-else class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        <span class="nav-text">{{ isDarkTheme ? 'Dark' : 'Light' }}</span>
      </button>
    </div>
  </nav>

  <!-- Mobile Overlay -->
  <div 
    v-if="isMobileMenuOpen" 
    class="mobile-overlay"
    @click="toggleMobileMenu"
  ></div>
</template>

<style scoped>
.side-nav {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 280px;
  background: #fff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transition: transform 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.nav-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #3498db, #9b59b6);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
}

.logo-text {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
}

.nav-menu {
  flex: 1;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  margin: 0.25rem 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  color: #555;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
}

.nav-button {
  background: none;
  border: none;
  cursor: pointer;
  width: calc(100% - 1.5rem);
  text-align: left;
}

.nav-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.nav-item:hover:not(:disabled) {
  background: #f8f9fa;
  color: #3498db;
}

.nav-item.router-link-active {
  background: #e3f2fd;
  color: #3498db;
}

.nav-item.router-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: #3498db;
  border-radius: 0 2px 2px 0;
}

.nav-icon {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.nav-text {
  font-size: 0.95rem;
}

.coming-soon {
  margin-left: auto;
  font-size: 0.7rem;
  background: #ffeaa7;
  color: #d63031;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 600;
}

.nav-footer {
  padding: 1rem 0;
  border-top: 1px solid #f0f0f0;
}

.theme-toggle:hover {
  background: #f8f9fa;
  color: #3498db;
}

.mobile-overlay {
  display: none;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .side-nav {
    transform: translateX(-100%);
  }
  
  .side-nav.mobile-open {
    transform: translateX(0);
  }
  
  .mobile-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}

/* Desktop: Always visible sidebar */
@media (min-width: 769px) {
  .side-nav {
    position: relative;
    transform: none;
  }
}
</style>