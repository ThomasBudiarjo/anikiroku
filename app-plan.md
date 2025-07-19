# Anime Listing App Plan

## Project Overview
A modern anime listing application built with Vue 3 and Vite, utilizing the AniList GraphQL API to display anime information in an organized, user-friendly interface similar to AniList or MyAnimeList.

## Core Features

### 1. Main Sections
- **Popular This Season**: Currently airing anime sorted by popularity
- **Trending Now**: Anime that are currently trending across the platform
- **All Time Popular**: Most popular anime of all time

### 2. UI/UX Design
- Clean, modern interface with horizontal scrolling sections
- Responsive design for desktop, tablet, and mobile
- Smooth animations and transitions
- Dark/light theme support

## Technical Architecture

### Frontend Stack
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Routing**: Vue Router 4
- **Styling**: CSS3 with CSS Variables for theming
- **HTTP Client**: Fetch API or Axios for GraphQL requests

### API Integration
- **Data Source**: AniList GraphQL API (https://graphql.anilist.co)
- **Authentication**: Not required for public data
- **Rate Limiting**: Respect AniList's rate limits (90 requests per minute)

## Implementation Plan

### Phase 1: Project Setup & Core Infrastructure

#### 1.1 Dependencies Installation
```bash
pnpm install axios vue-router@4
pnpm install -D @types/node # for better IDE support
```

#### 1.2 Project Structure
```
client/src/
├── components/
│   ├── common/
│   │   ├── LoadingSpinner.vue
│   │   ├── ErrorMessage.vue
│   │   └── ScrollContainer.vue
│   ├── anime/
│   │   ├── AnimeCard.vue
│   │   ├── AnimeSection.vue
│   │   └── AnimeGrid.vue
│   └── layout/
│       ├── SideNav.vue
│       └── AppLayout.vue
├── services/
│   ├── anilistApi.js
│   └── graphqlQueries.js
├── composables/
│   ├── useAnimeData.js
│   └── useInfiniteScroll.js
├── utils/
│   ├── constants.js
│   └── helpers.js
├── assets/
│   ├── styles/
│   │   ├── variables.css
│   │   ├── components.css
│   │   └── animations.css
│   └── images/
└── views/
    ├── HomeView.vue
    └── AnimeDetailView.vue (future enhancement)
```

### Phase 2: AniList API Integration

#### 2.1 GraphQL Queries
Create queries for each section:

**Popular This Season Query:**
```graphql
query PopularThisSeason($page: Int, $perPage: Int, $season: MediaSeason, $year: Int) {
  Page(page: $page, perPage: $perPage) {
    media(
      type: ANIME
      season: $season
      seasonYear: $year
      sort: POPULARITY_DESC
      status: RELEASING
    ) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
        medium
      }
      averageScore
      genres
      episodes
      status
      startDate {
        year
        month
        day
      }
    }
  }
}
```

**Trending Now Query:**
```graphql
query TrendingNow($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    media(type: ANIME, sort: TRENDING_DESC) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
        medium
      }
      averageScore
      genres
      episodes
      status
      trending
    }
  }
}
```

**All Time Popular Query:**
```graphql
query AllTimePopular($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    media(type: ANIME, sort: POPULARITY_DESC) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
        medium
      }
      averageScore
      genres
      episodes
      status
      popularity
    }
  }
}
```

#### 2.2 API Service Layer
```javascript
// services/anilistApi.js
class AniListAPI {
  constructor() {
    this.baseURL = 'https://graphql.anilist.co';
  }

  async query(query, variables = {}) {
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data;
  }
}
```

### Phase 3: Component Development

#### 3.1 Core Components

**AnimeCard.vue** - Individual anime display card
- Cover image with lazy loading
- Title (with fallback for different languages)
- Release year
- Type (TV, Movie, etc.)
- Hover effects

**AnimeHover.vue** - Individual anime detail hover card
- Landscape Image
- Title (with fallback for different languages)
- Type (TV, Movie, etc.) | Episode count | Season | Rating
- Synopsis

**AnimeSection.vue** - Horizontal scrolling section
- Section title
- Horizontal scroll container
- Navigation arrows
- Loading states
- Error handling

**ScrollContainer.vue** - Reusable horizontal scroll component
- Touch/mouse scroll support
- Can be scrolled by scroll down
- Scroll indicators
- Smooth scrolling behavior
- Responsive design

#### 3.2 Layout Components

**SideNav.vue** - Application Navigation Sidebar
- App logo/title at the top
- Navigation menu items (Home, Search)
- Theme toggle button
- Collapsible on mobile devices
- Fixed positioning on desktop
- Modern icon-based navigation

### Phase 4: State Management & Data Flow

#### 4.1 Composables for Data Management
```javascript
// composables/useAnimeData.js
export function useAnimeData() {
  const popularThisSeason = ref([]);
  const trendingNow = ref([]);
  const allTimePopular = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchPopularThisSeason = async () => {
    // Implementation
  };

  const fetchTrendingNow = async () => {
    // Implementation
  };

  const fetchAllTimePopular = async () => {
    // Implementation
  };

  return {
    popularThisSeason,
    trendingNow,
    allTimePopular,
    loading,
    error,
    fetchPopularThisSeason,
    fetchTrendingNow,
    fetchAllTimePopular,
  };
}
```

### Phase 5: Styling & Responsive Design

#### 5.1 CSS Architecture
- CSS Custom Properties for theming
- Mobile-first responsive design
- Smooth animations and transitions
- Horizontal scroll styling
- Card hover effects

### Phase 6: Performance Optimization

#### 6.1 Image Optimization
- Lazy loading for anime cover images
- Progressive image loading
- WebP format support with fallbacks
- Image caching strategies

#### 6.2 Data Loading Optimization
- Implement pagination for large datasets
- Cache API responses
- Debounced scroll loading
- Skeleton loading states

## Development Timeline

### Week 1: Setup & Infrastructure
- Project setup and dependency installation
- API service implementation
- Basic routing setup

### Week 2: Core Components
- AnimeCard component
- AnimeSection component
- Basic styling and layout

### Week 3: Data Integration
- API integration for all three sections
- Loading and error states
- Data flow implementation

### Week 4: Polish & Optimization
- Responsive design refinement
- Performance optimization
- Testing and bug fixes

## Technical Considerations

### Performance
- Implement virtual scrolling for large lists
- Use intersection observer for lazy loading
- Optimize bundle size with code splitting

### Accessibility
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

### SEO
- Meta tags for social sharing
- Structured data for anime information
- Server-side rendering consideration (future)

### Browser Support
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Progressive enhancement for older browsers
- Polyfills where necessary

## Deployment Strategy

### Development Environment
- Local development with Vite dev server
- Hot module replacement for fast development
- Environment variables for API configuration
- Use pnpm for the dependency management

### Production Deployment
- Static site generation with Vite build
- CDN deployment (Netlify, Vercel, or similar)
- Environment-specific configurations

This comprehensive plan provides a solid foundation for building a modern, performant anime listing application that rivals existing platforms while maintaining clean code architecture and excellent user experience.
