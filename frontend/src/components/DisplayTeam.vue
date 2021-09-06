<template lang="pug">
v-container
  v-row
    v-col(align="center")
      span Time A
      div(v-for="(pokemon, index) in teamA.teamPokemons"
          :key="index")
        v-img(:src="pokemon.pokemon.sprite" max-height="100" max-width="100")
        span {{ pokemon.pokemon.name }}
    v-col(align="center")
      span Time B
      div(v-for="(pokemon, index) in teamB.teamPokemons"
          :key="index")
        v-img(:src="pokemon.pokemon.sprite" max-height="100" max-width="100")
        span {{ pokemon.pokemon.name }}
  v-row(align="center")
    v-col(align="center")
      v-btn(cols="6" @click="tradePokemons") Realizar troca
      v-btn(cols="6" @click="resetTrade") Reiniciar troca
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
      if (this.teamA.teamPokemons.length === 0 && this.teamB.teamPokemons.length === 0) {
        this.$notify({
          color: 'red',
          group: 'notification',
          position: 'top center',
          text: 'Preencha os times',
        });
        return;
      }
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
    resetTrade() {
      this.$emit('reset');
    },
  },
};
</script>
