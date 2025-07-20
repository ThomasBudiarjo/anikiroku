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

    <!-- Sidebar Navigation -->
    <SideNav ref="sideNavRef" />
    
    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: #f5f6fa;
}

.mobile-header {
  display: none;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

.mobile-menu-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  color: #64748b;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-toggle:hover {
  background: #f1f5f9;
  color: #334155;
}

.mobile-menu-toggle svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.mobile-logo {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.main-content {
  min-height: 100vh;
  padding: 0;
  margin-left: 240px;
  transition: margin-left 0.3s ease;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .mobile-header {
    display: flex;
  }
  
  .main-content {
    margin-left: 0;
    padding-top: 60px;
  }
  
  .container {
    padding: 1rem;
  }
}

/* Tablet adjustments */
@media (max-width: 1024px) and (min-width: 769px) {
  .main-content {
    margin-left: 200px;
  }
  
  .container {
    padding: 1.5rem 1rem;
  }
}
</style>