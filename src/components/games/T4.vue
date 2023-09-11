<template>
  <body class="background">
    <div class="wrapper">
      <div class="instruction">
        <p class="text-instruction">
          Выбери правильную форму множественного числа:
        </p>
      </div>
      <p
        style="font-size: 10px; text-align: right; margin: 0; padding-right: 10px;"
      >
        {{ this.number }}/10
      </p>
      <div class="question">
        <div class="center-field">
          <p class="justify t4-question-font">{{ this.question }}</p>
        </div>
      </div>
      <div class="info-field">
        <p
          class="info"
          :class="{
            right: this.infoRight,
            false: this.infoFalse,
            disabled: this.is_pushed
          }"
        >
          {{ this.notice }}
        </p>
      </div>
      <div
        class="button"
        :class="{ right: isRight0, false: isFalse0, disabled: this.is_pushed }"
        v-on:click="isAnswer_0()"
      >
        {{ this.options[0] }}
      </div>
      <div
        class="button"
        :class="{ right: isRight1, false: isFalse1, disabled: this.is_pushed }"
        v-on:click="isAnswer_1()"
      >
        {{ this.options[1] }}
      </div>
    </div>
    <span>
      <p v-if="this.is_full == false">
        <button
          :disabled="!this.is_pushed"
          class="next-button"
          :class="{ inactive: !this.is_pushed }"
          v-on:click="NextVariant()"
        >
          <span v-if="!this.loading">Далее</span
          ><b-spinner v-else variant="light" small></b-spinner>
        </button>
      </p>
      <p v-else>
        <button
          :disabled="!this.is_pushed"
          class="next-button"
          :class="{ inactive: !this.is_pushed }"
          v-on:click="isSummary()"
        >
          <span v-if="!this.loading">Завершить</span
          ><b-spinner v-else variant="light" small></b-spinner>
        </button>
      </p>
    </span>
  </body>
</template>
<script>
import config from "@/scripts/api-config";
import axios from "axios";

const API_URL = config["API_LOCATION"];

export default {
  name: "T4",
  data() {
    return {
      isDisabled: false,
      score: 0,
      number: "",
      question: "",
      option_0: "",
      option_1: "",
      options: [],
      is_full: false,
      is_answered: "",
      notice: "",
      mistake: "",
      is_pushed: false,
      isRight0: false,
      isRight1: false,
      isFalse0: false,
      isFalse1: false,
      infoRight: false,
      infoFalse: false,
      loading: false
    };
  },
  mounted() {
    axios
      .get(
        API_URL +
          "t4/" +
          this.$route.params.session_id +
          "/variants/" +
          this.$route.params.variant_id +
          "/"
      )
      .then(response => {
        console.log(response.data);
        this.vars_assignment(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
        for (var key in error.response.data) {
          this.errors = error.response.data[key];
        }
      });
  },
  methods: {
    NextVariant() {
      this.is_pushed = false;
      console.log(this.is_pushed);
      this.loading = true;
      axios
        .post(API_URL + "t4/" + this.$route.params.session_id + "/variants/")
        .then(response => {
          this.page_vars_reset();
          console.log(response.data);
          this.$router.push({
            name: "t4",
            params: {
              session_id: this.$route.params.session_id,
              variant_id: response.data["variant_id"]
            }
          });
          this.loading = false;
          this.vars_assignment(response.data);
        })
        .catch(error => {
          this.loading = false;
          console.log(error.response.data);
          for (var key in error.response.data) {
            this.errors = error.response.data[key];
          }
        });
    },
    isSummary() {
      this.$router.push({
        name: "summary",
        params: { session_id: this.$route.params.session_id }
      });
    },
    isAnswer_0() {
      this.is_pushed = true;
      console.log(this.is_pushed);
      if (this.options[0] == this.option_0) {
        this.isRight0 = true;
        this.infoRight = true;
        this.notice = "ВЕРНО!";
        if (this.is_answered == null) {
          this.update_variant(0, 1);
        }
      } else {
        this.isFalse0 = true;
        this.infoFalse = true;
        this.notice = "НЕВЕРНО!";
        this.get_button_colors();
        // this.get_mistake_variant(this.options[0]);
        if (this.is_answered == null) {
          this.update_variant(1, 0);
        }
      }
    },
    isAnswer_1() {
      this.is_pushed = true;
      console.log(this.is_pushed);
      if (this.options[1] == this.option_0) {
        this.isRight1 = true;
        this.infoRight = true;
        this.notice = "ВЕРНО!";
        if (this.is_answered == null) {
          this.update_variant(0, 1);
        }
      } else {
        this.isFalse1 = true;
        this.infoFalse = true;
        this.notice = "НЕВЕРНО!";
        this.get_button_colors();
        // this.get_mistake_variant(this.options[0]);
        if (this.is_answered == null) {
          this.update_variant(1, 0);
        }
      }
    },
    vars_assignment(data) {
      this.question = data["question"];
      this.option_0 = data["option_0"];
      this.number = data["variant_number"];
      this.option_1 = data["option_1"];
      this.is_full = data["is_full"];
      this.is_answered = data["answered"];
      this.options.push(this.option_0);
      this.options.push(this.option_1);
      this.options = this.options.sort(() => Math.random() - 0.5);
    },
    get_button_colors() {
      if (this.options[0] == this.option_0) {
        this.isRight0 = true;
      } else if (this.options[1] == this.option_0) {
        this.isRight1 = true;
      }
    },
    page_vars_reset() {
      this.options = [];
      this.notice = "";
      this.is_pushed = false;
      console.log(this.is_pushed);
      this.isRight0 = false;
      this.isRight1 = false;
      this.isFalse0 = false;
      this.isFalse1 = false;
      this.infoRight = false;
      this.infoFalse = false;
    },
    get_mistake_variant(variant) {
      this.mistake = "";
      if (variant == this.option_1) {
        this.mistake = 1;
      }
    },
    update_variant(answer_field, score) {
      this.variant_is_pushed = true;
      this.loading = true;
      axios
        .patch(
          API_URL +
            "t4/" +
            this.$route.params.session_id +
            "/variants/" +
            this.$route.params.variant_id +
            "/",
          { answer_field: answer_field, score: score }
        )
        .then(_ => {
          this.is_pushed = true;
          this.loading = false;
          console.log(this.is_pushed);
        })
        .catch(err => {
          axios
            .patch(
              API_URL +
                "t4/" +
                this.$route.params.session_id +
                "/variants/" +
                this.$route.params.variant_id +
                "/",
              { answer_field: answer_field, score: score }
            )
            .then(_ => {
              this.is_pushed = true;
              this.loading = false;
              console.log(this.is_pushed);
            })
            .catch(err => {
              this.is_pushed = true;
              this.loading = false;
              this.infoFalse = true;
              this.notice = "!ОШИБКА СЕТИ!";
              console.log(this.is_pushed);
            });
        });
      this.loading = false;
    }
  }
};
</script>
<style>
.t4-question-font {
  font-size: 30px;
}

.right {
  color: white;
  background-color: #249b42;
}

.false {
  color: white;
  background-color: rgb(253, 109, 109);
}

@media (max-height: 575px) {
  p {
    font-size: 15px;
  }

  .info {
    font-size: 20px;
  }

  .info-field {
    height: 35px;
    margin-bottom: 5%;
  }

  .question {
    /* height: 85px; */
    margin-top: 8px;
    margin-bottom: 15px;
  }

  /* .center-field {
    margin-bottom: 8px;
    height: 75px;
  } */

  .button {
    height: 50px;
    width: 200px;
    font-size: 18px;
    margin-bottom: 5%;
  }

  .instruction {
    padding-top: 10px;
  }

  .text-instruction {
    font-size: 15px;
  }

  .next-button {
    height: 45px;
    font-size: 18px;
    padding-top: 3px;
  }
}
</style>
