


<template>
  <div class="container">
    <div class="container_wethers">
      <KeepAlive>
        <Weather
          v-if="switcher==='Weather' && fetchDataResult.length>0"
          :fetchDataResult="fetchDataResult[countOfWeather]"
          :styleObject="styleObject"
        />
      </KeepAlive>

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

      <Color
        v-if="switcher==='Color'"
        :changeStyle="changeStyle"
        :styleObject="styleObject"
        :setDefaultStyle="setDefaultStyle"
      />

      <div class="container_wethers_minimenu" ref="menu">
        <div class="container_wethers_minimenu_settings" :style="styleObject">
          <Icon
            class="container_wethers_minimenu_settings_icon"
            @click="switcher='Weather'"
            icon="fluent:weather-cloudy-48-filled"
            height="30"
            :style="{color:styleObject.color}"
          />
          <Icon
            class="container_wethers_minimenu_settings_icon"
            @click="switcher='Option'"
            icon="ion:options"
            height="30"
            :style="{color:styleObject.color}"
          />
          <Icon
            class="container_wethers_minimenu_settings_icon"
            @click="switcher='Color'"
            height="30"
            icon="ic:baseline-color-lens"
            :style="{color:styleObject.color}"
          />
        </div>
        <div class="container_wethers_minimenu_arrows" :style="styleObject">
          <Icon
            height="30"
            class="container_wethers_arrow"
            icon="material-symbols:arrow-circle-left"
            @click="selectNewWeather('prev')"
            :style="{color:styleObject.color}"
          />
          <Icon
            height="30"
            class="container_wethers_arrow"
            icon="material-symbols:arrow-circle-right"
            @click="selectNewWeather('next')"
            :style="{color:styleObject.color}"
          />
        </div>
      </div>
    </div>
    <div class="container_pagination" ref="containerPagination">
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
import { defineComponent, ref, computed, onMounted } from "vue";
import Weather from "./components/Weather.vue";
import Options from "./components/Options.vue";
import Color from "./components/Color.vue";
import { Icon } from "@iconify/vue";
export default defineComponent({
  components: { Weather, Options, Color, Icon },
  setup() {
    let ???????????????? = {
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

    const menu = ref(null);
    const containerPagination = ref(null);
    onMounted(() => {
      menu.value.style.zIndex = 0;
      menu.value.style.transform = "translate(-115%, 5px)";
      menu.value.style.maxHeight = "100px";
      menu.value.animate(
        [
          { maxHeight: "50%", transform: "translate(-115%, 0)" },
          { transform: "translate(5px, 0)" },
          { transform: "none", zIndex: 1 }
        ],
        { delay: 1500, duration: 1000, easing: "ease-in", fill: "forwards" }
      );

      
      containerPagination.value.style.transform = "translateY(-100px)";
      containerPagination.value.animate(
        [{ transform: "translateY(-100px)" }, { transform: "none" }],
        { delay: 1000, duration: 1500, fill: "forwards", easing: "ease-out" }
      );
    });

    let error = ref<string>("");
    const fetchDataResult = ref<any[]>([????????????????]);

    let fetchDataResultCity = computed((): string[] => {
      let subarr = [];
      fetchDataResult.value.forEach(x =>
        subarr.push(x.name + ", " + x.sys.country)
      );
      return subarr;
    });

    async function addData(newCity, welcome = false) {
      if (welcome) {
        try {
          let newWeather = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${newCity.lat}&lon=${newCity.lon}&appid=951a5575c7c37cd3967e7155d77171fd&units=metric`
          );
          fetchDataResult.value = [newWeather.data];
        } catch (error) {}
      } else {
        try {
          let newWeather = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&APPID=951a5575c7c37cd3967e7155d77171fd&units=metric`
          );
          fetchDataResult.value.push(newWeather.data);
        } catch (error) {
          this.error = "City entered incorrectly";
          setTimeout(() => (this.error = ""), 1000);
        }
      }
    }

    function deleteFetchDataResult(e) {
      fetchDataResult.value = fetchDataResult.value.filter(
        x => x.name !== e.currentTarget.dataset.del.split(",")[0]
      );
    }

    let switcher = ref<string>("Weather");
    let countOfWeather = ref<number>(0);
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

    let boxShadow1 = ref<string>("#d203f7");
    let boxShadow2 = ref<string>("#04d1ff");
    let boxShadow3 = ref<string>("#000000");

    let styleObject = ref({
      boxShadow1: boxShadow1.value,
      boxShadow2: boxShadow2.value,
      boxShadow3: boxShadow3.value,
      textShadow: "none",
      background: "#575757", //   ????????? ????????????????, ?????????????????? ?????? ???????? ???????????????? ??????????
      boxShadow: `1px 1px ${boxShadow1.value}, 0 0 0px 0.5px ${boxShadow2.value}, 5px 5px ${boxShadow3.value}               , 5.5px 5.5px 0 ${boxShadow1.value}, 5px 5px 0 0.5px ${boxShadow2.value}`,
      color: "#ffffff"
    });

    function changeStyle(e, tag) {
      switch (tag) {
        case "Background":
          styleObject.value.background = e.target.value;
          break;
        case "Box-shadow 1": //   ????????? ????????????????, ?????????????????? ?????? ???????? ???????????????? ??????????
          styleObject.value.boxShadow = `1px 1px ${e.target.value}, 0 0 0px 0.5px ${boxShadow2.value}, 5px 5px ${boxShadow3.value},           5.5px 5.5px 0 ${e.target.value}, 5px 5px 0 0.5px ${boxShadow2.value}`;
          boxShadow1.value = `${e.target.value}`;
          break;
        case "Box-shadow 2": //   ????????? ????????????????, ?????????????????? ?????? ???????? ???????????????? ??????????
          styleObject.value.boxShadow = `1px 1px ${boxShadow1.value}, 0 0 0px 0.5px ${e.target.value}, 5px 5px ${boxShadow3.value},           5.5px 5.5px 0 ${boxShadow1.value}, 5px 5px 0 0.5px ${e.target.value}`;
          boxShadow2.value = `${e.target.value}`;
          break;
        case "Box-shadow 3": //   ????????? ????????????????, ?????????????????? ?????? ???????? ???????????????? ??????????
          styleObject.value.boxShadow = `1px 1px ${boxShadow1.value}, 0 0 0px 0.5px ${boxShadow2.value}, 5px 5px ${e.target.value},           5.5px 5.5px 0 ${boxShadow1.value}, 5px 5px 0 0.5px ${boxShadow2.value}`;
          boxShadow3.value = `${e.target.value}`;
          break;
        case "Color":
          styleObject.value.color = `${e.target.value}`;
          if (styleObject.value.color === styleObject.value.background) {
            styleObject.value.textShadow = `0 1px 1px ${styleObject.value.boxShadow1}, -1px 0 1px ${styleObject.value.boxShadow1}, 0 -1px 1px ${styleObject.value.boxShadow1} `;
          } else {
            styleObject.value.textShadow = "none";
          }
          break;
      }
    }

    function setDefaultStyle() {
      boxShadow1.value = "#d203f7";
      boxShadow2.value = "#04d1ff";
      boxShadow3.value = "#000000";
      styleObject.value.boxShadow1 = boxShadow1.value;
      styleObject.value.boxShadow2 = boxShadow2.value;
      styleObject.value.boxShadow3 = boxShadow3.value;
      styleObject.value.background = "#575757";
      styleObject.value.color = "#ffffff"; //   ????????? ????????????????, ?????????????????? ?????? ???????? ???????????????? ??????????
      styleObject.value.boxShadow = `1px 1px ${boxShadow1.value}, 0 0 0px 0.5px ${boxShadow2.value}, 5px 5px ${boxShadow3.value},           5.5px 5.5px 0 ${boxShadow1.value}, 5px 5px 0 0.5px ${boxShadow2.value}`;
    }

    //???????????????????????? ?????????? ???? localstorage
    let LSstyles = JSON.parse(localStorage.getItem("widgetStyle"));
    if (LSstyles) {
      styleObject.value = LSstyles;
      boxShadow1.value = LSstyles.boxShadow1;
      boxShadow2.value = LSstyles.boxShadow2;
      boxShadow3.value = LSstyles.boxShadow3;
    }

    //?????????????????????? ?????????????? ??????????????, ?????? ???? ???????????????????? ?? ?????????????? ???????????????? ????????????????
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        addData(
          { lat: position.coords.latitude, lon: position.coords.longitude },
          true
        );
      });
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
      changeStyle,
      styleObject,
      boxShadow1,
      boxShadow2,
      boxShadow3,
      setDefaultStyle,
      menu,
      containerPagination
    };
  }
});
</script>



<style lang="scss" scoped>
@font-face {
  font-family: Mona;
  src: url(./style/TestS??hne-Fett.otf);
}
@keyframes containerApperance {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.container {
  position: relative;
  font-family: Mona;
  font-weight: 600;
  max-width: 350px;
  min-width: 210px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .container_wethers {
    display: flex;
    height: 100%;
    overflow: hidden;
    gap: 4px;
    padding: 10px;

    padding-right: 10px;
    &::-webkit-scrollbar {
      width: 10px;
    }

    &:hover::-webkit-scrollbar-thumb {
      background: rgb(14, 42, 182);
      border: 1px solid #ffffff;
      border-radius: 5px;
    }

    .container_wethers_arrow {
      color: white;
    }

    .container_wethers_minimenu {
      display: flex;
      flex-direction: column;

      gap: 5px;
      z-index: 1;
      .container_wethers_minimenu_settings,
      .container_wethers_minimenu_arrows {
        height: 100%;
        padding: 15px 5px;
        border-radius: 15px;
        background: #000000;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        box-shadow: 1px 1px #bb00ff, 0 0 0px 0.5px #ffffff, 5px 5px #000000;

        .container_wethers_minimenu_settings_icon {
          color: white;
        }
      }
    }
  }

  .container_pagination {
    position: absolute;
    bottom: -10px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    .container_pagination_item {
      height: 8px;
      width: 8px;
      border-radius: 50%;

      background: black;
      box-shadow: 1px 1px #f70303, 0 0 0px 0.5px rgb(236, 236, 236),
        5px 5px rgba(192, 192, 192, 0.712);
      transition: all 0.2s ease-in;
      &:hover {
        transform: scale(1.4);
      }
      &.active {
        transform: translate(5px, 5px) !important;
        box-shadow: none !important;
      }
    }
  }
}

@media (max-width: 300px) {
  .container {
    .container_wethers {
      flex-direction: column;
      .container_wethers_minimenu {
        flex-direction: row;

        .container_wethers_minimenu_settings,
        .container_wethers_minimenu_arrows {
          flex-direction: row;
          width: 50%;
        }
      }
    }
  }
}
</style>



