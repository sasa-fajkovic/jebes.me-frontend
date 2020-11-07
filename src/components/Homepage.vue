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

export default {
    components: {
        appSentence: Sentence
    },
    data: () => {
        return {
            sentenceList: [
                {
                    "croatianValue": "c1",
                    "englishValue": "e1"
                },
                {
                    "croatianValue": "c2",
                    "englishValue": "e2"
                }
            ]
        }
    }

}
</script>