<template>
 <button :class="{ 'variants-btn': true }" @click="answered">
    <p style="text-align: center;">{{ buttonProps.text }}</p>
 </button>
</template>
<script>

export default {
    props: ['buttonProps', 'disabled'],
    methods: {
    data() {},
        // handleMouseDown() {
        //     this.variant_is_pushed = true;
        // },
        // // handleMouseUp() {
        // //     this.variant_is_pushed = false;
        // // },
        answered() {
            this.$emit('getAnswer', this.buttonProps);
        },
    }
}
</script>

<style>
.variants-btn {
  margin: auto;
  min-height: 30px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border-width: 0;
  color: #fff;
  display: grid;
  place-items: center;
}

.variants-btn:focus{
    background-color: rgba(255, 255, 255, 0.8);
    color: #2b2b2bee;
}

/* .variants-btn.pressed {
  background-color: rgba(255, 255, 255, 0.8);
  color: #2b2b2bee;
} */
</style>
