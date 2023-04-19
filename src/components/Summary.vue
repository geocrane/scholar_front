<template>
    <body class="background">
    <div class="wrapper">
        <div class="meaning-registration">
            <div class="registration">
              <p class="text-tittle">ГРАМОТЕЙ</p>
              <p class="score-text">Ваш результат {{ this.scores }}/7</p>
              <p>Спасибо за участие</p>
            </div>
        </div>
        <div class="variants">

        </div>
    </div>
</body>
</template>

<script>
import axios from 'axios';

const API_URL = "http://localhost:8000/api/"

export default {
  name: "Autorization",
  data() {
  return {
    scores: ''
  }
},
created() {
    axios.get(API_URL + 'sessions/' + this.$route.params.session_id)
    .then(response=> {
                  console.log(response.data);
                  this.scores = response.data['scores']
      })
      .catch(error => {
                      console.log(error.response.data);
                      for (var key in error.response.data){
                          this.errors = error.response.data[key];
                      }
      })
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
