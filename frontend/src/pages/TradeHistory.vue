<template lang="pug">
v-app(light)
  v-toolbar(flat class="white")
    v-toolbar-title Pokemon Trader
    v-spacer
    v-toolbar-items
      v-btn(text @click="goToTrade") Trades
      v-btn(text @click="goToHistory") History
  v-main
    section
      v-parallax(src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/81f869d2-0110-41fd-bad0-b9ce923041e4/d7ob0wu-06011f82-9dcc-4203-8aec-86f76c58d356.jpg/v1/fill/w_1024,h_576,q_75,strp/shiny_pokemon_wallpaper_by_supernovash_d7ob0wu-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTc2IiwicGF0aCI6IlwvZlwvODFmODY5ZDItMDExMC00MWZkLWJhZDAtYjljZTkyMzA0MWU0XC9kN29iMHd1LTA2MDExZjgyLTlkY2MtNDIwMy04YWVjLTg2Zjc2YzU4ZDM1Ni5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.K8g059gkIL-L4OT8MzT80V2Z1lOFPyTpdKLZE4yfPsw" height="400")
        v-layout(column align-center justify-center class="white--text")
          h1(class="white--text mb-2 display-1 text-xs-center"
          style="font-weight: 900; text-shadow: 3px 2px #000000")
            span Calcule a sua troca e verifique se ela é justa
    section
      v-container(grid-list-xl)
        v-layout(row wrap justify-center class="my-5")
          v-flex(xs12 sm8)
            trade-info(v-for="(trade, index) in groupTrades"
              :trade="trade"
              :key="index")
</template>

<script>

import _ from 'lodash';
import api from '../services/api';

import TradeInfo from '../components/TradeInfo';


export default {
  name: 'TradeHistory',
  components: {
    TradeInfo,
  },
  data() {
    return {
      trades: [],
      groupTrades: [],
    };
  },
  computed: {
  },
  methods: {
    async loadTrades() {
      await api
        .get('/trades')
        .then((res) => {
          this.trades = res.data;
        })
        .catch((err) => {
          this.$notify(err);
        });
      this.mapTrades();
    },
    mapTrades() {
      this.groupTrades = _.chain(this.trades)
        .groupBy('trade_id')
        .map((value, key) => ({ trade: key, pokemons: value }))
        .value();
    },
    goToTrade() {
      this.$router.push({ name: 'Trade' });
    },
    goToHistory() {
      this.$router.push({ name: 'History' });
    },
  },
  async mounted() {
    this.loadTrades();
  },
};
</script>
