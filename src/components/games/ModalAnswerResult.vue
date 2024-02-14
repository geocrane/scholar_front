<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div
          class="modal-container"
          :class="{
            'modal-container-true': is_correct_modal_bool,
            'modal-container-false': !is_correct_modal_bool
          }"
        >
          {{ is_correct_text }}
          <div class="modal-header-0">
            <slot name="header-0"> </slot>
          </div>
          <div class="modal-header">
            <slot name="header"> </slot>
          </div>
          <div class="modal-body">
            <slot class="text-justify"></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                {{ send_button }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    is_correct_modal_bool: Boolean,
    is_correct_text: String,
    send_button: String
  },
  methods: {}
};
</script>

<style scoped>
.modal-mask {
  position: fixed; /* Фиксированное позиционирование */
  z-index: 9999; /* Высокий z-index */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.6); */
  background-image: linear-gradient(
    to bottom right,
    rgba(31, 26, 63, 0.9),
    rgba(11, 82, 68, 1)
  );
  display: table; /* Для центрирования контента */
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 80%;
  margin: 0px auto;
  padding: 20px;
  margin-top: 20px;
  grid-row: 1;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  overflow-y: auto;
}

.modal-container-true {
  background-color: rgba(2, 131, 2, 1);
}

.modal-container-false {
  background-color: rgb(138, 45, 45);
}

.modal-default-button {
  margin: auto;
  width: 80%;
  height: 30px;
  border-radius: 10px;
  border-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 1s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 1s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.5s;
}
.modal-enter .modal-container {
  transform: scale(0);
}
.modal-leave-to .modal-container {
  transform: scale(0);
}

@media screen and (max-width: 350px) {
  .modal-container {
    max-height: 300px;
  }
}
</style>
