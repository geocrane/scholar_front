<template>
  <body class="background">
    <div class="wrapper">
      <div class="instruction instruction-phrase"></div>
      <p
        style="font-size: 10px; text-align: right; margin: 0; padding-right: 10px;"
      >
        {{ this.number }}/10
      </p>
      <div class="question question-phrase">
        <!-- <div class="center-field center-field-phrase"> -->
        <p class="justify-phrase">
          <span v-if="!this.is_pushed"
            ><br />
            <p class="choose-info">ВЫБЕРИ ПРАВИЛЬНОЕ ВЫРАЖЕНИЕ:</p></span
          >
          <span class="justify description" v-else>
            <span v-if="(this, infoFalse)"
              >ОШИБКА: <br />
              {{ this.description }}</span
            >
            <span v-else
              ><br />
              <p class="choose-info"></p
            ></span>
          </span>
        </p>
        <!-- </div> -->
      </div>
      <div class="info-field info-field-phrase">
        <p
          class="info info-phrase"
          :class="{
            right: this.infoRight,
            false: this.infoFalse,
            disabled: this.is_pushed
          }"
        >
          {{ this.notice }}
        </p>
      </div>
      <table>
        <tr>
          <td style="margin-right: 20px;">
            <div
              class="button-prase"
              :class="{
                right: isRight0,
                false: isFalse0,
                disabled: this.is_pushed
              }"
              v-on:click="isAnswer_0()"
            >
              <p class="btn-phrase">{{ this.options[0] }}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div
              class="button-prase"
              :class="{
                right: isRight1,
                false: isFalse1,
                disabled: this.is_pushed
              }"
              v-on:click="isAnswer_1()"
            >
              <p class="btn-phrase">{{ this.options[1] }}</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <span>
      <p v-if="this.is_full == false">
        <button
          :disabled="!this.is_pushed"
          class="next-button next-button_phrase"
          :class="{ inactivephrase: !this.is_pushed }"
          v-on:click="NextVariant()"
        >
          <span v-if="!this.loading">Далее</span>
          <b-spinner v-else variant="light" small></b-spinner>
        </button>
      </p>
      <p v-else>
        <button
          :disabled="!this.is_pushed"
          class="next-button next-button_phrase"
          :class="{ inactivephrase: !this.is_pushed }"
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
  name: "Lexicon",
  data() {
    return {
      isDisabled: false,
      score: 0,
      number: "",
      missed_letter: "",
      right_phrase: "",
      false_phrase: "",
      description: "",
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
          "t3/" +
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
      this.loading = true;
      axios
        .post(API_URL + "t3/" + this.$route.params.session_id + "/variants/")
        .then(response => {
          console.log("resp");
          this.page_vars_reset();
          console.log(response.data);
          this.$router.push({
            name: "t3",
            params: {
              session_id: this.$route.params.session_id,
              variant_id: response.data["variant_id"]
            }
          });
          console.log("push");
          this.vars_assignment(response.data);
          this.is_pushed = false;
          this.loading = false;
        })
        .catch(error => {
          console.log("err");
          this.is_pushed = false;
          console.log(error.response.data);
          for (var key in error.response.data) {
            this.errors = error.response.data[key];
          }
          this.loading = false;
          this.is_pushed = false;
        });
      console.log("Ok");
      this.is_pushed = false;
    },
    isSummary() {
      this.$router.push({
        name: "summary",
        params: { session_id: this.$route.params.session_id }
      });
    },
    isAnswer_0() {
      this.is_pushed = true;
      if (this.options[0] == this.right_phrase) {
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
        // this.get_mistake_variant(this.options[0])
        if (this.is_answered == null) {
          this.update_variant(1, 0);
        }
      }
    },
    isAnswer_1() {
      this.is_pushed = true;
      if (this.options[1] == this.right_phrase) {
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
        // this.get_mistake_variant(this.options[1])
        if (this.is_answered == null) {
          this.update_variant(1, 0);
        }
      }
    },

    vars_assignment(data) {
      this.right_phrase = data["right_phrase"];
      this.false_phrase = data["false_phrase"];
      this.description = data["description"];
      this.number = data["variant_number"];
      this.is_full = data["is_full"];
      this.is_answered = data["answered"];
      this.options.push(this.right_phrase);
      this.options.push(this.false_phrase);
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
    // get_mistake_variant(variant) {
    //     this.mistake = ''
    //     if (variant == this.option_1) {this.mistake = 1}
    //     else if (variant == this.option_2) {this.mistake = 2}
    //     else if (variant == this.option_3) {this.mistake = 3}
    // },
    update_variant(answer_field, score) {
      this.variant_is_pushed = true;
      this.loading = true;
      axios
        .patch(
          API_URL +
            "t3/" +
            this.$route.params.session_id +
            "/variants/" +
            this.$route.params.variant_id +
            "/",
          { answer_field: answer_field, score: score }
        )
        .then(_ => {
          this.loading = false;
        })
        .catch(err => {
          axios
            .patch(
              API_URL +
                "t3/" +
                this.$route.params.session_id +
                "/variants/" +
                this.$route.params.variant_id +
                "/",
              { answer_field: answer_field, score: score }
            )
            .then(_ => {
              this.loading = false;
            })
            .catch(err => {
              this.loading = false;
              this.infoFalse = true;
              this.notice = "!ОШИБКА СЕТИ!";
            });
        });
      this.loading = false;
    }
  }
};
</script>
<style>
p {
  /* margin-top: 0px; */
  font-size: 5vw;
  /* line-height: 1.5; */
}

.justify-phrase {
  text-align: justify;
  margin-bottom: 0;
}

.description {
  font-size: 18px;
  vertical-align: middle;
}

.choose-info {
  font-size: 24px;
  text-align: center;
  vertical-align: middle;
}

.question-phrase {
  /* height: auto; */
  height: 170px;
  margin-top: 5px;
  margin-bottom: 35px;
  padding-top: 15px;
  padding-bottom: 15px;
  overflow-y: scroll;
  /* line-height: 170px; */
}

.center-field-phrase {
  height: 110px;
}

.info-phrase {
  font-size: 25px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
}

.info-field-phrase {
  height: 55px;
  margin-bottom: 0px;
}

.button-prase {
  background: white;
  height: 80px;
  width: 90%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 1px 1px 5px 1px rgb(122, 122, 122, 0.5);
  border-radius: 7px;
  padding-top: 0px;
  padding-bottom: 0px;
  color: #000000;
  /* font-size: calc(1em + 0.8vw); */
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  text-align: center;
  margin-bottom: 0px;
  line-height: 80px;
  display: flex; /* использование flexbox */
  justify-content: center; /* выравнивание по центру по горизонтали */
  align-items: center; /* выравнивание по центру по вертикали */
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 10px;
}

.btn-phrase {
  line-height: 1.3;
  font-size: calc(1em + 0.7vw);
}

/* Игра 5 */
.next-button_phrase {
  background: #4877b5;
  color: #ffffff;
}

.inactivephrase {
  color: rgb(221, 219, 219);
  background: #acbbd4;
}

/* Игра 6 */
/* .next-button_phrase {
  background: #04a554;
  color: #ffffff;
}

.inactivephrase {
  color: rgb(221, 219, 219);
  background: #acd4ad;
} */

/* ---------------- */

.right {
  color: white;
  background-color: #04a554;
}

.false {
  color: white;
  background-color: rgb(253, 109, 109);
}

.instruction-phrase {
  margin-bottom: 0px;
  padding: 5px;
}

.text-instruction-phrase {
  font-size: 18px;
  text-align: center;
  font-weight: bold;
}

@media (max-height: 515px) {
  p {
    /* margin-top: 0px; */
    font-size: 5vw;
    /* line-height: 1.5; */
  }

  .choose-info {
    font-size: 18px;
  }

  .info {
    font-size: 20px;
  }

  .info-field {
    height: 35px;
    margin-bottom: 5%;
  }

  .info-field-phrase {
    /* height: 45px; */
    margin-bottom: 0px;
  }

  .question-phrase {
    /* height: auto; */
    height: 160px;
    margin-top: 5px;
    margin-bottom: 10px;
    padding-top: 25px;
    padding-bottom: 25px;
    overflow-y: scroll;
  }

  .center-field-phrase {
    /* height: auto; */
    height: 100px;
    /* overflow-y: scroll; */
  }

  .button-prase {
    height: 55px;
    /* width: 200px; */
    font-size: 18px;
    margin-top: 3%;
    margin-bottom: 3%;
    /* padding-top: 0px; */
    line-height: 55px;
  }

  .btn-phrase {
    line-height: 1.2;
    font-size: calc(0.8em + 0.01vw);
  }

  .instruction {
    padding-top: 10px;
  }

  .text-instruction {
    font-size: 15px;
  }

  .next-button {
    height: 50px;
    font-size: 18px;
    padding-top: 3px;
  }
}
</style>
