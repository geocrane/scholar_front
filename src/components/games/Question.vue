<template>
  <body class="background">
    <div class="quest-wrapper">
      <!-- Сообщение о достижении -->
      <div class="quest-achievement">
        <p class="text">Звание: {{ this.achievement }}</p>
      </div>

      <!-- Панель с номерами вопросов -->
      <div class="quest-numbers">
        <span
          v-for="(item, index) in this.scale_data"
          :key="index"
          :class="{
            notanswered: !item.is_answered,
            correct: item.is_answered && item.is_correct_answer,
            incorrect: item.is_answered && !item.is_correct_answer,
            current: item.number === number
          }"
        >
          {{ item.number }}
        </span>
      </div>

      <!-- Вопрос -->
      <div class="quest-question">
        <p class="quest-question-text quest-preamble">{{ this.preamble }}</p>
        <p class="quest-question-text">
          <span v-html="fable"></span>
        </p>
      </div>

      <!-- Кнопки с ответами -->
      <div
        :class="{
          'quest-variants-btn-9': shuffledVariants.length === 9,
          'quest-variants-btn-4':
            shuffledVariants.length > 2 && shuffledVariants.length < 9,
          'quest-variants-btn-2': shuffledVariants.length === 2
        }"
        class="quest-variants-btn"
      >
        <answersButton
          v-for="variant in shuffledVariants"
          :key="variant.id"
          :buttonProps="variant"
          :count="shuffledVariants.length"
          @getAnswer="getAnswer"
        />
      </div>

      <!-- Кнопка отправить ответ -->
      <div class="quest-next-btn">
        <p class="text">
          <button
            :class="{
              'next-btn': this.is_answer_choosen,
              'next-btn-inactive': !this.is_answer_choosen
            }"
            v-on:click="submitAnswer()"
          >
            <span v-if="!this.loading">ОТВЕТИТЬ</span>
            <b-spinner v-else variant="light" small></b-spinner>
          </button>
        </p>
      </div>
    </div>

    <!-- Модальное окно с ответом -->
    <Modal
      v-if="showModal"
      @close="handleClose"
      :is_correct_modal_bool="this.is_correct_modal_bool"
      :is_correct_text="this.is_correct_text"
      :send_button="this.send_button"
    >
      <!-- <p class="is_true">{{ is_true }}</p> -->
      <template v-slot:header-0>
        <p class="fable">
          <span v-html="fable"></span>
        </p>
      </template>
      <template v-slot:header>
        <p class="example">
          <span v-html="example"></span>
        </p>
      </template>
      <template v-slot:default>
        <p class="comment">
          Комментарий:<br />
          <span v-html="comment"></span>
        </p>
      </template>
    </Modal>

    <!-- Модальное окно с поздравлением -->
    <ModalAchievment v-if="showAchievment">
      <!-- <p class="is_true">{{ is_true }}</p> -->
      <template v-slot:header>
        <p class="achievment-example">Верно!</p>
      </template>
      <template v-slot:default>
        <p class="achievment-comment">{{ is_correct_text }}</p>
        <p class="achievment-stars">{{ stars }}</p>
      </template>
    </ModalAchievment>
  </body>
</template>
<script>
import Button from "@/components/Button.vue";
import config from "@/scripts/api-config";
import constants from "@/scripts/constants";
import axios from "axios";
import ModalAchievment from "./ModalAchievment.vue";
import Modal from "./ModalAnswerResult.vue";

const API_URL = config["API_LOCATION"];

export default {
  components: {
    Modal,
    ModalAchievment,
    answersButton: Button
  },
  data() {
    return {
      loading: false,
      showModal: false,
      showAchievment: false,
      session: "",
      number: "",
      question_id: "",
      is_answered: "",
      is_correct_answer: "",
      is_true: "",
      preamble: "",
      fable: "",
      example: "",
      comment: "",
      variants: [],
      shuffledVariants: [],
      send_button: "Следующий вопрос",
      achievement: "",
      score: "",
      scale_data: [],
      selected_answer: {},
      stars: "",
      is_answer_choosen: false,
      is_correct_text: "",
      is_correct_modal_bool: ""
    };
  },
  watch: {
    "$route.params.question_number"(newId, oldId) {
      this.loadDataForNewRoute(newId);
    },

    variants(newVariants) {
      this.shuffledVariants = this.shuffleArray([...newVariants]);
    }
  },
  mounted() {
    this.loading = true;
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
        if (this.is_answered == true) {
          this.showModal = true;
        }
        this.shuffledVariants = this.shuffleArray([...this.variants]);
      })
      .catch(error => {
        console.log(error.response.data);
        for (var key in error.response.data) {
          this.errors = error.response.data[key];
        }
      });
    this.loading = false;
  },

  methods: {
    shuffleArray(array) {
      if (array.length != 4) {
        return array.sort((a, b) => {
          if (a.text < b.text) {
            return -1;
          }
          if (a.text > b.text) {
            return 1;
          }
          return 0;
        });
      } else {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      return array;
    },

    openAchievmentModal() {
      this.showAchievment = true;
      setTimeout(() => {
        this.openSecondModal();
      }, 1500);
    },

    openSecondModal() {
      this.showAchievment = false;
      this.showModal = true;
    },

    handleClose() {
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
      this.showModal = false;
    },

    getAnswer(data) {
      this.selected_answer = data;
      this.is_answer_choosen = true;
    },

    submitAnswer() {
      if (!this.is_answer_choosen) {
        console.log("Не выбран вариант ответа");
      } else {
        this.pushAnswer();
      }
    },

    async pushAnswer() {
      this.loading = true;
      try {
        const response = await axios.post(API_URL + "answer/", {
          session: this.session,
          question: this.question_id,
          variant: this.selected_answer.id,
          score: this.selected_answer.is_true
        });

        if (response.status === 201) {
          if (this.number > 14) {
            this.send_button = "Завершить";
          } else {
            this.send_button = "Следующий вопрос";
          }
          if (this.selected_answer.is_true) {
            this.is_correct_text = "ВЕРНО!";
            this.is_correct_modal_bool = true;
          } else {
            this.is_correct_text = "ОШИБКА!";
            this.is_correct_modal_bool = false;
          }
          if (this.score == 4 && this.selected_answer.is_true) {
            this.achievement = constants["NORMAL"];
            this.is_correct_text = "Вы достигли: " + this.achievement;
            this.stars = "★☆☆";
            this.openAchievmentModal();
          } else if (this.score == 9 && this.selected_answer.is_true) {
            this.achievement = constants["GOOD"];
            this.is_correct_text = "Вы достигли: " + this.achievement;
            this.stars = "★★☆";
            this.openAchievmentModal();
          } else if (this.score == 14 && this.selected_answer.is_true) {
            this.achievement = constants["EXCELENT"];
            this.is_correct_text = "Вы достигли: " + this.achievement;
            this.stars = "★★★";
            this.openAchievmentModal();
          } else {
            // this.openAchievmentModal();
            this.showModal = true;
          }
        } else {
          console.error("Error submitting answer:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
      this.loading = false;
    },

    loadDataForNewRoute(id) {
      return axios
        .get(API_URL + "session/" + this.session + "/" + id + "/")
        .then(response => {
          console.log(response.data);
          this.vars_assignment(response.data);
          if (this.is_answered == true) {
            if (this.is_correct_answer == true) {
              this.is_correct_modal_bool = true;
              this.is_correct_text = "ВЕРНО!";
            } else if (this.is_correct_answer == false) {
              this.is_correct_modal_bool = false;
              this.is_correct_text = "ОШИБКА!";
            }
            this.showModal = true;
          }
          this.shuffledVariants = this.shuffleArray([...this.variants]);
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
      this.score = data["score"];
      this.scale_data = data["scale_data"].sort((a, b) => a.number - b.number);
      this.is_answer_choosen = false;
    }
  }
};
</script>
<style>
.quest-wrapper {
  /* background-color: beige; */
  display: grid;
  grid-gap: 10px;
  grid-auto-flow: dense;
  place-items: center;
  height: 100vh;
  margin: 0;
  grid-template-rows: 20px 40px minmax(140px, auto) auto auto 20px;
  width: 100%;
  max-width: 500px;
}

.quest-achievement {
  padding: 0 5px;
  margin-top: 20px;
  grid-row: 1;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.quest-numbers {
  width: 90%;
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
  width: 90%;
  min-width: 270px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  min-height: 1em;
  padding: 1em;
  overflow-y: auto;
}

.quest-question-text {
  margin-bottom: 0;
  font-size: 18px;
  text-align: justify;
  hyphens: auto;
  color: #fff;
}
.quest-preamble {
  font-weight: 600;
  margin-bottom: 10px;
  padding-bottom: 10px;
  line-height: 1.2;
}
.quest-variants-btn {
  grid-row: 4;
  padding: 10px 10px 20px 10px;
  width: 90%;
  min-width: 270px;
  height: 90%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  display: grid;
  grid-gap: 5px;
  justify-content: center;
}

.quest-variants-btn-2 {
  grid-template-columns: repeat(auto-fit, minmax(10%, 1fr));
}

.quest-variants-btn-4 {
  grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
}

.quest-variants-btn-9 {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: auto;
}

.quest-next-btn {
  grid-row: 5;
  width: 90%;
  min-width: 270px;
  border-radius: 10px;
  border-width: 0;
  display: grid;
}

.next-btn {
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border-width: 0;
  color: #fff;
}

.next-btn-inactive {
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border-width: 0;
  color: rgba(0, 0, 0, 0.3);
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
  color: rgb(110, 110, 110);
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

.fable {
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  margin-top: 5px;
  padding: 10px;
  text-align: justify;
  hyphens: auto;
  /* font-weight: bold; */
  font-size: 14px;
}

.example {
  text-align: justify;
  hyphens: auto;
  /* font-weight: bold; */
  font-style: italic;
  font-size: 14px;
}

.comment {
  text-align: justify;
  hyphens: auto;
}

.achievment-example {
  font-size: 24px;
}

.achievment-comment {
  font-size: 24px;
}

.achievment-stars {
  font-size: 50px;
  text-align: center;
}

.is_true {
  width: 80%;
  font-size: 25px;
}
.mq {
  color: rgb(255, 255, 255);
  background-color: rgb(104, 131, 134);
}
.ma {
  color: rgb(255, 0, 0);
  background-color: rgb(233, 233, 237);
  font-weight: bold;
}

@media screen and (max-width: 400px) {
  .quest-question {
    max-height: 250px;
  }
  .quest-variants-btn {
    padding: 5px 10px 20px 10px;
  }
}

@media screen and (max-width: 350px) {
  .quest-question {
    max-height: 180px;
  }
  .quest-variants-btn {
    padding: 10px 10px 20px 10px;
  }
  .quest-variants-btn-9 {
    width: auto;
    /* gap:  10px; */
  }
  .quest-question-text {
    font-size: 14px;
  }
}
</style>
