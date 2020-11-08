<template>
  <div id="mainSentenceContainer" v-if="dataIsLoaded">
    <div>
      <h4>
        Auto refresh every {{ waitIntervalBetweenSentences / 1000 }} seconds.
      </h4>
      <h4>Displaying random {{ numberOfSentencesToGet }} sentences.</h4>
    </div>

    <div id="buttonContainer">
      <button @click="previous">Previous</button>
      <button @click="playPause">Play / Pause</button>
      <button @click="next">Next</button>
    </div>
    <appSentence
      class="centered"
      v-bind="currentSentence === true"
      :croatianValue="currentSentence.croatianValue"
      :englishValue="currentSentence.englishValue"
    >
    </appSentence>
  </div>
</template>

<script>
import Sentence from "../components/Sentence.vue";
import axios from "axios";

export default {
  components: {
    appSentence: Sentence,
  },
  data: () => {
    return {
      dataIsLoaded: false,
      sentenceList: [],
      currentSentence: Object,
      currentSentenceCounter: -1,
      numberOfSentencesToGet: 20,
      waitIntervalBetweenSentences: 1000,
      autoPlay: false,
      autoRefreshIntervalReference: null,
    };
  },
  methods: {
    fetchSentenceList: function () {
      let baseUrl = "http://localhost:8081/api";
      axios
        .get(baseUrl + "/sentences/?amount=" + this.numberOfSentencesToGet)
        .then((result) => {
          if (result.status != 200) {
            alert(
              "Nesto je otislo u kurac! Jebiga... \n\nPrijavi mi na info@jebes.me"
            );
          }
          this.sentenceList = result.data;
          this.currentSentence = this.sentenceList[0];
          this.dataIsLoaded = true;
        });
    },
    switchSentence(plusMinusNumber) {
      if (plusMinusNumber == 1) {
        // next
        if (this.currentSentenceCounter == this.sentenceList.length - 1) {
          this.currentSentenceCounter = -1;
        }
      }

      if (plusMinusNumber == -1) {
        if (this.currentSentenceCounter == 0) {
          this.currentSentenceCounter = this.sentenceList.length;
        }
      }
      this.currentSentenceCounter += plusMinusNumber;
      this.currentSentence = this.sentenceList[this.currentSentenceCounter];
    },
    next() {
      this.switchSentence(1);
    },
    previous() {
      this.switchSentence(-1);
    },
    playPause() {
      this.autoPlay = !this.autoPlay;

      if (!this.autoPlay) {
        clearInterval(this.autoRefreshIntervalReference);
        return;
      }

      if (this.autoPlay) {
        this.switchSentence(1);
        this.autoRefreshIntervalReference = setInterval(
          () => this.switchSentence(1),
          this.waitIntervalBetweenSentences
        );
      }
    },
  },
  created() {
    this.fetchSentenceList();
    this.switchSentence(1);
  },
};
</script>

<style scoped>
#mainSentenceContainer {
  height: 90vh;
  background-color: burlywood;
  margin: 0px;
  margin-left: auto;
  margin-right: auto;
}

.centered {
  position: fixed;
  top: 30%;
  left: 20%;
  /* bring your own prefixes */
  transform: translate(-20%, -20%);
}

h4 {
  text-align: center;
  color: #9c27b0;
  display: block;
  font-size: 16px;
}

#buttonContainer {
  text-align: center;
  margin-bottom: 50px;
  display: block;
  clear: both;
}

#buttonContainer button {
  padding: 20px;
  background-color: rgb(151, 226, 136);
  margin-left: 20px;
  margin-right: 20px;
  border: 2px solid white;
  border-radius: 20px;
}

#buttonContainer button:hover {
  cursor: pointer;
  background-color: rgb(114, 167, 104);
  color: white;
}

#buttonContainer button:focus {
  outline: none;
}
</style>