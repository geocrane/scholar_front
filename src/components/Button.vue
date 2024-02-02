<template>
    <div class="variants-btn" @click="answered()">
        <p style="text-align: center;">{{ buttonProps.text }} Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
    </div>
</template>
<script>

export default {
    props: ['buttonProps', 'disabled'],
    data() {
        return {
            variant_is_pushed: false,
        };
    },
    methods: {
        answered() {
            this.buttonProps.is_pushed = true
            this.$emit('pushAnswer', { is_pushed: true })
        },
    }
};
</script>

<style>
.variants-btn {
  margin: auto;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  min-height: 30px;
  width: 100%;
  color: #fff;
  display: grid;
  place-items: center;
}

.right {
  color: white;
  background-color: #7aa504;
}

.false {
  color: white;
  background-color: rgb(253, 109, 109);
}

</style>