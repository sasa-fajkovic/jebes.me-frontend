<template>
    <div class="centered">
        <form @submit.prevent="submitNewSentence($data)">
            <label for="croInput">Croatian:</label>
            <input type="text" name="croatianValue" v-model="croatianText" @input="checkForm" placeholder="Psovka na hrvatskom ide ovdje (min 5 slova)" >

            <label for="enInput">English:</label>
            <input type="text" name="enInput" v-model="englishText" @input="checkForm" placeholder="Psovka na engleskom ide ovdje (min 5 slova)">

            <input type="submit" value="Send" :disabled="formIsValid === false">
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: () => {
        return {
            formIsValid: false,
            croatianText: '',
            englishText: ''
        }
    },
    methods: {
        checkForm: function () {
            let croValid = true
            let enValid = true

            if (this.croatianText == null || this.croatianText.length < 5) {
                croValid = false
            }

            if (this.englishText == null || this.englishText.length < 5) {
                enValid = false
            }

            if (croValid === true && enValid === true) {
                this.formIsValid = true
            } else {
                this.formIsValid = false
            }
        },
        submitNewSentence: function (data) {
            let baseUrl = 'http://localhost:8081/api'

            if (!data.formIsValid) {
                alert('Sram te bilo, pokusavas zajebati sistem. Picka ti materina.')
                return;
            }

            let payload = {
                "croatianValue": data.croatianText,
                "englishValue": data.englishText
            }

            console.log(payload)

            axios.post(baseUrl + '/sentences', payload)
            //todo Show success/error message
            
        }
    }
}
</script>

<style scoped>
label {
    font-size: 20px;
}

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}

input[type=text] {
 width: 100%;
  padding: 20px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

input[type=submit] {
  width: 100%;
  background-color: #4c76ae;
  color: white;
  padding: 20px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=text]:focus {
    outline-color: #114283;
}

input[type=submit]:hover {
  background-color: #114283;
}

input[type=submit]:disabled  {
    background-color: transparent;
    border: 1px solid gray;
    color: black;
    cursor: initial;
}
</style>