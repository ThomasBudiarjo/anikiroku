export const PopularThisSeasonQuery = `
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
`;

export const TrendingNowQuery = `
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
`;

export const AllTimePopularQuery = `
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
`;
