<template>
  <body class="background">
    <div class="sum-wrapper">
      <p class="sum-logo">
        <img
          src="~@/assets/styles/gramotey_white.png"
          style="margin-top: 20px;"
          width="100"
        />
      </p>
      <p class="sum-title">Викторина: "Стань Грамотеем"</p>
      <div class="sum-question">
        <p class="sum-question-text">
          Вы ответили верно на {{ this.score }}
          <span v-if="(this.score < 5) & (this.score > 1)">вопроса</span
          ><span v-else-if="this.score == 1">вопрос</span
          ><span v-else="(this.score >= 5) & (this.score == 0)">вопросов</span>
          из {{ this.questions_count }}
        </p>
        <p class="sum-question-text">
          И достигли звания: <br />
          <Добавить динамическое звание>
        </p>
      </div>
    </div>
  </body>
</template>

<script>
import config from "@/scripts/api-config";
import axios from "axios";

const API_URL = config["API_LOCATION"];

export default {
  name: "Summary",
  data() {
    return {
      score: "",
      questions_count: "15",
      quiz_header: "",
      loader: false
    };
  },
  mounted() {
    axios
      .get(API_URL + "session/" + this.$route.params.session_id + "/")
      .then(response => {
        console.log(response.data);
        this.score = response.data["score"];
      })
      .catch(error => {
        console.log(error.response.data);
        for (var key in error.response.data) {
          this.errors = error.response.data[key];
        }
      });
    this.loader = false;
  },
  methods: {}
};
</script>

<style>
.sum-wrapper {
  display: grid;
  place-items: center;
  height: 100vh;
  margin: 0;
  grid-template-rows: auto 0.3fr 1fr 50px 1fr;
  width: 100%;
  max-width: 500px;
}

.sum-logo {
  /* background-color: rgb(2, 68, 68); */
  font-size: 200%;
  text-align: center;
  grid-row: 1;
}

.sum-title {
  /* background-color: rgb(2, 68, 68); */
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  grid-row: 2;
}

.sum-block {
  padding: 0;
  /* background-color: rgb(182, 166, 230); */
  text-align: center;
  vertical-align: middle;
  grid-row: 3;
}

.sum-background-field {
  display: grid;
  place-items: center;
  grid-template-rows: 1fr;
  margin: 0;
  padding-top: 15px;
  height: 140px;
  width: 250px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.sum-fields-text {
  grid-row: 1;
  display: grid;
  place-items: center;
  grid-template-rows: 1fr 1fr;
  height: 100px;
  font-size: 16px;
  font-weight: normal;
  color: #fff;
  /* background-color: #d74646; */
  margin: 0;
  padding: 0;
}

.sum-labels {
  margin: 0;
  padding: 0;
  float: left;
  padding-right: 30px;
}

.sum-question {
  grid-row: 3;
  width: 80%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  min-height: 1em;
  padding: 1em;
}

.sum-question-text {
  font-size: 14px;
  text-align: center;
  color: #fff;
}
</style>
