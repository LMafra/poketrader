<template lang="pug">
v-layout(row wrap justify-center class="my-5")
  h1 Troca Nº {{ trade.trade }}
  pokemon-trade(v-for="(team, index) in teams"
          :team="team"
          :key="index")
</template>

<script>
import _ from 'lodash';

import PokemonTrade from './PokemonTrade';

export default {
  name: 'TradeInfo',
  components: {
    PokemonTrade,
  },
  props: {
    trade: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      teams: [],
      pokemons: [],
    };
  },
  methods: {
    tradeTeam() {
      this.teams = _.chain(this.trade.pokemons)
        .groupBy('trainer')
        .map((value, key) => ({ trainer: key, pokemons: value }))
        .value();
    },
  },
  async mounted() {
    this.tradeTeam();
  },
};
</script>
