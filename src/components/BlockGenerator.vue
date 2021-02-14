<template>
  <div>
    <div>
      <p>
        Vous pouvez changer le template en copiant collant votre propre HTML.<br />
        Les placeholder suivants seront remplacé :
        <em> miniatureURL, articleURL, articleTitle, articleRecap</em>
      </p>
      <label for="newletter-block-template">Article block template</label>
      <textarea
        id="newletter-block-template"
        v-model="blockTemplate"
        rows="12"
        cols="95"
      ></textarea>
    </div>
    <div class="block-generation">
      <input type="url" v-model="articleURL" />
      <button @click="generateBlock">Generer le block de l'article</button>
      <code v-if="generatedBlock">{{ generatedBlock }}</code>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { fileContent } from './mock.html';
import { parseHTML, replaceInTemplate } from './helpers';
/*
miniatureURL
articleURL
articleTitle
articleRecap
*/
export default {
  setup() {
    const blockTemplate = ref(`
<div class="chapter-left">
  <img alt="" class="miniature" src="miniatureURL" />
</div>
<div class="chapter-right">
  <h2><a href="articleURL" target="_blank">articleTitle</a></h2>
  <p class="resume">articleRecap<a class="lirelasuite" href="articleURL" target="_blank">Lire la suite</a></p>
</div>
<div style="clear:both">&nbsp;</div>
`);

    const articleURL = ref(
      'https://mlalerte.org/apres-la-revelation-des-actes-de-maltraitance-au-tribunal-de-paris-amar-benmohamed-se-voit-sanctionne-par-sa-hierarchie/',
    );

    const generatedBlock = ref('');
    const mapToFind = ref({
      articleTitle: 'body > div.container.main_title > h1',
      miniatureURL: '#post-3962 > div.content_boxes > div.feature-box > img',
    });
    // xpath version
    // const mapToFind = ref({
    //   articleTitle: "/html/body/div[3]/h1",
    // });

    const generateBlock = () =>
      /* use the promise.resolve when developping as a webapp,
       * for a fully functionning extension use fetch instead
       */
      // fetch(articleURL.value).then(response => response.text())
      Promise.resolve(fileContent)
        .then(content => parseHTML(content, mapToFind.value))
        .then(
          maptoReplace =>
            (generatedBlock.value = replaceInTemplate(
              { ...maptoReplace, articleURL: articleURL.value },
              blockTemplate.value,
            )),
        );

    return {
      blockTemplate,
      articleURL,
      generatedBlock,
      generateBlock,
    };
  },
};
</script>

<style scoped>
label {
  color: #42b983;
  margin-bottom: 0.5rem;
}

textarea {
  width: 100%;
}

code {
  margin-top: 1rem;
  border: #42b983 1px solid;
  padding: 1rem;
}

div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}

.block-generation {
  margin-top: 2rem;
}
</style>
