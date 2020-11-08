<template>
<app-navigation></app-navigation>

    <div id="mainSentenceContainer" v-if="dataIsLoaded">
        <appSentence  class="centered"
        v-bind="currentSentence === true"
        :croatianValue="currentSentence.croatianValue"
        :englishValue="currentSentence.englishValue"
        >
        </appSentence>
    </div>
</template>

<script>
import Sentence from './Sentence.vue'
import Navigation from './Navigation.vue'
import axios from 'axios'

export default {
    components: {
        appSentence: Sentence,
        appNavigation: Navigation
    },
    data: () => {
        return {
            dataIsLoaded: false,
            sentenceList: [],
            currentSentence: Object,
            currentSentenceCounter: 1,
            numberOfSentencesToGet: 10,
            waitIntervalBetweenSentences: 3000
        }
    },
    methods: {
        fetchSentenceList: function () {
            let baseUrl = 'http://localhost:8081/api'
            axios.get(baseUrl + '/sentences/?amount=' + this.numberOfSentencesToGet)
            .then((result) => {
                if (result.status != 200) {
                    alert('Nesto je otislo u kurac! Jebiga... \n\nPrijavi mi na info@jebes.me')
                }
                this.sentenceList = result.data
                this.currentSentence = this.sentenceList[0]
                this.dataIsLoaded = true
            })
        },
        switchSentence() {
            // Make sure there's enough sentences in the list
            if (this.sentenceList[this.currentSentenceCounter] == null) {
                this.currentSentenceCounter = 0
            }
            this.currentSentence = this.sentenceList[this.currentSentenceCounter]

            this.currentSentenceCounter = this.currentSentenceCounter + 1
            if (this.currentSentenceCounter == this.numberOfSentencesToGet) {
                this.currentSentenceCounter = 0
            }
        }
    },
    created() {
        this.fetchSentenceList()
        setInterval(() => {
            this.switchSentence()
        }, this.waitIntervalBetweenSentences)
    }
}
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
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>