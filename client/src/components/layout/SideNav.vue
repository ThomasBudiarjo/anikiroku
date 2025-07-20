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
  width: 240px;
  background: #1a1b23;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: 1px solid #2d3142;
}

.nav-header {
  padding: 1.25rem 1rem;
  border-bottom: 1px solid #2d3142;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.logo-text {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.025em;
}

.nav-menu {
  flex: 1;
  padding: 0.75rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  margin: 0.125rem 0.75rem;
  border-radius: 10px;
  text-decoration: none;
  color: #9ca3af;
  font-weight: 500;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  font-size: 0.875rem;
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
  background: rgba(102, 126, 234, 0.1);
  color: #ffffff;
  transform: translateX(2px);
}

.nav-item.router-link-active {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.15) 0%, rgba(102, 126, 234, 0.05) 100%);
  color: #ffffff;
  border-left: 3px solid #667eea;
  margin-left: 0.75rem;
  padding-left: calc(1rem - 3px);
}


.nav-icon {
  width: 18px;
  height: 18px;
  stroke-width: 2;
  opacity: 0.9;
}

.nav-text {
  font-size: 0.875rem;
  font-weight: 500;
}

.coming-soon {
  margin-left: auto;
  font-size: 0.65rem;
  background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
  color: #ffffff;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.nav-footer {
  padding: 0.75rem 0;
  border-top: 1px solid #2d3142;
  margin-top: auto;
}

.theme-toggle:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #ffffff;
  transform: translateX(2px);
}

.mobile-overlay {
  display: none;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .side-nav {
    width: 280px;
    transform: translateX(-100%);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
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
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
    backdrop-filter: blur(4px);
  }
}

/* Tablet adjustments */
@media (max-width: 1024px) and (min-width: 769px) {
  .side-nav {
    width: 200px;
  }
}
</style>