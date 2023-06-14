<template>
    <div
        class="button-prase"
        :class="{
            right: buttonProps.is_right && (buttonProps.is_pushed || disabled),
            false: !buttonProps.is_right && buttonProps.is_pushed,
            disabled: disabled
        }"
        @click="answered()">
        <p>{{ buttonProps.title }}</p>
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
.button-prase {
  background: white;
  height: 60px;
  width: 90%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 1px 1px 5px 1px rgb(122, 122, 122, 0.5);
  border-radius: 7px;
  padding-top: 15px;
  padding-bottom: 0px;
  color: #000000;
  font-size: 20px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  text-align: center;
  margin-bottom: 10px;
}

.right {
  color: white;
  background-color: #04a554;
}

.false {
  color: white;
  background-color: rgb(253, 109, 109);
}

@media (max-height: 515px) {
    p {
    font-size: 14px;
    }

    .button-prase {
    height: 45px;
    width: 200px;
    font-size: 18px;
    margin-top: 3%;
    margin-bottom: 3%;
    padding-top: 9px;
    }
}

</style>