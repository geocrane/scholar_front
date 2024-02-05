<template>
  <body class="background">
    <div class="quest-wrapper">
      <!-- Сообщение о достижении -->
      <div class="quest-achievement">
        <p>Достижение: {{ this.achievement }}</p>
      </div>

      <!-- Панель с номерами вопросов -->
      <div class="quest-numbers">
        <span
          v-for="(item, index) in this.scale_data"
          :key="index"
          :class="{
            notanswered: !item.is_answered,
            correct: item.is_correct_answer,
            incorrect: !item.is_correct_answer,
            current: item.number === number
          }"
        >
          {{ item.number }}
        </span>
      </div>

      <!-- Вопрос -->
      <div class="quest-question">
        <p class="quest-question-text">
          {{ this.preamble }}:<br />{{ this.fable }}
        </p>
      </div>

      <!-- Кнопки с ответами -->
      <div
        :class="{
          'quest-variants-btn-4': variants.length > 2,
          'quest-variants-btn-2': variants.length === 2
        }"
        class="quest-variants-btn"
      >
        <answersButton
          v-for="variant in variants"
          :key="variant.id"
          :buttonProps="variant"
          @getAnswer="getAnswer"
        />
      </div>

      <!-- Кнопка отправить ответ -->
      <div class="quest-next-btn">
        <p>
          <button class="next-btn" v-on:click="pushAnswer()">
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
      question_id: "",
      is_answered: "",
      is_correct_answer: "",
      preamble: "",
      fable: "",
      example: "",
      comment: "",
      variants: [],
      achievement: "",
      scale_data: [],
      selected_answer: {}
    };
  },
  watch: {
    "$route.params.question_number"(newId, oldId) {
      this.loadDataForNewRoute(newId);
    }
  },
  mounted() {
    axios
      .get(
        API_URL +
          "session/" +
          this.$route.params.session_id +
          "/" +
          this.$route.params.question_number +
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
    getAnswer(data) {
      this.selected_answer = data;
    },

    async pushAnswer() {
      try {
        const response = await axios.post(API_URL + "answer/", {
          session: this.session,
          question: this.question_id,
          variant: this.selected_answer.id,
          score: this.selected_answer.is_true
        });
        if (response.status === 201) {
          this.number += 1;
          if (this.number > 15) {
            this.$router.push({
              name: "summary",
              params: {
                session_id: this.session
              }
            });
          } else {
            this.$router.push({
              name: "question",
              params: {
                session_id: this.session,
                question_number: this.number
              }
            });
          }
        } else {
          console.error("Error submitting answer:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    },

    loadDataForNewRoute(id) {
      return axios
        .get(API_URL + "session/" + this.session + "/" + id + "/")
        .then(response => {
          console.log(response.data);
          this.vars_assignment(response.data);
          this.selected_answer = {};
        });
    },

    // Присвоение переменных из запроса
    vars_assignment(data) {
      this.session = data["session"];
      this.number = data["number"];
      this.question_id = data["id"];
      this.is_answered = data["is_answered"];
      this.is_correct_answer = data["is_correct_answer"];
      this.preamble = data["preamble"];
      this.fable = data["fable"];
      this.example = data["example"];
      this.comment = data["comment"];
      this.variants = data["variants"];
      this.achievement = data["achievement"];
      this.scale_data = data["scale_data"];
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
    }
  }
};
</script>
<style>
.quest-wrapper {
  /* background-color: beige; */
  display: grid;
  place-items: center;
  height: 100vh;
  margin: 0;
  grid-template-rows: 40px 40px auto auto auto 50px;
  width: 100%;
  max-width: 500px;
}

.quest-achievement {
  margin-top: 20px;
  grid-row: 1;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.quest-numbers {
  width: 80%;
  grid-row: 2;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  padding: 0 5px;
}

.quest-question {
  grid-row: 3;
  width: 80%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  min-height: 1em;
  padding: 1em;
}

.quest-question-text {
  font-size: 12px;
  text-align: justify;
  color: #fff;
}

.quest-variants-btn {
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

.quest-variants-btn-2 {
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
}

.quest-variants-btn-4 {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.quest-next-btn {
  grid-row: 5;
  width: 80%;
  border-radius: 10px;
  border-width: 0;
  display: grid;
}

.next-btn {
  height: 40px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border-width: 0;
  color: #fff;
}

.correct {
  font-size: 12px;
  color: rgb(2, 255, 2);
}

.incorrect {
  font-size: 12px;
  /* color: red; */
  text-decoration: line-through;
  text-decoration-color: red;
}

.notanswered {
  font-size: 12px;
  color: rgb(168, 168, 168);
  text-decoration: none;
}

.current {
  display: inline-block;
  width: 18px; /* Ширина кружочка */
  height: 18px; /* Высота кружочка */
  line-height: 15px; /* Высота строки текста */
  text-align: center; /* Центрирование текста */
  border-radius: 50%; /* Сделать форму круглой */
  background-color: #f0f0f0; /* Цвет фона кружочка */
  color: #333; /* Цвет текста */
  font-size: 12px; /* Размер шрифта */
  margin: 2px; /* Отступ для удобства чтения */
  text-decoration: none;
}
</style>
