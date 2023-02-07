<template>
  <div class="weather" v-bind:style="styleObject">
    <div class="weather_header">
      <span>{{fetchDataResult.name}}</span>
      <div
        class="weather_header_clock"
        v-bind:style="[styleObject, {boxShadow:'-1px -1px '+styleObject.boxShadow1+', 0 0 0 0.5px '+styleObject.boxShadow2+',inset 5px 5px '+styleObject.boxShadow3+',   inset    5.5px 5.5px 0 '+styleObject.boxShadow1+',inset 5px 5px 0 0.5px '+styleObject.boxShadow2}]"
      >
        <span ref="weatherHeaderClock">{{clock}}</span>
      </div>
    </div>

    <div class="weather_iconModule">
      <div
        class="img"
        v-bind:style="styleObject"
        ref="weathericonModule"
        data-id="weather_iconModule-button"
        @mousedown="punchOnButoon($event)"
      >
        <span class="weather_iconModule_contry">{{fetchDataResult.sys.country}}</span>

        <Icon
          icon="material-symbols:toggle-on-outline"
          class="weather_iconModule_actionSwitcher"
          :class="{ off :!actionIcon}"
          @click="actionIcon=!actionIcon"
          height="20"
        />
        <div class="weather_iconModule_contry_icon" :class="{active:actionIcon}">
          <Icon :icon="img" height="40" />
        </div>
      </div>

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
        <span>0°C</span>
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

import { defineComponent, ref, PropType, computed, onMounted } from "vue";
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
    let styleObject = ref(props.styleObject);
    let actionIcon = ref<boolean>(false);
    let img = computed((): string => {
      switch (props.fetchDataResult.weather[0].icon.slice(0,2)) {
        case "01":
          return "mdi:weather-sunny";
        case "02":
          return "mdi:weather-partly-cloudy";
        case "03":
          return "mdi:weather-cloudy";
        case "04":
          return "fluent:weather-cloudy-24-regular";
        case "09":
          return "material-symbols:weather-snowy-outline";
        case "10":
          return "mdi:weather-partly-rainy";
        case "11":
          return "mdi:weather-lightning";
        case "13":
          return "typcn:weather-snow"; 
        case "50":
          return "mdi:weather-mist";
      }
    });
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

    const weathericonModule = ref(null);
    const weatherHeaderClock = ref(null);

    onMounted(() => {
      weathericonModule.value.style.boxShadow = "none";
      setTimeout(() => (actionIcon.value = true), 2100);
      weathericonModule.value.animate(
        [
          {
            boxShadow: weathericonModule.value.style.boxShadow,
            transform: weathericonModule.value.style.transform
          },
          { boxShadow: "none", transform: "translate(5px,5px)" },
          {
            boxShadow: `0px -2px ${styleObject.value.color}`,
            transform: "translate(5px,5px)"
          },
          {
            boxShadow: `2px 0px ${styleObject.value.color}`,
            transform: "translate(5px,5px)"
          },
          {
            boxShadow: `0px 2px ${styleObject.value.color}`,
            transform: "translate(5px,5px)"
          },
          {
            boxShadow: `-2px 0px ${styleObject.value.color}`,
            transform: "translate(5px,5px)"
          },
          {
            boxShadow: `0px -2px ${styleObject.value.color}`,
            transform: "translate(5px,5px)"
          },

          { boxShadow: "none", transform: "translate(5px,5px)" },
          {
            boxShadow: `0 0 0 1px ${styleObject.value.boxShadow1}`,
            transform: "translate(5px,5px)"
          },

          { boxShadow: styleObject.value.boxShadow, transform: "none" }
        ],
        {
          delay: 1500,
          duration: 1000,
          easing: "ease"
        }
      );
      weatherHeaderClock.value.style.position = "relative";
      weatherHeaderClock.value.style.top = "30px";
      weatherHeaderClock.value.animate([{ top: "30px" }, { top: "0" }], {
        delay: 1500,
        duration: 1000,
        easing: "ease-out",
        fill: "forwards"
      });
    });

    function punchOnButoon(e) {
      if ((e.currentTarget.dataset.id = "weather_iconModule-button")) {
        let oldBoxShadow = e.currentTarget.style.boxShadow;
        e.currentTarget.animate(
          [
            { transform: "translate(0px,0px)" },
            { boxShadow: "none", transform: "translate(5px,5px)" },
            { boxShadow: oldBoxShadow, transform: "translate(0px,0px)" }
          ],
          { duration: 500, easing: "ease" }
        );
        actionIcon.value = !actionIcon.value;
      }
    }

    return {
      img,
      styleObject,
      clock,
      actionIcon,
      punchOnButoon,
      weathericonModule,
      weatherHeaderClock
    };
  }
});
</script>

<style lang="scss" scoped>
@keyframes activeIcon {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.weather {
  color: rgb(255, 255, 255);
  background: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  width: 100%;
  z-index: 1;
  font-size: 15px;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 1px 1px rgb(247, 3, 3), 0 0 0px 1px rgb(236, 236, 236),
    5px 5px rgb(192, 192, 192);

  .weather_iconModule {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
    .img {
      cursor: pointer;
      position: relative;
      padding: 18px;
      background: rgba(18, 49, 205, 0);
      border-radius: 15px;
      box-shadow: 1px 1px rgb(247, 3, 3), 0 0 0px 1px rgb(236, 236, 236),
        5px 5px rgb(192, 192, 192), 5px 5px 0 1px rgba(255, 0, 0, 0.712);

      .weather_iconModule_contry_icon {
        &.active {
          animation: activeIcon 3s infinite linear;
        }
      }

      .weather_iconModule_contry {
        position: absolute;
        top: 5px;
        left: 5px;
      }
      .weather_iconModule_actionSwitcher {
        position: absolute;
        bottom: 5px;
        right: 5px;

        &.off {
          transform: rotateY(180deg);
        }
      }
    }
  }
  .weather_header {
    min-height: 46px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;

    text-transform: uppercase;
    .weather_header_clock {
      position: relative;
      overflow: hidden;
      align-self: baseline;
      width: 30%;
      min-width: 85px;
      box-sizing: border-box;
      border-radius: 10px;
      padding-bottom: 5px;

      padding-left: 8px;
      padding-right: 1px;
      margin-left: 5px;
      box-shadow: inset 5px 5px 5px black;
      font-size: 17px;
      //   ↓под вопросом,
      span {
        text-shadow: 5px 5px rgba(0, 0, 0, 0.333);
      }
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