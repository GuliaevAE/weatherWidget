


<template>
  <div class="container">
    <div class="container_wethers">
      <Transition>
        <Weather
          v-if="switcher==='Weather'"
          :fetchDataResult="fetchDataResult[countOfWeather]"
          :styleObject="styleObject"
        />
      </Transition>
      <Transition>
        <Options
          v-if="switcher==='Option'"
          :styleObject="styleObject"
          @remove="[this.fetchDataResult[$event.from], this.fetchDataResult[$event.to]] = [this.fetchDataResult[$event.to], this.fetchDataResult[$event.from]]"
          @del=" fetchDataResult=fetchDataResult.filter(x=>x.name!==$event)"
          :addData="addData"
          :deleteFetchDataResult="deleteFetchDataResult"
          :error="error"
          :fetchDataResultCity="fetchDataResultCity"
        />
      </Transition>
      <Transition>
        <Color
          v-if="switcher==='Color'"
          :changeBackgroundColor="changeBackgroundColor"
          :styleObject="styleObject"
        />
      </Transition>

      <div class="container_wethers_minimenu">
        <div class="container_wethers_minimenu_settings" :style="styleObject">
          <Icon
            class="container_wethers_minimenu_settings_icon"
            @click="switcher='Weather'"
            icon="fluent:weather-cloudy-48-filled"
            height="30"
          />
          <Icon
            class="container_wethers_minimenu_settings_icon"
            @click="switcher='Option'"
            icon="ion:options"
            height="30"
          />
          <Icon
            class="container_wethers_minimenu_settings_icon"
            @click="switcher='Color'"
            height="30"
            icon="ic:baseline-color-lens"
          />
        </div>
        <div class="container_wethers_minimenu_arrows" :style="styleObject">
          <Icon
            height="30"
            class="container_wethers_arrow"
            icon="material-symbols:arrow-circle-left"
            @click="selectNewWeather('prev')"
          />
          <Icon
            height="30"
            class="container_wethers_arrow"
            icon="material-symbols:arrow-circle-right"
            @click="selectNewWeather('next')"
          />
        </div>
      </div>
    </div>
    <div class="container_pagination">
      <div
        class="container_pagination_item"
        v-bind:style="styleObject"
        :class="{active :countOfWeather === k }"
        @click="switchNewWeather(k)"
        v-for="(item,k) in fetchDataResult"
        :key="item.name"
        :data-fetchDataResultItem="k"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref, computed } from "vue";
import Weather from "./components/Weather.vue";
import Options from "./components/Options.vue";
import Color from "./components/Color.vue";
import { Icon } from "@iconify/vue";
export default defineComponent({
  components: { Weather, Options, Color, Icon },
  setup() {
    let заглушка = {
      base: "stations",
      clouds: { all: 20 },
      cod: 200,
      coord: { lat: 51.5085, lon: -0.1257 },
      dt: 1675424072,
      id: 2643743,
      main: {
        feels_like: 284.41,
        humidity: 77,
        pressure: 1030,
        temp: 285.14,
        temp_max: 286.08,
        temp_min: 283.76
      },

      name: "gag-London",
      sys: {
        country: "UK",
        id: 2075535,
        sunrise: 1675409784,
        sunset: 1675443126,
        type: 2
      },

      timezone: 0,
      visibility: 10000,
      weather: [
        { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
      ],

      wind: {
        deg: 260,
        speed: 5.66
      }
    };
    let заглушка2 = {
      base: "stations",
      clouds: { all: 20 },
      cod: 200,
      coord: { lat: 51.5085, lon: -0.1257 },
      dt: 1675424072,
      id: 2643743,
      main: {
        feels_like: 284.41,
        humidity: 77,
        pressure: 1030,
        temp: 285.14,
        temp_max: 286.08,
        temp_min: 283.76
      },

      name: "gag2-London",
      sys: {
        country: "UK",
        id: 2075535,
        sunrise: 1675409784,
        sunset: 1675443126,
        type: 2
      },

      timezone: 0,
      visibility: 10000,
      weather: [
        { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
      ],

      wind: {
        deg: 260,
        speed: 5.66
      }
    };
    let error = ref<string>("");
    const fetchDataResult = ref<any[]>([заглушка, заглушка2]);

    let fetchDataResultCity = computed((): string[] => {
      let subarr = [];
      fetchDataResult.value.forEach(x =>
        subarr.push(x.name + ", " + x.sys.country)
      );
      return subarr;
    });

    async function addData() {
      try {
        let newWeather = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.newCity}&APPID=951a5575c7c37cd3967e7155d77171fd&units=metric`
        );
        fetchDataResult.value.push(newWeather.data);
      } catch (error) {
        this.error = "City entered incorrectly";
        setTimeout(() => (this.error = ""), 1000);
      }
    }

    function deleteFetchDataResult(e) {
      console.log(e.currentTarget.dataset.del);
      fetchDataResult.value = fetchDataResult.value.filter(
        x => x.name !== e.currentTarget.dataset.del.split(",")[0]
      );
    }

    let switcher = ref<string>("Weather");

    let countOfWeather = ref<number>(1);
    function selectNewWeather(switcher) {
      switch (switcher) {
        case "next":
          if (this.fetchDataResult.length - 1 === this.countOfWeather)
            this.countOfWeather = 0;
          else this.countOfWeather++;
          break;
        case "prev":
          if (this.countOfWeather - 1 === -1)
            this.countOfWeather = this.fetchDataResult.length - 1;
          else this.countOfWeather--;
      }
    }

    function switchNewWeather(swtcher) {
      this.countOfWeather = swtcher;
    }

    let styleObject = ref({
      background: "",
      boxShadow: `1px 1px rgb(247, 3, 3), 0 0 0px 1px rgb(236, 236, 236), 5px 5px rgba(192, 192, 192, 0.712)`
    });

    function changeBackgroundColor(e, tag) {
      switch (tag) {
        case "Background":
          styleObject.value.background = e.target.value;
          break;

        case "Box-shadow 1":
          styleObject.value.boxShadow = `1px 1px rgb(247, 3, 3), 0 0 0px 1px ${e.target.value}, 5px 5px rgba(192, 192, 192, 0.712)`;
          break;

        
      }
    }
    return {
      fetchDataResult,
      switcher,
      fetchDataResultCity,
      addData,
      error,
      deleteFetchDataResult,
      countOfWeather,
      selectNewWeather,
      switchNewWeather,
      changeBackgroundColor,
      styleObject
    };
  }
});
</script>



<style lang="scss" scoped>
@font-face {
  font-family: Mona;
  src: url(./style/Mona-Sans-Light.otf);
}
.container {
  position: relative;
  font-family: Mona;
  font-weight: 600;
  width: 400px;
  height: 270px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .container_wethers {
    display: flex;
    height: 100%;
    overflow: hidden;
    gap: 5px;
    padding: 5px;
    padding-right: 10px;
    &::-webkit-scrollbar {
      width: 10px;
    }

    &:hover::-webkit-scrollbar-thumb {
      background: rgb(14, 42, 182);
      border: 1px solid white;
      border-radius: 5px;
    }

    .container_wethers_arrow {
      color: white;
    }

    .container_wethers_minimenu {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .container_wethers_minimenu_settings,
      .container_wethers_minimenu_arrows {
        height: 50%;
        padding: 15px 5px;
        border-radius: 15px;
        background: black;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        justify-content: space-around;
        box-shadow: 1px 1px rgb(247, 3, 3), 0 0 0px 1px rgb(236, 236, 236),
          5px 5px rgba(192, 192, 192, 0.712);

        .container_wethers_minimenu_settings_icon {
          color: white;
        }
      }
    }
  }

  .container_pagination {
    position: absolute;
    bottom: -15px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    .container_pagination_item {
      height: 8px;
      width: 8px;
      border-radius: 50%;

      background: black;
      box-shadow: 1px 1px rgb(247, 3, 3), 0 0 0px 1px rgb(236, 236, 236),
        5px 5px rgba(192, 192, 192, 0.712);
      transition: all 0.3s;
      &:hover {
        transform: scale(1.4);
      }
      &.active {
        background: rgb(255, 255, 255) !important;
      }
    }
  }
}
</style>



