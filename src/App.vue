


<template>
  <div class="container">
    <div class="option">
      <Icon
        @click="switcher=!switcher"
        :class="{ active: switcher}"
        icon="ion:options"
        height="25"
      />
    </div>
    <div class="container_wethers" v-if="switcher">
      <Weather v-for="item in fetchDataResult" :key="item" :fetchDataResult="item" />
    </div>

    <Options
      v-else
      @remove="[this.fetchDataResult[$event.from], this.fetchDataResult[$event.to]] = [this.fetchDataResult[$event.to], this.fetchDataResult[$event.from]]"
      @del=" fetchDataResult=fetchDataResult.filter(x=>x.name!==$event)"
      :addData="addData"
      :deleteFetchDataResult="deleteFetchDataResult"
      :error="error"
      :fetchDataResultCity="fetchDataResultCity"
    />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref, computed } from "vue";
import Weather from "./components/Weather.vue";
import Options from "./components/Options.vue";
import { Icon } from "@iconify/vue";
export default defineComponent({
  components: { Weather, Options, Icon },
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
    const fetchDataResult = ref<{ name: string,sys:{country:string} }[]>([заглушка, заглушка2]);

    let fetchDataResultCity = computed((): string[] => {
      let subarr = [];
      fetchDataResult.value.forEach(x => subarr.push(x.name+', '+x.sys.country));
      return subarr;
    });
    

    async function addData() {
      try {
        let asd = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.newCity}&APPID=951a5575c7c37cd3967e7155d77171fd`
        );
        fetchDataResult.value.push(asd.data);
      } catch (error) {
        this.error = "City entered incorrectly"
        setTimeout(()=>this.error = "",1000)
      }
    }

    function deleteFetchDataResult(e){
      console.log(e.currentTarget.dataset.del)
      fetchDataResult.value=fetchDataResult.value.filter(x=>x.name!==e.currentTarget.dataset.del)
    }

    let switcher = ref<boolean>(true);

    return {
      fetchDataResult,
      switcher,
      fetchDataResultCity,
      addData,
      error,
      deleteFetchDataResult
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
  width: 300px;
  height: 500px;
  overflow-y: auto;
  padding: 5px;
  border: 2px solid rgb(14, 42, 182);

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgb(14, 42, 182);
    border: 1px solid white;
  }

  .container_wethers {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .option {
    position: absolute;
    top: 10px;
    right: 10px;
    transition: all 0.5s;
    color: rgb(14, 42, 182);
    z-index: 10;

    & .active {
      color: white;
    }
  }
}
</style>



