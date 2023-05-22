<template>
  <body class="background">
    <div class="wrapper">
      <p class="text-tittle">
        <img
          src="~@/assets/styles/gramotey.png"
          style="margin-top: 20px;"
          width="100"
        />
      </p>
      <p
        style="font-size: 20px; font-weight: bold; color: #355DA4; text-align: center;"
      >
        Викторина {{ this.quiz_header }}
      </p>
      <div class="meaning-registration">
        <div class="registration">
          <fieldset class="field">
            <p style="font-weight: bold; color: #355DA4;">
              <label for="territorial_bank">Тер. банк:</label>
              <select
                class="bank-select"
                v-model="bank"
                type="text"
                id="territorial_bank"
              >
                <option v-for="bank in this.ter_banks">{{ bank }}</option>
              </select>
            </p>
            <p style="font-weight: bold; margin-bottom: 5px; color: #355DA4;">
              <label for="personnel_number">Таб. номер:</label
              ><input
                class="number-input"
                v-model="personnel_number"
                type="text"
                id="personnel_number"
                placeholder="0XXXXXXX"
              />
            </p>
          </fieldset>
          <p class="errors">{{ this.errors }}</p>
          <div class="reg-button">
            <button class="registration-button" v-on:click="SendAutorization()">
              Начать
            </button>
          </div>
        </div>
      </div>
      <div class="variants"></div>
    </div>
  </body>
</template>

<script>
import config from "@/scripts/api-config";
import axios from "axios";

const API_URL = config["API_LOCATION"];

export default {
  name: "Autorization",
  data() {
    return {
      first_name: "",
      last_name: "",
      bank: "",
      personnel_number: "",
      session_id: "",
      errors: "",
      quiz_header: "",
      ter_banks: [
        "ЦА",
        "ББ",
        "ВВБ",
        "ДВБ",
        "МБ",
        "ПБ",
        "СЗБ",
        "СиБ",
        "СРБ",
        "УБ",
        "ЦЧБ",
        "ЮЗБ"
      ]
    };
  },
  mounted() {
    axios.get(API_URL + "get_actual_quiz/").then(header => {
      if (header.data["quiz_type"] == "orthography") {
        this.quiz_header = '"Орфография"';
      } else if (header.data["quiz_type"] == "lexicon") {
        this.quiz_header = '"Лексикон"';
      } else if (header.data["quiz_type"] == "phraseology") {
        this.quiz_header = '"Фразеология"';
      } else if (header.data["quiz_type"] == "NoActivities") {
        this.$router.push({ name: "noactivities" });
      }
    });
  },
  methods: {
    SendAutorization() {
      axios
        .post(API_URL + "player/", {
          bank: this.bank,
          personnel_number: this.personnel_number
        })
        .then(player => {
          console.log(player.data);
          axios.get(API_URL + "get_actual_quiz/").then(quiz => {
            console.log(quiz.data);
            if (quiz.data["quiz_type"] == "orthography") {
              axios
                .post(API_URL + "sessions/", {
                  quiz: quiz.data["quiz_id"],
                  player: player.data["id"]
                })
                .then(session => {
                  console.log(session.data);
                  axios
                    .post(
                      API_URL +
                        quiz.data["quiz_type"] +
                        "/" +
                        session.data["id"] +
                        "/variants/"
                    )
                    .then(variant => {
                      this.$router.push({
                        name: quiz.data["quiz_type"],
                        params: {
                          session_id: variant.data["session_id"],
                          variant_id: variant.data["variant_id"]
                        }
                      });
                    });
                });
            } else if (quiz.data["quiz_type"] == "lexicon") {
              axios
                .post(API_URL + "sessions/", {
                  quiz: quiz.data["quiz_id"],
                  player: player.data["id"]
                })
                .then(session => {
                  console.log(session.data);
                  axios
                    .post(
                      API_URL +
                        quiz.data["quiz_type"] +
                        "/" +
                        session.data["id"] +
                        "/variants/"
                    )
                    .then(variant => {
                      this.$router.push({
                        name: quiz.data["quiz_type"],
                        params: {
                          session_id: variant.data["session_id"],
                          variant_id: variant.data["variant_id"]
                        }
                      });
                    });
                });
            } else if (quiz.data["quiz_type"] == "phraseology") {
              axios
                .post(API_URL + "sessions/", {
                  quiz: quiz.data["quiz_id"],
                  player: player.data["id"]
                })
                .then(session => {
                  console.log(session.data);
                  axios
                    .post(
                      API_URL +
                        quiz.data["quiz_type"] +
                        "/" +
                        session.data["id"] +
                        "/variants/"
                    )
                    .then(variant => {
                      this.$router.push({
                        name: quiz.data["quiz_type"],
                        params: {
                          session_id: variant.data["session_id"],
                          variant_id: variant.data["variant_id"]
                        }
                      });
                    });
                });
            }
          });
        })
        .catch(error => {
          console.log(error.response.data);
          for (var key in error.response.data) {
            this.errors = error.response.data[key][0];
          }
          console.log(this.errors[0]);
        });
    }
  }
};
</script>

<style>
body {
  min-height: 100vh;
  padding: 0;
}

input {
  width: 100px;
}

select {
  width: 100px;
}

.wrapper {
  margin: auto;
  /* background-color: azure; */
  width: 90%;
  height: 600px;
  position: relative;
}

/* .tittle {
    background-color: rgb(166, 215, 230);
} */

.text-tittle {
  font-size: 200%;
  text-align: center;
}

.meaning-registration {
  /* background-color: rgb(182, 166, 230); */
  text-align: center;
  vertical-align: middle;
  padding-top: 50px;
}

.meaning {
  /* background-color: rgb(182, 166, 230); */
  text-align: center;
  vertical-align: middle;
  /* height: 40%; */
}

.registration {
  /* display: inline-block; */
  margin: 0 auto;
  width: 230px;
}

.field {
  clear: both;
  text-align: right;
  line-height: 45px;
  border: none;
}

.bank-select {
  /* width: 210px; */
  height: 45px;
  background-color: #fff;
  border-style: solid;
  border-radius: 2px;
  border-width: 1px;
  border-color: gray;
}

.number-input {
  height: 45px;
}

.variants {
  /* background-color: rgb(220, 241, 245); */
  /* height: 200px; */
  display: inline-block;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 50px;
}

label {
  float: left;
  padding-right: 10px;
}

.reg-button {
  margin-left: auto;
  margin-right: auto;
}

.registration-button {
  margin-top: 20px;
  /* position: relative; */
  /* margin-left: auto;
  margin-right: auto;
  transform: translate(-50%, 0); */
  appearance: none;
  border-color: #cecece;
  border-radius: 5px;
  background: #ffffff;
  color: #242424;
  padding: 8px 16px;
  font-size: 20px;
  width: 170px;
}

/* .variants-table {
  display: inline-block;
} */

/* .variant-button {
  appearance: none;
  border: 0;
  border-radius: 5px;
  background: #46a9d7;
  color: #fff;
  padding: 8px 16px;
  font-size: 18px;
  margin-bottom: 10px;
  width: 280px;
} */

/* .next-button {
  position: absolute;
  bottom: 0;
  right: 0;
  appearance: none;
  border-color: #cecece;
  border-radius: 5px;
  background: #ffffff;
  color: #242424;
  padding: 8px 16px;
  font-size: 20px;
  margin-bottom: -10px;
  width: 170px;
} */

/* .question {
  text-align: justify;
  font-size: 18px;
} */

.score {
  /* background-color: rgb(171, 196, 243); */
  height: 50px;
  text-align: center;
}

.score-text {
  font-size: 38px;
}

.right {
  background: #46d74d;
}

.false {
  background: #d74646;
}

.errors {
  color: red;
  font-size: 12px;
}

@media (max-height: 575px) {
  .meaning-registration {
    /* background-color: rgb(182, 166, 230); */
    text-align: center;
    vertical-align: middle;
    padding-top: 20px;
  }
}
</style>
