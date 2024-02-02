<template>
  <body class="background">
    <div class="auth-wrapper">
      <!-- Логотип Грамотея -->
      <p class="auth-logo">
        <img
          src="~@/assets/styles/gramotey_white.png"
          style="margin-top: 20px;"
          width="100"
        />
      </p>

      <!-- Название Викторины -->
      <p class="auth-title"> Викторина: "Стань Грамотеем"</p>

      <!-- Раздел авторизации (располагает по центру) -->
      <div class="auth-block">

        <!-- Авторизация -->
        <div class="auth-background-field box-shadow-5">

          <!-- Набор полей ТБ и ТН -->
          <fieldset class="auth-fields-text">
            <div>
              <label class="auth-labels" for="territorial_bank">Тер. банк:&#8201;&#8201;&#8201;&#8201;</label>
              <select
                class="auth-bank-select box-shadow-3"
                v-model="bank"
                type="text"
                id="territorial_bank"
              >
                <option v-for="bank in this.ter_banks">{{ bank }}</option>
              </select>
            </div>

            <div>
              <label class="auth-labels" for="personnel_number">Таб. номер:</label
              ><input
                class="auth-number-input box-shadow-3"
                v-model="personnel_number"
                type="text"
                id="personnel_number"
                placeholder="0XXXXXXX"
              />
              </div>
          </fieldset>

          <!-- Сообщение об ошибке авторизации -->
          <p class="errors">{{ this.errors }}</p>
        </div>
      </div> <!-- Конец авторизации -->

      <!-- Кнопка Начать -->
            <button class="auth-button" v-on:click="SendAutorization()">
              Начать
            </button>
    </div> <!-- Конец wrapper -->
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
      bank: "",
      personnel_number: "",
      session_id: "",
      errors: "",
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
  mounted() { },
  methods: {
    SendAutorization() {
      axios.post(
        API_URL + "player/", {
        bank: this.bank, personnel_number: this.personnel_number
      }
      )
        .then(
          player => {
            axios.post(
              API_URL + "session/", {
              player: player.data["id"]
            }
            )
              .then(
                session => {
                  axios.get(
                    API_URL + "session/" + session.data["id"] + "/1/"
                  )
                    .then(
                      question => {
                        this.$router.push(
                          {
                            name: "question", params: {
                              session_id: question.data["session"], question_number: question.data["number"]
                            }
                          }
                        );
                      }
                    )
                    .catch(error => {
                      console.log(error.response.data);
                      for (var key in error.response.data) {
                        this.errors = error.response.data[key][0];
                      }
                      console.log(this.errors[0]);
                    });
                }
              );
          }
        );
    }
  }
}
</script>

<style>


input {
  width: 100px;
}

select {
  width: 100px;
}

.auth-wrapper {
  display: grid;
  place-items: center;
  height: 100vh;
  margin: 0;
  grid-template-rows: auto 0.3fr 1fr 50px 1fr;
  width: 100%;
  max-width: 500px;
}

.auth-logo {
  /* background-color: rgb(2, 68, 68); */
  font-size: 200%;
  text-align: center;
  grid-row: 1;
}

.auth-title {
  /* background-color: rgb(2, 68, 68); */
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  grid-row: 2;
}

.auth-block {
  padding: 0;
  /* background-color: rgb(182, 166, 230); */
  text-align: center;
  vertical-align: middle;
  grid-row: 3;
}

.auth-background-field {
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

.auth-fields-text {
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

.auth-labels {
  margin: 0;
  padding: 0;
  float: left;
  padding-right: 30px;
}

.auth-bank-select {
  grid-row: 1;
  height: 30px;
  width: 100px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  border-width: 0;
  color: #fff;
  text-align: center;
  margin: 0;
  padding: 0;
}

.auth-bank-select:focus {
  background-color: #d0d0d0;
  border-radius: 8px;
  border-width: 0;
  color: #fff;
}

.auth-number-input {
  grid-row: 2;
  height: 30px;
  width: 100px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  border-width: 0;
  color: #fff;
  padding: 10px;
}

.auth-number-input:focus {
  background-color: #d0d0d0;
  border-radius: 6px;
  border-width: 0;
  color: #fff;
}

.auth-button {
  grid-row: 4;
  margin-top: 15px;
  height: 35px;
  font-size: 18px;
  width: 170px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  border-width: 0;
  color: #fff;
  box-shadow: 1.5px 1.5px 1.5px rgba(0, 0, 0, 0.5);
}

.auth-button:focus{
  background-color: rgba(255, 255, 255, 0.18);
  box-shadow: inset 1.5px 1px 0.1px rgba(0, 0, 0, 0.5);
  padding-right: 5px;
  padding-top: 3.5px;
}
</style>
