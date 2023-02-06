<template>
  <div class="weather" v-bind:style="styleObject">
    <div class="weather_header">
      <span>{{fetchDataResult.name}}</span>
      <div
        class="weather_header_clock"
        v-bind:style="[styleObject, {boxShadow:'-1px -1px '+styleObject.boxShadow1+', 0 0 0 0.5px '+styleObject.boxShadow2+',inset 5px 5px '+styleObject.boxShadow3}]"
      >
        <span>{{clock}}</span>
      </div>
    </div>

    <div class="weather_icon">
      <span class="weather_icon_contry"> {{fetchDataResult.sys.country}}</span>
      <img :src="img" alt="icon" v-bind:style="styleObject" />
      <div>
        <span>Feels like {{fetchDataResult.main.feels_like}}°C. {{fetchDataResult.weather[0].main}}. {{fetchDataResult.weather[0].description}}.</span>
      </div>
    </div>

    <div class="weather_wind">
      <div>
        <Icon icon="ic:baseline-speed" height="20" />
        <span>{{fetchDataResult.wind.speed}}m/s</span>
      </div>

      <div>
        <Icon icon="mdi:compass" height="20" />
        <span>{{fetchDataResult.wind.deg}}hPa</span>
      </div>
    </div>
    <div class="weather_humidity">
      <div>
        <Icon icon="material-symbols:humidity-percentage" height="20" />
        <span>{{fetchDataResult.main.humidity}}%</span>
      </div>
      <div>
        <Icon icon="mdi:dew-point" height="20" />
        <span>{{fetchDataResult.main.pressure}}°C</span>
      </div>
    </div>
    <div class="weather_visibility">
      <div>
        <Icon icon="material-symbols:visibility" height="20" />
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

    let clock = ref<string>("");
    function timer() {
      let date = new Date(),
        hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        minutes =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        seconds =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      clock.value = hours + ":" + minutes + ":" + seconds;
    }
    setInterval(timer, 1000);
    timer();

    let styleObject = ref(props.styleObject);

    return { img, styleObject, clock };
  }
});
</script>

<style lang="scss" scoped>
.weather {
  color: rgb(255, 255, 255);
  background: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  width: 100%;
  max-height: 280px;
  font-size: 15px;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 1px 1px rgb(247, 3, 3), 0 0 0px 1px rgb(236, 236, 236),
    5px 5px rgb(192, 192, 192);

  .weather_icon {
    position: relative;
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
    .weather_icon_contry{
      position: absolute;
      top: 5px;
      left: 5px;
    }
  }
  .weather_header {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    .weather_header_clock {
      position: relative;
      align-self: baseline;
      width: 30%;
      min-width: 85px;
      box-sizing: border-box;
      border-radius: 10px;
      padding-bottom: 5px;
      padding-top: 8px;
      padding-left: 10px;
      padding-right: 2px;
      margin-left:5px ;
      box-shadow: inset 5px 5px 5px black;
      font-size:17px
    }
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