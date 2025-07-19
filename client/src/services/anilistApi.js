import axios from 'axios';

class AniListAPI {
  constructor() {
    this.baseURL = 'https://graphql.anilist.co';
  }

  async query(query, variables = {}) {
    const response = await axios.post(this.baseURL, {
      query,
      variables,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data;
  }
}

export default new AniListAPI();
