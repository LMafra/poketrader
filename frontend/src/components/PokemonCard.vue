<template lang="pug">
div.pokemonCard
  img(:src="pokemon.sprite")
  span {{ pokemon.name }}
  span {{ pokemonHeight }}
  span {{ pokemonWeight }}
  span {{ pokemon.base_experience }}
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
    pokemonHeight() {
      const pkmHeight = this.pokemon.height / 10;
      return pkmHeight;
    },
    pokemonWeight() {
      const pkmWeight = this.pokemon.weight / 10;
      return pkmWeight;
    },

  },
  methods: {

  },
};
</script>
