<template>
<body class="background">
    <div class="wrapper">
        <div class="instruction-orth">
            <p class="text-instruction text-instruction-orth">ВЫБЕРИ ПРОПУЩЕННУЮ БУКВУ:</p>
        </div>
        <p style="font-size: 14px; text-align: right; margin: 0; padding-right: 10px;">{{ this.number }}/10</p>
        <div class="question question-heigh-orth">
            <div class="center-field">
                <p class="justify-orth orthography_question"><span v-if="!this.is_pushed">{{ this.missed_letter }}</span><span v-else>{{ this.full_word }}</span></p>
            </div>
        </div>
        <div class="info-field"><p class="info" :class="{right: this.infoRight, false: this.infoFalse, disabled: this.is_pushed}">{{ this.notice }}</p></div>
        <table style="cellspacing">
        <tr >
            <td style="margin-right: 20px;">
                <div class="button-orth" :class="{right: isRight0, false: isFalse0, disabled: this.variant_is_pushed}" v-on:click="isAnswer_0()"><p class="orthography_letter">{{ this.options[0] }}</p></div>
            </td>
            <td>
                <div class="button-orth" :class="{right: isRight1, false: isFalse1, disabled: this.variant_is_pushed}" v-on:click="isAnswer_1()"><p class="orthography_letter">{{ this.options[1] }}</p></div>
            </td>
        </tr>
        </table>
    </div>
        <span>
            <p v-if="this.is_full == false" ><button :disabled="!this.is_pushed" class="next-button next-button-orth" :class="{inactiveorth: !this.is_pushed}" v-on:click="NextVariant()"><span v-if="!this.loading">Далее</span><b-spinner v-else variant="light" small ></b-spinner></button></p>
            <p v-else><button :disabled="!this.is_pushed" class="next-button next-button-orth" :class="{inactiveorth: !this.is_pushed}" v-on:click="isSummary()"><span v-if="!this.loading">Завершить</span><b-spinner v-else variant="light" small ></b-spinner></button></p>
        </span>
</body>
</template>
<script>
import axios from 'axios';
import config from '@/scripts/api-config'

const API_URL = config['API_LOCATION']

export default {
  name: "Lexicon",
  data() {
    return {
      isDisabled: false,
      score: 0,
      number: '',
      missed_letter: '',
      full_word: "",
      false_letter: '',
      right_letter: '',
      options: [],
      is_full: false,
      is_answered: '',
      notice: '',
      mistake: '',
      is_pushed: false,
      variant_is_pushed: false,
      isRight0: false,
      isRight1: false,
      isFalse0: false,
      isFalse1: false,
      infoRight: false,
      infoFalse: false,
      loading: false,
    };
  },
  mounted() {
    axios.get(API_URL + 'orthography/' + this.$route.params.session_id + '/variants/' + this.$route.params.variant_id + "/")
    .then(response=> {
                  console.log(response.data);
                  this.vars_assignment(response.data);
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
        axios.post(API_URL + 'orthography/' + this.$route.params.session_id + '/variants/')
        .then(response=> {
            this.page_vars_reset();
            console.log(response.data);
            this.$router.push({name: 'orthography', params: {session_id: this.$route.params.session_id, variant_id: response.data['variant_id']}})
            this.vars_assignment(response.data);
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
        if (this.options[0] == this.right_letter){
            this.isRight0 = true
            this.infoRight = true
            this.notice = "ВЕРНО!";
            if (this.is_answered == null){
                this.update_variant(0, 1);
            }
            else {this.is_pushed = true;}
        }
        else{
            this.isFalse0 = true
            this.infoFalse = true
            this.notice = "НЕВЕРНО!"
            this.get_button_colors()
            if (this.is_answered == null){
                this.update_variant(1, 0);
            }
            else {this.is_pushed = true;}
        }
    },
    isAnswer_1() {
        if (this.options[1] == this.right_letter){
            this.isRight1 = true
            this.infoRight = true
            this.notice = "ВЕРНО!"
            if (this.is_answered == null) {
                this.update_variant(0, 1);
            }
            else {this.is_pushed = true;}
        }
        else{
            this.isFalse1 = true
            this.infoFalse = true
            this.notice = "НЕВЕРНО!"
            this.get_button_colors()
            // this.get_mistake_variant(this.options[1])
            if (this.is_answered == null){
                this.update_variant(1, 0);
            }
            else {this.is_pushed = true;}
        }
    },

      update_variant(answer_field, score) {
        this.variant_is_pushed = true
        this.loading = true
      axios.patch(
            API_URL +
              "orthography/" +
              this.$route.params.session_id +
              "/variants/" +
              this.$route.params.variant_id +
              "/",
            { answer_field: answer_field, score: score }
      )
        .then(_ => { this.is_pushed = true; this.loading = false})
        .catch(err => {axios.patch(
            API_URL +
              "orthography/" +
              this.$route.params.session_id +
              "/variants/" +
              this.$route.params.variant_id +
              "/",
            { answer_field: answer_field, score: score }
      )
          .then(_ => { this.is_pushed = true; this.loading = false})
          .catch(err => {
              axios.patch(
            API_URL +
              "orthography/" +
              this.$route.params.session_id +
              "/variants/" +
              this.$route.params.variant_id +
              "/",
            { answer_field: answer_field, score: score }
      )
                .then(_ => { this.is_pushed = true; this.loading = false})
                  .catch(err => { this.is_pushed = true; this.loading = false; this.infoFalse = true; this.notice = "!ОШИБКА СЕТИ!"})
        }) });
    },

    vars_assignment(data){
        this.missed_letter = data["missed_letter"];
        this.full_word = data["full_word"];
        this.number = data['variant_number'];
        this.right_letter = data['right_letter'];
        this.false_letter = data['false_letter'];
        this.is_full = data['is_full'];
        this.is_answered = data['answered'];
        this.options.push(this.right_letter);
        this.options.push(this.false_letter);
        this.options = this.options.sort(() => Math.random() - 0.5);
    },
    get_button_colors() {
        if (this.options[0] == this.word){this.isRight0 = true}
            else if (this.options[1] == this.word){this.isRight1 = true}
            else if (this.options[2] == this.word){this.isRight2 = true}
            else if (this.options[3] == this.word){this.isRight3 = true}
    },
    page_vars_reset() {
        this.options = [];
        this.notice = "";
        this.is_pushed = false;
        this.variant_is_pushed = false;
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
  }
};
</script>
<style>
.justify-orth {
    text-align: justify;
}

.orthography_question{
    font-size: 35px;
}

.orthography_letter{
    margin-top: 5px;
    font-size: 50px;
}

.question-heigh-orth {
    height: 150px;
}

.button-orth {
    background: white;
    height: 100px;
    width: 100px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 1px 1px 5px 1px rgb(122, 122, 122, 0.5);
    border-radius: 7px;
    padding-top: 2px;
    padding-bottom: 0px;
    color: #000000;
    font-size: 20px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    text-align: center;
    margin-bottom: 15px;
}

.next-button-orth {
  background: #53548f;
  color: #ffffff;
}

.inactiveorth {
  color: rgb(221, 219, 219);
  background: #bbbcdf;
}

.instruction-orth {
    padding-top: 30px;
    margin-bottom: 0px;
}

.text-instruction-orth {
    margin-bottom: 0px;
}

.right {
  color: white;
  background-color: #5bbd73;
}

.false {
  color: white;
  background-color: rgb(253, 109, 109);
}

@media (max-height: 575px) {
p {
  font-size: 15px;
}

/* .info {
  font-size: 20px;
}*/

.info-field {
  height: 35px;
  margin-bottom: 5%;
}

.question {
  height: 85px;
  margin-top: 8px;
  margin-bottom: 15px;
}

.orthography_question{
    font-size: 30px;
}

.center-field {
  margin-bottom: 8px;
  height: 75px;
}

.button-orth {
    height: 90px;
    width: 90px;
    padding-top: 0;
}

.instruction {
  padding-top: 10px;
}

.text-instruction {
  font-size: 15px;
}

.next-button {
  height: 55px;
  font-size: 18px;
  padding-top: 3px;
}
}

</style>
