<template>
  <div id="sentenceContainer">
    <div class="miniContainer">
      <label for="croatian">Croatian:</label>
      <p class="croatianText" id="croatian">{{ croatianValue }}</p>
    </div>
    <div class="miniContainer">
      <label for="english">English:</label>
      <p class="englishText" id="english">{{ englishValue }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["croatianValue", "englishValue"],
};
</script>

<style scoped>
label {
  font-size: 30px;
  color: #9c27b0;
}
p {
  margin: 0px;
  display: block;
  width: 100%;
}
.croatianText {
  color: black;
  font-size: 60px;
}

.englishText {
  color: black;
  font-size: 100px;
  font-weight: bold;
}

.miniContainer {
  margin-bottom: 25px;
  padding-bottom: 25px;
}

.miniContainer:first-child {
  border-bottom: 1px solid red;
}
</style>
