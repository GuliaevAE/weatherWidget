<template>
  <div class="options" v-bind:style="styleObject">
    <div class="options_header">Settings</div>
    <div class="options_items">
      <div
        @mousedown="mousedown"
        @mouseup="mouseup"
        class="options_city"
        v-bind:style="{background:styleObject.color, color:styleObject.background}"
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
    </div>

    <span>Add Location:</span>
    <div class="options_addCity">
      <input v-model="newCity" type="text" v-bind:style="{background:styleObject.color, color:styleObject.background}"/>
      <Icon
        @click="addcity(newCity)"
        class="options_addCity_icon"
        icon="material-symbols:add"
        height="40"
        v-bind:style="{color:styleObject.color}"
      />
    </div>
    <span class="options_error">{{error}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { Icon } from "@iconify/vue";

export default defineComponent({
  components: { Icon },
  props: {
    fetchDataResultCity: Array as PropType<string[]>,
    addData: Function,
    deleteFetchDataResult: Function as PropType<(e) => void>,
    error: String,
    styleObject: Object
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
    let styleObject = ref(props.styleObject);
    return {
      switcher,
      mousedown,
      mouseup,
      from,
      newCity,
      addcity,
      error,
      deleteFetchDataResult,
      styleObject
    };
  }
});
</script>

<style lang="scss" scoped>
.options {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  font-size: 18px;
  box-sizing: border-box;
  padding: 10px;
  gap: 5px;

  background: rgb(0, 0, 0);
  border-radius: 15px;
  box-shadow: 5px 5px rgba(128, 128, 128, 0.712);
  color: white;

  .options_items {
    overflow-y: scroll;
    padding-right: 5px;
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgb(255, 255, 255);
      border: 1px solid red;
      border-radius: 5px;
    }
  }

  .options_header {
    font-weight: 700;
  }
  .options_city {
    position: relative;
    display: flex;
    align-items: center;
    padding: 2px 0;
    margin: 5px 0;
    color: black;
    background: white;
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
      right: 0;
      cursor: default;
      
    }
  }

  .options_addCity {
    display: flex;

    input {
      width: 100%;
      color: red;
      padding: 0 5px;
      font-size: 20px;
    }
    .options_addCity_icon {
      color: white;
    }
  }
  .options_error {
    font-weight: 800;
    color: red;
  }
}
</style>