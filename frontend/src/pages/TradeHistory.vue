<template lang="pug">
v-app
  v-toolbar(flat)
    v-toolbar-title Pokemon Trader
    v-spacer
    v-toolbar-items
      v-btn(text @click="goToTrade") Trades
      v-btn(text @click="goToHistory") History
  v-container(id="tradeHistory" fluid)
    v-row(cols="12" lg="4" align="center")
      v-col(cols="12" align="center")
        h1 Trocas Realizadas
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
