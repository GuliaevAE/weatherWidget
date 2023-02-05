<template>
  <div class="color" v-bind:style="styleObject">
    <div>Color</div>
    <div class="color_item">
      <span>Background:</span>
      <input type="color" @input="changeBackgroundColor($event, 'Background')" />
    </div>
    <div class="color_item">
      <span>Box-shadow 1:</span>
      <input type="color" @input="changeBackgroundColor($event, 'Box-shadow 1')" />
    </div>
    <!-- <div class="color_item">
        <span>Box-shadow 2:</span> 
        <input type="color"  @input="changeBackgroundColor($event, 'Box-shadow 2')">
    </div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { Icon } from "@iconify/vue";

export default defineComponent({
  components: { Icon },
  props: {
    changeBackgroundColor: Function as PropType<(e1, e2) => void>,
    styleObject: Object
  },

  setup(props) {
    let changeBackgroundColor = props.changeBackgroundColor;

    let styleObject = ref(props.styleObject);
    return { changeBackgroundColor, styleObject };
  }
});
</script>

<style lang="scss" scoped>
.color {
  display: flex;
  flex-direction: column;

  width: 100%;
  font-size: 18px;
  box-sizing: border-box;
  padding: 10px;
  gap: 5px;
  min-width: 100px;
  min-height: 100px;

  background: rgb(0, 0, 0);
  border-radius: 15px;
  box-shadow: 5px 5px rgba(128, 128, 128, 0.712);
  color: white;

  .color_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      &::-webkit-color-swatch {
        border: none;
      }

      &::-webkit-color-swatch-wrapper {
        padding: 0;
      }
    }
  }
}
</style>