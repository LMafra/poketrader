<template lang="pug">
div
  img(:src="pokemon.sprite")
  span {{ pokemon.name }}
  span {{ pokemon.base_experience }}
  div
    button(@click="addTeamA" :disabled="!pokemon") Time A
  div
    button(@click="addTeamB" :disabled="!pokemon") Time B
</template>

<script>
export default {
  name: 'SelectedPokemon',
  data() {
    return {
    };
  },
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addTeamA() {
      this.$emit('addTeamA', this.pokemon);
    },
    addTeamB() {
      this.$emit('addTeamB', this.pokemon);
    },
  },
};
</script>
