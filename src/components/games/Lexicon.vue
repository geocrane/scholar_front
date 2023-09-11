<template>
  <body class="background">
    <div class="wrapper">
      <div class="instruction">
        <p class="text-instruction">УГАДАЙ СЛОВО:</p>
      </div>
      <p style="font-size: 10px; text-align: right; margin: 0; padding-right: 10px;">{{ this.number }}/10</p>
      <div class="question">

        <div class="center-field">
          <p class="justify">{{ this.meaning }}</p>
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
        class="button-prase"
        :class="{ right: isRight0, false: isFalse0, disabled: this.is_pushed }"
        v-on:click="isAnswer_0()"
      >
        {{ this.options[0] }}
      </div>
      <div
        class="button-prase"
        :class="{ right: isRight1, false: isFalse1, disabled: this.is_pushed }"
        v-on:click="isAnswer_1()"
      >
        {{ this.options[1] }}
      </div>
      <div
        class="button"
        :class="{ right: isRight2, false: isFalse2, disabled: this.is_pushed }"
        v-on:click="isAnswer_2()"
      >
        {{ this.options[2] }}
      </div>
      <div
        class="button"
        :class="{ right: isRight3, false: isFalse3, disabled: this.is_pushed }"
        v-on:click="isAnswer_3()"
      >
        {{ this.options[3] }}
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
          Далее
        </button>
      </p>
      <p v-else>
        <button
          :disabled="!this.is_pushed"
          class="next-button"
          :class="{ inactive: !this.is_pushed }"
          v-on:click="isSummary()"
        >
          Завершить
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
  name: "Lexicon",
  data() {
    return {
      isDisabled: false,
      score: 0,
      number: "",
      meaning: "",
      word: "",
      option_1: "",
      option_2: "",
      option_3: "",
      options: [],
      is_full: false,
      is_answered: "",
      notice: "",
      mistake: "",
      is_pushed: false,
      isRight0: false,
      isRight1: false,
      isRight2: false,
      isRight3: false,
      isFalse0: false,
      isFalse1: false,
      isFalse2: false,
      isFalse3: false,
      infoRight: false,
      infoFalse: false
    };
  },
  mounted() {
    axios
      .get(
        API_URL +
          "lexicon/" +
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
      axios
        .post(
          API_URL + "lexicon/" + this.$route.params.session_id + "/variants/"
        )
        .then(response => {
          this.page_vars_reset();
          console.log(response.data);
          this.$router.push({
            name: "lexicon",
            params: {
              session_id: this.$route.params.session_id,
              variant_id: response.data["variant_id"]
            }
          });
          // .catch(error => {
          // if (
          //     error.name !== 'NavigationDuplicated' &&
          //     !error.message.includes('Avoided redundant navigation to current location')
          // ) {
          //     console.log(error)
          // }
          // });
          this.vars_assignment(response.data);
        })
        .catch(error => {
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
      if (this.options[0] == this.word) {
        this.isRight0 = true;
        this.infoRight = true;
        this.notice = "ВЕРНО!";
        if (this.is_answered == null) {
          axios.patch(
            API_URL +
              "lexicon/" +
              this.$route.params.session_id +
              "/variants/" +
              this.$route.params.variant_id +
              "/",
            { answer_field: 0, score: 1 }
          );
        }
      } else {
        this.isFalse0 = true;
        this.infoFalse = true;
        this.notice = "НЕВЕРНО!";
        this.get_button_colors();
        this.get_mistake_variant(this.options[0]);
        if (this.is_answered == null) {
          axios.patch(
            API_URL +
              "lexicon/" +
              this.$route.params.session_id +
              "/variants/" +
              this.$route.params.variant_id +
              "/",
            { answer_field: this.mistake, score: 0 }
          );
        }
      }
      this.is_pushed = false;
    },
    isAnswer_1() {
      if (this.options[1] == this.word) {
        this.isRight1 = true;
        this.infoRight = true;
        this.notice = "ВЕРНО!";
        if (this.is_answered == null) {
          axios.patch(
            API_URL +
              "lexicon/" +
              this.$route.params.session_id +
              "/variants/" +
              this.$route.params.variant_id +
              "/",
            { answer_field: 0, score: 1 }
          );
        }
      } else {
        this.isFalse1 = true;
        this.infoFalse = true;
        this.notice = "НЕВЕРНО!";
        this.get_button_colors();
        this.get_mistake_variant(this.options[1]);
        if (this.is_answered == null) {
          axios.patch(
            API_URL +
              "lexicon/" +
              this.$route.params.session_id +
              "/variants/" +
              this.$route.params.variant_id +
              "/",
            { answer_field: this.mistake, score: 0 }
          );
        }
      }
      this.is_pushed = true;
    },
    isAnswer_2() {
      if (this.options[2] === this.word) {
        this.isRight2 = true;
        this.infoRight = true;
        this.notice = "ВЕРНО!";
        if (this.is_answered == null) {
          axios.patch(
            API_URL +
              "lexicon/" +
              this.$route.params.session_id +
              "/variants/" +
              this.$route.params.variant_id +
              "/",
            { answer_field: 0, score: 1 }
          );
        }
      } else {
        this.isFalse2 = true;
        this.infoFalse = true;
        this.notice = "НЕВЕРНО!";
        this.get_button_colors();
        this.get_mistake_variant(this.options[2]);
        if (this.is_answered == null) {
          axios.patch(
            API_URL +
              "lexicon/" +
              this.$route.params.session_id +
              "/variants/" +
              this.$route.params.variant_id +
              "/",
            { answer_field: this.mistake, score: 0 }
          );
        }
      }
      this.is_pushed = true;
    },
    isAnswer_3() {
      if (this.options[3] === this.word) {
        this.isRight3 = true;
        this.infoRight = true;
        this.notice = "ВЕРНО!";
        if (this.is_answered == null) {
          axios.patch(
            API_URL +
              "lexicon/" +
              this.$route.params.session_id +
              "/variants/" +
              this.$route.params.variant_id +
              "/",
            { answer_field: 0, score: 1 }
          );
        }
      } else {
        this.isFalse3 = true;
        this.infoFalse = true;
        this.notice = "НЕВЕРНО!";
        this.get_button_colors();
        this.get_mistake_variant(this.options[3]);
        if (this.is_answered == null) {
          axios.patch(
            API_URL +
              "lexicon/" +
              this.$route.params.session_id +
              "/variants/" +
              this.$route.params.variant_id +
              "/",
            { answer_field: this.mistake, score: 0 }
          );
        }
      }
      this.is_pushed = true;
    },
    vars_assignment(data) {
      this.meaning = data["meaning"];
      this.word = data["word"];
      this.number = data["variant_number"];
      this.option_1 = data["option_1"];
      this.option_2 = data["option_2"];
      this.option_3 = data["option_3"];
      this.is_full = data["is_full"];
      this.is_answered = data["answered"];
      this.options.push(this.word);
      this.options.push(this.option_1);
      this.options.push(this.option_2);
      this.options.push(this.option_3);
      this.options = this.options.sort(() => Math.random() - 0.5);
    },
    get_button_colors() {
      if (this.options[0] == this.word) {
        this.isRight0 = true;
      } else if (this.options[1] == this.word) {
        this.isRight1 = true;
      } else if (this.options[2] == this.word) {
        this.isRight2 = true;
      } else if (this.options[3] == this.word) {
        this.isRight3 = true;
      }
    },
    page_vars_reset() {
      this.options = [];
      this.notice = "";
      this.is_pushed = false;
      this.isRight0 = false;
      this.isRight1 = false;
      this.isRight2 = false;
      this.isRight3 = false;
      this.isFalse0 = false;
      this.isFalse1 = false;
      this.isFalse2 = false;
      this.isFalse3 = false;
      this.infoRight = false;
      this.infoFalse = false;
    },
    get_mistake_variant(variant) {
      this.mistake = "";
      if (variant == this.option_1) {
        this.mistake = 1;
      } else if (variant == this.option_2) {
        this.mistake = 2;
      } else if (variant == this.option_3) {
        this.mistake = 3;
      }
    }
  }
};
</script>
<style>

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

.center-field {
  margin-bottom: 8px;
  height: 75px;
}

.button {
  height: 35px;
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
