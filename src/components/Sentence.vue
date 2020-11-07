<template>
    <div>
        <p class="croatianText">Croatian: {{croatianValue}}</p>
        <p class="englishText">English: {{englishValue}}</p>
    </div>
</template>

<script>
export default {
    props: ['croatianValue', 'englishValue']
}
</script>

<style scoped>
.croatianText {
    color: red;
}

.englishText {
    color: blue;
}
</style>