<template>
  <v-container style="height: 100vh">
    <v-row
      class="justify-center mt-10 align-center"
      style="height: 100%"
      v-if="loading"
    >
      <div class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-row>
    <v-row v-if="isPlaying" class="justify-center align-center flex-column">
      <div>
        <flip-countdown
          :deadline="deadline"
          :showHours="false"
          :showDays="false"
          @timeElapsed="timeElapsedHandler"
        ></flip-countdown>
      </div>
      <div class="d-flex justify-space-between align-center mt-10">
        <v-chip color="green darken-1 mx-10" text-color="white">
          {{ goodAnswer }} Success
        </v-chip>

        <v-chip color="red darken-1 mx-10" text-color="white">
          {{ wrongAnswer }} Errors
        </v-chip>
      </div>
      <v-card :loading="isLoadingCard" class="mx-auto my-12" max-width="374">
        <template slot="progress">
          <v-progress-linear
            color="primary"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img
          height="192"
          v-if="flagQuestion"
          :src="flagUrl"
          @load="onImgLoad"
        ></v-img>
        <v-img
          height="250"
          v-else-if="showResponseAnswer"
          :src="responseUrl"
          @load="onImgLoad"
        ></v-img>
        <!-- <v-img
          height="192"
          v-else
          class="justify-center"
          src="https://source.unsplash.com/random?question"
          @load="onImgLoad"
        ></v-img> -->

        <v-card-title v-if="!showResponseAnswer">{{ question }}</v-card-title>

        <v-divider class="mx-4" v-if="!showResponseAnswer"></v-divider>

        <v-card-title v-if="!showResponseAnswer">Votre réponse :</v-card-title>

        <v-card-text v-if="!showResponseAnswer">
          <v-chip-group
            class="d-flex align-center justify-center flex-column"
            active-class="primary accent-4 white--text"
            v-model="selected"
            column
          >
            <v-row>
              <v-col
                cols="12"
                v-for="(answer, index) in answerElements"
                :key="index"
                @click="validateAnswer(index)"
              >
                <v-chip style="width: 100%">{{ answer }}</v-chip>
              </v-col>
            </v-row>
          </v-chip-group>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row
      v-else
      class="mt-10 justify-center align-center"
      style="height: 100%"
    >
      <div></div>
      <v-btn large color="primary" @click="launchGame">
        <v-btn class="mx-2" fab dark large rounded color="primary">
          <span class="pa-2 rounded">
            <v-icon large dark>play_arrow</v-icon>
          </span>
        </v-btn>
        <h1 style="color: white">Lancer le jeu</h1>
      </v-btn>
    </v-row>
  </v-container>
</template>

// <script src="./js/game.js"></script>
<script>
import api from "../services/index.js";
import FlipCountdown from "vue2-flip-countdown";
export default {
  components: {
    FlipCountdown,
  },
  data: () => ({
    data: [],
    answerElements: [],
    questionType: ["flag", "capital", "language", "continent"],
    loading: true,
    isLoadingCard: true,
    isPlaying: false,
    question: "",
    answer: "",
    countrySelectedNumber: null,
    otherCountries: [],
    wrongAnswer: 0,
    goodAnswer: 0,
    changeCard: false,
    flagQuestion: false,
    selected: "",
    showResponseAnswer: false,
    responseUrl: "",
    deadline: formatDate(new Date()),
  }),
  created() {
    this.getAllcountries();
  },
  methods: {
    async getAllcountries() {
      var res = await api.getCountriesGame();
      var url = "url";
      await res.data.data.countries.forEach((el) => {
        el[url] =
          "https://flagcdn.com/256x192/" + el.code.toLowerCase() + ".png";
        return this.data.push(el);
      });
      this.loading = false;
    },
    async validateAnswer(value) {
      let answerValue = "maybe";
      this.selected = value;
      if (value !== null && value === this.answer) {
        this.goodAnswer += 1;
        answerValue = "yes";
      } else {
        this.wrongAnswer += 1;
        answerValue = "no";
      }
      this.flagQuestion = false;
      this.showResponseAnswer = true;
      this.isLoadingCard = true;
      try {
        const res = await fetch(`https://yesno.wtf/api?force=${answerValue}`);
        this.responseUrl = (await res.json()).image;
      } catch (error) {
        console.log("Error! Could not reach the API. " + error);
      }
      setTimeout(() => {
        this.anotherCard();
      }, 5000);
    },
    onImgLoad() {
      this.isLoadingCard = false;
    },
    changeType() {
      this.selected = true;
    },
    generateRandom(max, filterValue) {
      var num = Math.floor(Math.random() * max);
      return filterValue && num === this.countrySelectedNumber
        ? generateRandom(max)
        : num;
    },

    generateCard() {
      if (this.isPlaying) {
        let type = this.generateRandom(4, false);
        this.countrySelectedNumber = this.generateRandom(
          this.data.length,
          false
        );
        let countryName = this.data[this.countrySelectedNumber];
        this.answer = this.generateRandom(4, false);
        let valueAnswer = null;
        switch (type) {
          case 0:
            for (let i = 0; i < 3; i++) {
              const number = this.generateRandom(this.data.length, true);
              this.otherCountries.push(this.data[number]);
            }
            this.otherCountries.forEach((el) =>
              this.answerElements.push(el.name)
            );
            this.answerElements.splice(this.answer, 0, countryName.name);
            this.flagQuestion = true;
            this.flagUrl = countryName.url;
            this.question = "A quel pays appartient ce drapeau ?";
            break;

          case 1:
            for (let i = 0; i < 3; i++) {
              const number = this.generateRandom(this.data.length, true);
              this.otherCountries.push(this.data[number]);
            }
            this.otherCountries.forEach((el) =>
              this.answerElements.push(el.capital)
            );
            this.answerElements.splice(this.answer, 0, countryName.capital);
            this.question = `Quelle est la capitale du pays : ${countryName.name} ?`;
            break;

          case 2:
            valueAnswer = countryName.languages.map((l) => l.name).join(", ");
            for (let i = 0; i < 3; i++) {
              let validation = false;
              while (!validation) {
                var number = this.generateRandom(this.data.length, true);
                if (
                  this.data[number].languages.map((l) => l.name).join(", ") !==
                  valueAnswer
                ) {
                  validation = true;
                }
              }
              this.otherCountries.push(this.data[number]);
            }
            this.otherCountries.forEach((el) =>
              this.answerElements.push(
                el.languages.map((l) => l.name).join(", ")
              )
            );
            this.answerElements.splice(this.answer, 0, valueAnswer);
            this.question = `Langue(s) du pays : ${countryName.name} ?`;
            this.answer = this.data[this.countrySelectedNumber].name;
            break;

          default:
            valueAnswer = countryName.continent.name;
            for (let i = 0; i < 3; i++) {
              let validation = false;
              while (!validation) {
                var number = this.generateRandom(this.data.length, true);
                if (this.data[number].continent.name !== valueAnswer) {
                  validation = true;
                }
              }
              this.otherCountries.push(this.data[number]);
            }
            this.otherCountries.forEach((el) =>
              this.answerElements.push(el.continent.name)
            );
            this.answerElements.splice(
              this.answer,
              0,
              countryName.continent.name
            );
            this.question = `Sur quel continent se trouve le pays : ${countryName.name} ?`;
            break;
        }
        this.isLoadingCard = false;
        var t = new Date();
        t.setSeconds(t.getSeconds() + 10);
        this.deadline = formatDate(t);
      }
    },
    timeElapsedHandler(){
        if(!this.showResponseAnswer){
            this.validateAnswer(null);
        }
    },
    anotherCard() {
      this.otherCountries = [];
      this.answerElements = [];
      this.selected = "";
      this.countrySelectedNumber = null;
      this.flagQuestion = false;
      this.isLoadingCard = true;
      this.showResponseAnswer = false;
      this.generateCard();
    },
    launchGame() {
      this.isPlaying = true;
      this.generateCard();
    },
  },
};
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}
</script>
