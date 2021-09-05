<template lang="pug">
div
  h1 Trocas Realizadas
  div(v-for="trade in trades")
    span {{ trade.trade_id }}
    img(:src="trade.sprite")
    span {{ trade.name }}
    span {{ trade.trainer }}
</template>

<script>

import api from '../services/api';

export default {
  name: 'TradeHistory',
  data() {
    return {
      teamA: {},
      teamB: {},
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
