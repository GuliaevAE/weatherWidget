<template>
  <div class="options">
    <div class="options_header">Settings</div>

    <div
      @mousedown="mousedown"
      @mouseup="mouseup"
      class="options_city"
      v-for="(item,k) in fetchDataResultCity"
      :key="item"
      :data-id="k"
      :class="{ active: from==k }"
    >
      <div class="options_city_icon" :data-id="k">
        <Icon :data-id="k" icon="material-symbols:menu" height="25" />
      </div>

      <span :data-id="k">{{item}}</span>
      <Icon
        @click="deleteFetchDataResult"
        :data-del="item"
        class="options_city_delete"
        icon="ic:baseline-delete"
        height="25"
      />
    </div>

    <span>Add Location:</span>
    <div class="options_addCity">
      <input v-model="newCity" type="text" />
      <Icon
        @click="addcity(newCity)"
        class="options_addCity_icon"
        icon="material-symbols:add"
        height="40"
      />
    </div>
    <span class="options_error">{{error}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { Icon } from "@iconify/vue";

export default defineComponent({
  components: {  Icon },
  props: {
    fetchDataResultCity: Array as PropType<string[]>,
    addData: Function,
    deleteFetchDataResult: Function as PropType<(e) => void>,
    error: String
  },

  setup(props) {
    let switcher = ref<boolean>(false);
    let newCity = ref<string>("");
    let addcity = props.addData;
    let deleteFetchDataResult = props.deleteFetchDataResult;

    let from = ref(null);
    let error = ref<string>(props.error);
    function mousedown(e) {
      if (e.target.dataset.id) this.from = e.target.dataset.id;
    }

    function mouseup(e) {
      if (this.from === e.target.dataset.id) return (this.from = null);
      if (!e.target.dataset.id || !this.from) return (this.from = null);
      this.$emit("remove", { from: this.from, to: e.target.dataset.id });
      this.from = null;
    }

    return {
      switcher,
      mousedown,
      mouseup,
      from,
      newCity,
      addcity,
      error,
      deleteFetchDataResult
    };
  }
});
</script>

<style lang="scss" scoped>
.options {
  height: 100%;
  position: relative;
  width: 100%;
  font-size: 18px;
  box-sizing: border-box;
  padding: 10px;
  padding-right: 18px;
  overflow-y:scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgb(14, 42, 182);
    border: 1px solid white;
  }
  .options_header {
    font-weight: 700;
  }
  .options_city {
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px 0;
    margin: 5px 0;
    color: white;
    background: rgb(14, 42, 182);
    cursor: move;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    &.active {
      opacity: 0.7;
    }
    .options_city_icon {
      height: 100%;

      padding: 3px;
      display: flex;
      align-content: center;
    }
    .options_city_delete {
      position: absolute;
      color: white;
      right: 0;
      cursor: default;
      transition: all 0.3s;
    }
  }

  .options_addCity {
    display: flex;

    input {
      border: 1px solid rgb(14, 42, 182);
      width: 100%;
      color: rgb(14, 42, 182);
      padding: 0 5px;
      font-size: 20px;
    }
    .options_addCity_icon {
      color: rgb(14, 42, 182);
    }
  }
  .options_error {
    font-weight: 800;
    color: red;
  }
}
</style>