<template>
  <div class="color" v-bind:style="styleObject">
    <div class="color_settings">
      <div @click="switcher='Background'" v-bind:style="styleObject">Background</div>
      <div @click="switcher='Shadow'" v-bind:style="styleObject">Shadow</div>
    </div>
    <KeepAlive>
      <div v-if="switcher==='Background'">
        <div class="color_item">
          <span>Background:</span>
          <input type="color" @input="changeStyle($event, 'Background')" v-model="styleObject.background" />
        </div>
        <div class="color_item">
          <span>Color:</span>
          <input type="color" @input="changeStyle($event, 'Color')" v-model="styleObject.color"/>
        </div>
      </div>
    </KeepAlive>
    <KeepAlive>
      <div v-if="switcher==='Shadow'">
        <div class="color_item">
          <span>Box-shadow 1:</span>
          <input type="color" @input="changeStyle($event, 'Box-shadow 1')" v-model="styleObject.boxShadow1"/>
        </div>
        <div class="color_item">
          <span>Box-shadow 2:</span>
          <input type="color" @input="changeStyle($event, 'Box-shadow 2')" v-model="styleObject.boxShadow2"/>
        </div>
        <div class="color_item">
          <span>Box-shadow 3:</span>
          <input type="color" @input="changeStyle($event, 'Box-shadow 3')" v-model="styleObject.boxShadow3"/>
        </div>
      </div>
    </KeepAlive>
    <div class="color_buttons">
      <!-- <Icon icon="material-symbols:save" height="35" /> -->
      <Icon @click="setDefaultStyle" icon="material-symbols:disabled-by-default" height="35" />
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
    styleObject: Object,
    setDefaultStyle: Function as PropType<(e) => void>
  },

  setup(props) {

    let switcher = ref<string>("Background");
    let setDefaultStyle = props.setDefaultStyle;
    let changeStyle = props.changeStyle;
    let styleObject = ref(props.styleObject);
    
    return { changeStyle, styleObject, switcher, setDefaultStyle };
  }
});
</script>

<style lang="scss" scoped>
.color {
  display: flex;
  flex-direction: column;
  position: relative;
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
  color: rgb(255, 255, 255);
  .color_settings {
    width: 100%;
    display: flex;
    gap: 2px;
    div {
      padding: 3px 5px;
      border-radius: 15px;
      font-size: 15px;
    }
  }

  .color_buttons {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
  }
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