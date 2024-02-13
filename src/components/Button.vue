<template>
  <button :class="{ 'variants-btn': true }" @click="answered" tabindex="0">
    <p class="text-align">{{ buttonProps.text }}</p>
  </button>
</template>
<script>
export default {
  props: ["buttonProps", "disabled"],
  methods: {
    answered() {
      this.$emit("getAnswer", this.buttonProps);
    }
  }
};
</script>

<style>
.variants-btn {
  margin: auto;
  min-height: 35px;
  width: 100%;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border-width: 0;
  color: #fff;
  display: grid;
  place-items: center;
}

.variants-btn:focus {
  background-color: rgba(217, 225, 225);
  color: #2b2b2bee;
}

.variants-btn:focus-visible {
  background-color: rgba(217, 225, 225);
  color: #2b2b2bee;
}

.text-align {
  text-align: center;
  margin-bottom: 0;
}

@media screen and (max-width: 350px) {
  .variants-btn {
    min-height: 30px;
    height: 30px;
    font-size: 12px;
  }
}
</style>
