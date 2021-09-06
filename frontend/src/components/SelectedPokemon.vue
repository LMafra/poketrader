<template lang="pug">
v-container
  v-layout(column wrap align-center)
    v-flex(xs12 sm8)
      v-img(:src="pokemon.sprite" max-height="150" max-width="150")
      v-flex
        span {{ pokemon.name }}
      v-flex
        span Base Experience: {{ pokemon.base_experience }}
      v-flex
        span Altura: {{ pokemonHeight }} m
      v-flex
        span Peso: {{ pokemonWeight }} kg
  v-layout(row wrap justify-center)
    v-flex(xs12 sm4)
      v-btn(@click="addTeamA") Time A
    v-flex(xs12 sm4)
      v-btn(@click="addTeamB") Time B
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
  computed: {
    pokemonHeight() {
      const pkmHeight = this.pokemon.height / 10;
      return pkmHeight || '0.0';
    },
    pokemonWeight() {
      const pkmWeight = this.pokemon.weight / 10;
      return pkmWeight || '0.0';
    },
  },
  methods: {
    addTeamA() {
      if (!this.pokemon.id) {
        this.$notify({
          color: 'red',
          group: 'notification',
          position: 'top center',
          text: 'Adicione um Pokémon',
        });
        return;
      }
      this.$emit('addTeamA', this.pokemon);
    },
    addTeamB() {
      if (!this.pokemon.id) {
        this.$notify({
          color: 'red',
          group: 'notification',
          position: 'top center',
          text: 'Adicione um Pokémon',
        });
        return;
      }
      this.$emit('addTeamB', this.pokemon);
    },
  },
};
</script>
