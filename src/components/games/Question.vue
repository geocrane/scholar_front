<template>
  <body class="background">
    <div class="quest-wrapper">

      <!-- Сообщение о достижении -->
      <div class="quest-achievement">
        <p>Достижение</p>
      </div>

      <!-- Панель с номерами вопросов -->
      <div class="quest-numbers">
        <p style="font-size: 14px; text-align: right; margin: 0; padding-right: 10px;">{{ this.number }}</p>
      </div>

      <!-- Вопрос -->
      <div class="quest-question">
        <p class="quest-question-text">
          {{ this.preamble }}<br>{{ this.fable }} Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ipsam esse iure cum, quos voluptatibus voluptates qui! Provident consequuntur unde necessitatibus iure at veniam, nam repudiandae rem illum soluta tempora.</p>
      </div>

      <!-- Кнопки с ответами -->
      <div :class="{'quest-variants-btn-4': variants.length > 2, 'quest-variants-btn-2': variants.length === 2}" class="quest-variants-btn">
        <answersButton v-for="variant in variants" :key="variant.id" :buttonProps="variant" :disabled="disabled" @pushAnswer="pushAnswer"/>
      </div>

      <!-- Кнопка отправить ответ -->
      <div class="quest-next-btn">
       <p>
        <button class="next-btn"
          :disabled="!this.is_pushed"
          v-on:click="PushAnswer()"
        >
          ОТВЕТИТЬ
        </button>
      </p>
    </div>

    </div>


  </body>
</template>
<script>
import Button from "@/components/Button.vue";
import config from "@/scripts/api-config";
import axios from "axios";

const API_URL = config["API_LOCATION"];

export default {
  components: {
		answersButton: Button
	},
  data() {
    return {
      session: "",
      number: "",
      is_answered: "",
      is_correct_answer: "",
      preamble: "",
      fable: "",
      example: "",
      comment: "",
      variants: [],
    };
  },
  mounted() {
    axios
      .get(
        API_URL
        + "session/"
        + this.$route.params.session_id
        + "/"
        + this.$route.params.question_number
        + "/"
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
    pushAnswer(data) {
      this.is_pushed = data.is_pushed;
      this.disabled = true;
    },
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
      this.is_pushed = true;
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

    // Присвоение переменных из запроса
    vars_assignment(data) {
      this.session = data["session"];
      this.number = data["number"];
      this.is_answered = data["is_answered"];
      this.is_correct_answer = data["is_correct_answer"];
      this.preamble = data["preamble"];
      this.fable = data["fable"];
      this.example = data["example"];
      this.comment = data["comment"];
      this.variants = data["variants"];
      },

    vars_reset() {
      this.session = "";
      this.number = "";
      this.is_answered = "";
      this.is_correct_answer = "";
      this.preamble = "";
      this.fable = "";
      this.example = "";
      this.comment = "";
      this.variants = [];
    },
  }
};
</script>
<style>
.quest-wrapper{
  /* background-color: beige; */
  display: grid;
  place-items: center;
  height: 100vh;
  margin: 0;
  grid-template-rows: 40px 40px auto auto auto 50px;
  width: 100%;
  max-width: 500px;
}

.quest-achievement{
  margin-top: 20px;
  grid-row: 1;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.quest-numbers{
  width: 80%;
  grid-row: 2;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.quest-question{
  grid-row: 3;
  width: 80%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  min-height: 1em;
  padding: 1em;
}

.quest-question-text{
  font-size: 12px;
  text-align: justify;
  color: #fff;
}

.quest-variants-btn{
  grid-row: 4;
  padding: 30px;
  width: 80%;
  height: 90%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  justify-content: center;
}

.quest-variants-btn-2{
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
}

.quest-variants-btn-4{
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.quest-next-btn{
  grid-row: 5;
  width: 80%;
  border-radius: 10px;
  border-width: 0;
  display: grid;
}

.next-btn{
  height: 40px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border-width: 0;
  color: #fff;
}
</style>
