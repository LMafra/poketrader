<template lang="pug">
div
  div
    span {{ teamA.trainer }}
    span {{ teamA.teamPokemons.length }}
    div(v-for="(pokemon, index) in teamA.teamPokemons" :key="index")
      span {{ pokemon.pokemon.name }}
  div
    span {{ teamB.trainer }}
    span {{ teamB.teamPokemons.length }}
    div(v-for="(pokemon, index) in teamB.teamPokemons" :key="index")
      span {{ pokemon.pokemon.name }}
  div
    button(@click="sumBaseExperienceA") Realizar trocar
</template>

<script>
export default {
  name: 'DisplayTeam',
  props: {
    teamA: {
      type: Object,
      required: false,
    },
    teamB: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      trainerTeam: [],
      totalPointsteamA: 0,
      totalPointsteamB: 0,
    };
  },
  computed: {
  },
  methods: {
    sumBaseExperienceA() {
      const pkmsA = this.teamA.teamPokemons.map(p => p.pokemon);
      this.totalPointsteamA = pkmsA.reduce((acc, item) => acc + item.base_experience, 0);
    },
    sumBaseExperienceB() {
      const pkmsB = this.teamB.teamPokemons.map(p => p.pokemon);
      this.totalPointsteamB = pkmsB.reduce((acc, item) => acc + item.base_experience, 0);
    },
    tradePokemons() {
    },
  },
};
</script>
