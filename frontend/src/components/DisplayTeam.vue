<template lang="pug">
div
  div
    span Time A
    div(v-for="(pokemon, index) in teamA.teamPokemons"
        :key="index")
      span {{ pokemon.pokemon.name }}
  div
    span Time B
    div(v-for="(pokemon, index) in teamB.teamPokemons"
        :key="index")
      span {{ pokemon.pokemon.name }}
  button(@click="tradePokemons") Realizar trocar
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
      totalPointsteamA: 0,
      totalPointsteamB: 0,
    };
  },
  computed: {
  },
  methods: {
    sumBaseExperienceA() {
      const pkms = this.teamA.teamPokemons.map(p => p.pokemon);
      this.totalPointsteamA = pkms.reduce((acc, item) => acc + item.base_experience, 0);
    },
    sumBaseExperienceB() {
      const pkms = this.teamB.teamPokemons.map(p => p.pokemon);
      this.totalPointsteamB = pkms.reduce((acc, item) => acc + item.base_experience, 0);
    },
    tradePokemons() {
      this.sumBaseExperienceA();
      this.sumBaseExperienceB();
      if (Math.abs(this.totalPointsteamA - this.totalPointsteamB) > 50) {
        this.$notify({
          color: 'red',
          group: 'notification',
          position: 'top center',
          text: 'Amigo, a troca está injusta',
        });
        return;
      }
      this.$emit('tradeSuccess');
    },
  },
};
</script>
