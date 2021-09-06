<template lang="pug">
v-container
  v-row
    v-col(align="center")
      v-img(:src="pokemon.sprite" max-height="150" max-width="150")
      v-col(align="start")
        span {{ pokemon.name }}
      v-col(align="start")
        span Base Experience: {{ pokemon.base_experience }}
      v-col(align="start")
        span Altura: {{ pokemonHeight }} m
      v-col(align="start")
        span Peso: {{ pokemonWeight }} kg
  v-row(align="center")
    v-col(align="center")
      v-btn(@click="addTeamA") Time A
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
