<template lang="pug">
div
  v-img(contain :src="pokemon.sprite" max-height="100" max-width="100")
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {

    };
  },
  computed: {
  },
  methods: {

  },
};
</script>
