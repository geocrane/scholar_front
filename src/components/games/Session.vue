<template>
<body class="background">
    <div class="wrapper">
        <div class="tittle">
            <p class="text-tittle">ВОПРОС: {{ this.count }}</p>
        </div>
        <div class="meaning">
            <p class="question"> {{ this.meaning }}</p>
        </div>
        <div class="score"><p class="score-text">{{ this.notice }}</p></div>
        <div class="variants">
            <table class="variants-table">
                <tr><td><button class="variant-button" :class="{right: isRight0, false: isFalse0}" :disabled="this.answered" v-on:click="isAnswer_0()">{{ this.options[0] }}</button></td></tr>
                <tr><td><button class="variant-button" :class="{right: isRight1, false: isFalse1}" :disabled="this.answered" v-on:click="isAnswer_1()">{{ this.options[1] }}</button></td></tr>
                <tr><td><button class="variant-button" :class="{right: isRight2, false: isFalse2}" :disabled="this.answered" v-on:click="isAnswer_2()">{{ this.options[2] }}</button></td></tr>
                <tr><td><button class="variant-button" :class="{right: isRight3, false: isFalse3}" :disabled="this.answered" v-on:click="isAnswer_3()">{{ this.options[3] }}</button></td></tr>
            </table>
        </div>
        <span v-if="this.answered == false" ></span>
        <span v-else>
            <p v-if="this.is_last == false" ><button :disabled="!this.answered" class="next-button" v-on:click="NextVariant()">Далее</button></p>
            <p v-else><button class="next-button" v-on:click="isSummary()">Завершить</button></p>
        </span>
    </div>
</body>
</template>
<script>
import axios from 'axios';

const API_URL = "http://localhost:8000/api/"
// const INSTRUCTION = "В данном тесте вам надо выбрать один вариант из четырех"

export default {
  name: "Session",
  data() {
    return {
      isDisabled: false,
      score: 0,
      count: '',
      question: 0,
      meaning: '',
      word: "",
      option_1: '',
      option_2: '',
      option_3: '',
      options: [],
      is_last: false,
      answered: false,
      isRight0: false,
      isRight1: false,
      isRight2: false,
      isRight3: false,
      isFalse0: false,
      isFalse1: false,
      isFalse2: false,
      isFalse3: false,
      notice: '',
    };
  },
  created() {
    axios.get(API_URL + this.$route.params.session_id + '/variants/' + this.$route.params.variant_id + "/")
    .then(response=> {
                  console.log(response.data);
                  this.meaning = response.data["meaning"];
                  this.word = response.data["word"];
                  this.count = response.data['count'];
                  this.option_1 = response.data['option_1'];
                  this.option_2 = response.data['option_2'];
                  this.option_3 = response.data['option_3'];
                  this.options.push(this.word);
                  this.options.push(this.option_1);
                  this.options.push(this.option_2);
                  this.options.push(this.option_3);
                  this.options = this.options.sort(() => Math.random() - 0.5);
                  this.is_last = response.data['is_last'];
      })
      .catch(error => {
                      console.log(error.response.data);
                      for (var key in error.response.data){
                          this.errors = error.response.data[key];
                      }
      })
  },
  methods: {
    NextVariant() {
        axios.post(API_URL + this.$route.params.session_id + '/variants/')
        .then(response=> {
                  console.log(response.data);
                  this.$router.push({name: 'variants', params: {session_id: response.data['session_id'], variant_id: response.data['variant_id']}});
                    this.notice = "";
                    this.answered = false;
                    this.isRight0 = false;
                    this.isRight1 = false;
                    this.isRight2 = false;
                    this.isRight3 = false;
                    this.isFalse0 = false;
                    this.isFalse1 = false;
                    this.isFalse2 = false;
                    this.isFalse3 = false;
                  this.meaning = response.data["meaning"];
                  this.word = response.data["word"];
                  this.count = response.data['count'];
                  this.option_1 = response.data['option_1'];
                  this.option_2 = response.data['option_2'];
                  this.option_3 = response.data['option_3'];
                  this.options = [];
                  this.options.push(this.word);
                  this.options.push(this.option_1);
                  this.options.push(this.option_2);
                  this.options.push(this.option_3);
                  this.options = this.options.sort(() => Math.random() - 0.5);
                  this.is_last = response.data['is_last'];
      })
      .catch(error => {
                      console.log(error.response.data);
                      for (var key in error.response.data){
                          this.errors = error.response.data[key];
                      }
      })

    },
    isSummary() {
        this.$router.push({name: 'summary', params: {session_id: this.$route.params.session_id}
    }
    );
    },
    isAnswer_0() {
        if (this.options[0] == this.word){
            this.isRight0 = true
            this.notice = "ВЕРНО!";
            axios.patch(API_URL + this.$route.params.session_id + '/variants/' + this.$route.params.variant_id + "/", {"score": 1})
        }
        else{
            this.isFalse0 = true
            this.notice = "ОШИБКА!"
            if (this.options[0] == this.word){this.isRight0 = true}
            else if (this.options[1] == this.word){this.isRight1 = true}
            else if (this.options[2] == this.word){this.isRight2 = true}
            else if (this.options[3] == this.word){this.isRight3 = true}
        }
        this.answered = true
    },
    isAnswer_1() {
        if (this.options[1] == this.word){
            this.isRight1 = true
            this.notice = "ВЕРНО!"
            axios.patch(API_URL + this.$route.params.session_id + '/variants/' + this.$route.params.variant_id + "/", {"score": 1})
        }
        else{
            this.isFalse1 = true
            this.notice = "ОШИБКА!"
            if (this.options[0] == this.word){this.isRight0 = true}
            else if (this.options[1] == this.word){this.isRight1 = true}
            else if (this.options[2] == this.word){this.isRight2 = true}
            else if (this.options[3] == this.word){this.isRight3 = true}
        }
        this.answered = true
    },
    isAnswer_2() {
        if (this.options[2] === this.word){
            this.isRight2 = true
            this.notice = "ВЕРНО!"
            axios.patch(API_URL + this.$route.params.session_id + '/variants/' + this.$route.params.variant_id + "/", {"score": 1})
        }
        else{
            this.isFalse2 = true
            this.notice = "ОШИБКА!"
            if (this.options[0] == this.word){this.isRight0 = true}
            else if (this.options[1] == this.word){this.isRight1 = true}
            else if (this.options[2] == this.word){this.isRight2 = true}
            else if (this.options[3] == this.word){this.isRight3 = true}
        }
        this.answered = true
    },
    isAnswer_3() {
        if (this.options[3] === this.word){
            this.isRight3 = true
            this.notice = "ВЕРНО!"
            axios.patch(API_URL + this.$route.params.session_id + '/variants/' + this.$route.params.variant_id + "/", {"score": 1})
        }
        else{
            this.isFalse3 = true
            this.notice = "ОШИБКА!"
            if (this.options[0] == this.word){this.isRight0 = true}
            else if (this.options[1] == this.word){this.isRight1 = true}
            else if (this.options[2] == this.word){this.isRight2 = true}
            else if (this.options[3] == this.word){this.isRight3 = true}
        }
        this.answered = true
    },
  }
};
</script>
<style>
body {
  min-height: 100vh;
  padding: 0;
}

.background {
    background-image: url('~@/assets/styles/scholar_background.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
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
    padding-top: 100px;
}

.meaning {
    /* background-color: rgb(182, 166, 230); */
    text-align: center;
    vertical-align: middle;
    /* height: 40%; */
}

.registration {
    display: inline-block;
    margin: 0 auto;
    width:300px;
}

.field {
    clear:both;
    text-align:right;
    line-height:25px;
    border: none;
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
    float:left;
    padding-right:10px;
}

.registration-button {
    position: relative;
    left: 30%;
    transform: translate(-50%, 0);
    appearance: none;
    border-color: #cecece;
    border-radius: 5px;
    background: #ffffff;
    color: #242424;
    padding: 8px 16px;
    font-size: 20px;
    width: 170px;
}

.variants-table {
    display: inline-block;
}

.variant-button {
    appearance: none;
    border: 0;
    border-radius: 5px;
    background: #46a9d7;
    color: #fff;
    padding: 8px 16px;
    font-size: 18px;
    margin-bottom: 10px;
    width: 280px;
}

.next-button {
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
}

.question {
    text-align: justify;
    font-size: 18px;
}

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
</style>
