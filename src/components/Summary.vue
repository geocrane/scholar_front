<template>
    <body class="background">
    <div class="wrapper">
        <p class="text-tittle"><img src='~@/assets/styles/gramotey.png' style="margin-top: 20px;" width="100"></p>
        <p style="font-size: 20px; font-weight: bold; color: #355DA4; text-align: center;">Викторина {{ this.quiz_header}}</p>
        <div class="meaning-registration">
            <div class="score">
              <p class="score-text" style="font-weight: bold; color: #355DA4;">Вы ответили верно на {{ this.score }} <span v-if="this.score < 5 & this.score > 1">вопроса</span><span v-else-if="this.score == 1">вопрос</span><span v-else="this.score >= 5 & this.score == 0">вопросов</span> из {{ this.questions_count }} </p>
              <p style="color: #355DA4;">Спасибо за участие!</p>
            </div>
        </div>
        <div class="variants">

        </div>
    </div>
</body>
</template>

<script>
import axios from 'axios';
import config from '@/scripts/api-config'

const API_URL = config['API_LOCATION']
const QUIZ = '1'

export default {
  name: "Summary",
  data() {
  return {
    score: '',
    questions_count: '10',
    quiz_header: "",
    loader: false
  }
},
  mounted() {
    axios.get(API_URL + "session/" + this.$route.params.session_id + "/")
    .then(response=> {
                  console.log(response.data);
                  this.score = response.data['score']
      })
      .catch(error => {
                      console.log(error.response.data);
                      for (var key in error.response.data){
                          this.errors = error.response.data[key];
                      }
      })
      this.loader = false
  },
methods: {
  }
}

</script>

<style>
body {
  min-height: 100vh;
  padding: 0;
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
    padding-top: 75px;
}

.meaning {
    /* background-color: rgb(182, 166, 230); */
    text-align: center;
    vertical-align: middle;
    /* height: 40%; */
}

.score {
    display: inline-block;
    /* margin: 0 auto; */
    /* width:300px; */
}

.score-text {
    font-size: 30px;

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

@media (max-height: 575px) {
  .meaning-registration {
    /* background-color: rgb(182, 166, 230); */
    text-align: center;
    vertical-align: middle;
    padding-top: 20px;
  }
}
</style>
