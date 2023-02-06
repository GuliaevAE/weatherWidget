<template>
  <div class="weather" v-bind:style="styleObject">
    <span class="weather_city">{{fetchDataResult.name}}, {{fetchDataResult.sys.country}}</span>
    <div class="weather_icon" >
      <img :src="img" alt="icon" v-bind:style="styleObject" />
      <div>
        <span>Feels like {{fetchDataResult.main.feels_like}}°C. {{fetchDataResult.weather[0].main}}. {{fetchDataResult.weather[0].description}}.</span>
      </div>
    </div>

    <div class="weather_wind">
      <div>
        <Icon icon="ic:baseline-speed" />
        <span>{{fetchDataResult.wind.speed}}m/s</span>
      </div>

      <div>
        <Icon icon="mdi:compass" />
        <span>{{fetchDataResult.wind.deg}}hPa</span>
      </div>
    </div>

    <div class="weather_humidity">
      <div>
        <Icon icon="material-symbols:humidity-percentage" />
        <span>{{fetchDataResult.main.humidity}}%</span>
      </div>
      <div>
        <Icon icon="mdi:dew-point" />
        <span>{{fetchDataResult.main.pressure}}°C</span>
      </div>
    </div>
    <div class="weather_visibility">
      <div>
        <Icon icon="material-symbols:visibility" />
        <span>{{fetchDataResult.visibility}}m</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface fetchDataResult {
  base: String;
  clouds: { all: Number };
  cod: Number;
  coord: { lat: Number; lon: Number };
  dt: Number;
  id: Number;
  main: {
    feels_like: Number;
    humidity: Number;
    pressure: Number;
    temp: Number;
    temp_max: Number;
    temp_min: Number;
  };

  name: String;
  sys: {
    country: String;
    id: Number;
    sunrise: Number;
    sunset: Number;
    type: Number;
  };

  timezone: Number;
  visibility: Number;
  weather: [{ id: Number; main: String; description: String; icon: String }];

  wind: {
    deg: Number;
    speed: Number;
  };
}

interface styleObject{
  background:String
borderColor:String
}

import { defineComponent, ref, PropType } from "vue";
import { Icon } from "@iconify/vue";
export default defineComponent({
  components: {
    Icon
  },
  props: {
    fetchDataResult: Object as PropType<fetchDataResult>,
    styleObject: Object
  },
  setup(props) {
    let img = `http://openweathermap.org/img/wn/${props.fetchDataResult.weather[0].icon}@2x.png`;
   
    let styleObject = ref(props.styleObject);
    return { img, styleObject };
  }
});
</script>

<style lang="scss" scoped>
.weather {
  color: rgb(255, 255, 255);
  background: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  font-size: 18px;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 1px 1px rgb(247, 3, 3), 0 0 0px 1px rgb(236, 236, 236),
          5px 5px rgb(192, 192, 192);

  .weather_icon {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
    img {
      background: rgba(18, 49, 205, 0);
      border-radius: 15px;
      box-shadow: 1px 1px rgb(247, 3, 3), 0 0 0px 1px rgb(236, 236, 236),
        5px 5px rgb(192, 192, 192), 5px 5px 0 1px rgba(255, 0, 0, 0.712);
    }
  }
  .weather_city {
    font-weight: 600;
  }
  .weather_wind,
  .weather_humidity,
  .weather_visibility {
    display: flex;

    width: 100%;

    div {
      display: flex;
      width: 50%;
      align-items: center;
      gap: 5px;
    }
  }
}
</style>