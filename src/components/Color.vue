<template>
  <div class="color" v-bind:style="styleObject">
    <div class="color_settings">
      <div
        ref="BackgroundButton"
        @click="switcher='Background'"
        v-bind:style="styleObject"
      >Background</div>
      <div ref="ShadowButton" @click="switcher='Shadow'" v-bind:style="styleObject">Shadow</div>
    </div>
    <div v-if="switcher==='Background'">
      <div class="color_item">
        <span>Background:</span>
        <input
          type="color"
          @input="changeStyle($event, 'Background')"
          v-model="styleObject.background"
        />
      </div>
      <div class="color_item">
        <span>Color:</span>
        <input type="color" @input="changeStyle($event, 'Color')" v-model="styleObject.color" />
      </div>
    </div>

    <div v-if="switcher==='Shadow'">
      <div class="color_item">
        <span>Box-shadow 1:</span>
        <input
          type="color"
          @input="changeStyle($event, 'Box-shadow 1')"
          v-model="styleObject.boxShadow1"
        />
      </div>
      <div class="color_item">
        <span>Box-shadow 2:</span>
        <input
          type="color"
          @input="changeStyle($event, 'Box-shadow 2')"
          v-model="styleObject.boxShadow2"
        />
      </div>
      <div class="color_item">
        <span>Box-shadow 3:</span>
        <input
          type="color"
          @input="changeStyle($event, 'Box-shadow 3')"
          v-model="styleObject.boxShadow3"
        />
      </div>
    </div>

    <div class="color_buttons">
      <Icon @click="setDefaultStyle" icon="material-symbols:disabled-by-default" height="35" />
      <Icon icon="material-symbols:save" @click="saveStyle(styleObject)" height="35" />
      <span>{{message}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted } from "vue";
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

    let BackgroundButton = ref(null);
    let ShadowButton = ref(null);
    function clickColorSettingsItem(tag) {
      switch (tag) {
        case "Background":
          ShadowButton.value.style.zIndex = 1;
          BackgroundButton.value.animate(
            [
              { zIndex: 0, boxShadow: BackgroundButton.value.style.boxShadow },
              {
                zIndex: 0,
                transform: "translate(2px, 2px)",
                boxShadow: `1px 1px ${styleObject.value.boxShadow1}, 0 0 0px 0.5px ${styleObject.value.boxShadow2}, 3px 3px ${styleObject.value.boxShadow3},           3.5px 3.5px 0 ${styleObject.value.boxShadow1}, 3px 3px 0 0.5px ${styleObject.value.boxShadow2}`
              },
              {
                zIndex: 0,
                transform: "none",
                boxShadow: BackgroundButton.value.style.boxShadow
              }
            ],
            {
              duration: 500,
              easing: "ease"
            }
          );
          break;
          case "Shadow":
          
          ShadowButton.value.animate(
            [
              { zIndex: 0, boxShadow: BackgroundButton.value.style.boxShadow },
              {
                zIndex: 0,
                transform: "translate(2px, 2px)",
                boxShadow: `1px 1px ${styleObject.value.boxShadow1}, 0 0 0px 0.5px ${styleObject.value.boxShadow2}, 3px 3px ${styleObject.value.boxShadow3},           3.5px 3.5px 0 ${styleObject.value.boxShadow1}, 3px 3px 0 0.5px ${styleObject.value.boxShadow2}`
              },
              {
                zIndex: 0,
                transform: "none",
                boxShadow: BackgroundButton.value.style.boxShadow
              }
            ],
            {
              duration: 500,
              easing: "ease"
            }
          );
          break;

        default:
          break;
      }
    }
    onMounted(() => {
      BackgroundButton.value.addEventListener("click", () =>
        clickColorSettingsItem("Background")
      );
      ShadowButton.value.addEventListener("click", () =>
        clickColorSettingsItem("Shadow")
      );
    });

    let message = ref<string>("");
    function saveStyle(obj) {
      localStorage.setItem("widgetStyle", JSON.stringify(obj));
      message.value = "Style saved";
      setTimeout(() => (message.value = ""), 1000);
    }

    return {
      changeStyle,
      styleObject,
      switcher,
      setDefaultStyle,
      saveStyle,
      message,
      clickColorSettingsItem,
      BackgroundButton,
      ShadowButton
    };
  }
});
</script>

<style lang="scss" scoped>
.color {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  font-size: 15px;
  box-sizing: border-box;
  padding: 10px;
  padding-bottom: 35px;
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
      padding: 5px 8px;
      border-radius: 15px;
      font-size: 12px;
    }
  }

  .color_buttons {
    position: absolute;
    bottom: 0;

    width: 100%;
    display: flex;
    align-items: center;
  }
  .color_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3px;
    input {
      height: 20px;
      width: 20px;
      padding: 0;
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