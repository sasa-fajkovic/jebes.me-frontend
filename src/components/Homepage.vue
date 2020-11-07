<template>
    <nav>
        <li>Home</li>
        <li>Contact</li>
    </nav>

    <div>
        <appSentence 
        v-for="sentence in sentenceList" 
        :key="sentence"
        :croatianValue="sentence.croatianValue"
        :englishValue="sentence.englishValue"
        >
        </appSentence>
    </div>

    <footer>
        <li>Home</li>
        <li>Contact</li>
    </footer>

</template>

<script>
import Sentence from './Sentence.vue';
import axios from 'axios';

export default {
    components: {
        appSentence: Sentence
    },
    data: () => {
        return {
            sentenceList: []
        }
    },
    methods: {
        fetchSentenceList: function () {
            axios.get("http://localhost:8081/api/sentences/?amount=10")
            .then((result) => {
                console.log(result)
                this.sentenceList = result.data
            })
        }
    },
    mounted() {
        this.fetchSentenceList();
    }

}
</script>