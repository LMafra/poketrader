<template lang="pug">
div
  h1 Trocas Realizadas
  div(v-for="trade in trades")
    span {{ trade.trade_id }}
    span {{ trade.name }}
</template>

<script>

import api from '../services/api';

export default {
  name: 'TradeHistory',
  data() {
    return {
      trades: [],
    };
  },
  computed: {},
  methods: {
    loadTrades() {
      api
        .get('/trades')
        .then((res) => {
          this.trades = res.data;
        })
        .catch((err) => {
          this.$notify(err);
        });
    },
  },
  async mounted() {
    this.loadTrades();
  },
};
</script>
