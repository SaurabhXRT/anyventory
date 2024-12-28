import axios from "axios";

class WeatherAPIService {
  private API_KEY = "35b01576cb21477aa4a42947242812";
  private BASE_URL = "http://api.weatherapi.com/v1";

  async fetchCurrentWeather(query: string) {
    try {
      const response = await axios.get(`${this.BASE_URL}/current.json`, {
        params: {
          key: this.API_KEY,
          q: query,
          aqi: "yes",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch current weather");
    }
  }

  async fetchForecastWeather(query: string, days: number = 7) {
    try {
      const response = await axios.get(`${this.BASE_URL}/forecast.json`, {
        params: {
          key: this.API_KEY,
          q: query,
          days,
          aqi: "yes",
          alerts: "yes",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch forecast weather");
    }
  }

  async searchCity(query: string) {
    try {
      const response = await axios.get(`${this.BASE_URL}/search.json`, {
        params: {
          key: this.API_KEY,
          q: query,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to search city");
    }
  }

  async fetchSelectedDateWeather(query: string, dt: string) {
    try {
      const response = await axios.get(`${this.BASE_URL}/future.json`, {
        params: {
          key: this.API_KEY,
          q: query,
          dt,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch weather for selected date");
    }
  }
}

export default new WeatherAPIService();
