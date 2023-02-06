<template>
  <div class="color" v-bind:style="styleObject">
    <div>Color</div>
    <div class="color_item">
      <span>Background:</span>
      <input type="color" @input="changeStyle($event, 'Background')" />
    </div>
    <div class="color_item">
      <span>Box-shadow 1:</span>
      <input type="color" @input="changeStyle($event, 'Box-shadow 1')" />
    </div>
    <div class="color_item">
      <span>Box-shadow 2:</span>
      <input type="color" @input="changeStyle($event, 'Box-shadow 2')" />
    </div>
    <div class="color_item">
      <span>Box-shadow 3:</span>
      <input type="color" @input="changeStyle($event, 'Box-shadow 3')" />
    </div>
    <div class="color_item">
        <span>Color:</span>
        <input type="color" @input="changeStyle($event, 'Color')" />
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { Icon } from "@iconify/vue";

export default defineComponent({
  components: { Icon },
  props: {
    changeStyle: Function as PropType<(e1, e2) => void>,
    styleObject: Object
  },

  setup(props) {
    let changeStyle = props.changeStyle;

    let styleObject = ref(props.styleObject);
    return { changeStyle, styleObject };
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