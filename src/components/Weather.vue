<template>
  <div class="weather">
      <span class="weather_city">{{fetchDataResult.name}}, {{fetchDataResult.sys.country}}</span>
    <div class="weather_icon">
      <img :src="img" alt="icon" />
    </div> 

    <div class="weather_temp">
      <span>Feels like {{fetchDataResult.main.feels_like}}. {{fetchDataResult.weather[0].main}}. {{fetchDataResult.weather[0].description}}</span>
    </div>

    <div class="weather_wind">
      <span><Icon icon="ic:baseline-speed"  />{{fetchDataResult.wind.speed}}m/s SSE</span>
      <span><Icon icon="mdi:compass"  />{{fetchDataResult.wind.deg}}hPa</span>
    </div>

    <div class="weather_humidity">
            <span>Humidity: {{fetchDataResult.main.humidity}}%</span>
            <span>Dew point: {{fetchDataResult.main.pressure}}°C</span>
    </div>
    <div class="weather_visibility">
        <span>Visibility: {{fetchDataResult.visibility}}km</span>
    </div>
  </div>
</template>

<script lang="ts">
interface fetchDataResult{
      base: String,
      clouds: { all: Number },
      cod: Number,
      coord: { lat: Number, lon: Number },
      dt: Number,
      id: Number,
      main: {
        feels_like: Number,
        humidity: Number,
        pressure: Number,
        temp: Number,
        temp_max: Number,
        temp_min: Number
      },

      name: String,
      sys: {
        country: String,
        id: Number,
        sunrise: Number,
        sunset: Number,
        type: Number
      },

      timezone: Number,
      visibility: Number,
      weather: [
        { id: Number, main: String, description: String, icon: String }
      ],

      wind: {
        deg: Number,
        speed: Number
      }
    }

import { defineComponent, PropType } from "vue";
import { Icon } from '@iconify/vue';
export default defineComponent({
  components: {
		Icon,
	},
  props: {
    fetchDataResult: Object as PropType<fetchDataResult>
  },
  setup(props) {
    let img = `http://openweathermap.org/img/wn/${props.fetchDataResult.weather[0].icon}@2x.png`;
    return { img };
  }
});
</script>

<style lang="scss" scoped>
.weather {
  color: rgb(255, 255, 255);
  background: rgb(14, 42, 182);
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  font-size: 18px;
  box-sizing: border-box;
  padding: 10px;

  .weather_city{
    font-weight: 600;
  }
  .weather_wind,.weather_humidity {
    display: flex;
    justify-content: space-between;
  }

}
</style>