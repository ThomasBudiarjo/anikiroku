<script setup>
import { ref } from 'vue'
import SideNav from './SideNav.vue'

const sideNavRef = ref(null)

const toggleMobileMenu = () => {
  if (sideNavRef.value) {
    sideNavRef.value.toggleMobileMenu()
  }
}
</script>

<template>
  <div class="app-layout">
    <!-- Mobile Header with Menu Toggle -->
    <header class="mobile-header">
      <button 
        class="mobile-menu-toggle"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <h1 class="mobile-logo">AniKiroku</h1>
    </header>

    <div class="layout-container">
      <!-- Sidebar Navigation -->
      <SideNav ref="sideNavRef" />
      
      <!-- Main Content -->
      <main class="main-content">
        <div class="container">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: #f8f9fa;
}

.mobile-header {
  display: none;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.mobile-menu-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  color: #555;
  transition: background-color 0.2s ease;
}

.mobile-menu-toggle:hover {
  background: #f0f0f0;
}

.mobile-menu-toggle svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.mobile-logo {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
}

.layout-container {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
  min-height: calc(100vh - 64px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .mobile-header {
    display: flex;
  }
  
  .main-content {
    padding: 1rem 0;
    margin-left: 0;
  }
  
  .container {
    padding: 0 0.75rem;
  }
}

/* Desktop Styles */
@media (min-width: 769px) {
  .main-content {
    margin-left: 280px;
  }
  
  .layout-container {
    position: relative;
  }
}
</style>