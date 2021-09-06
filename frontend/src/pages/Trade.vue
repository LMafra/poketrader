<template lang="pug">
v-app
  v-toolbar(flat)
    v-toolbar-title Pokemon Trader
    v-spacer
    v-toolbar-items
      v-btn(text @click="goToTrade") Trades
      v-btn(text @click="goToHistory") History
  v-container(id="home" fluid)
    v-row(cols="12" lg="4")
      v-col(cols="4")
        v-card(class="mx-auto my-12" max-width="374")
          add-pokemon(@addPokemon="addPokemon")
          v-card-title Escolha um Pokémon
          v-card-text
            v-row(class="text-center")
              pokemon-card(v-for="(pokemon, index) in pokemons"
                    :key="index"
                    :pokemon="pokemon"
                    @click.native="selectPokemonToTeam(pokemon)")
      v-col(cols="3")
        v-card(class="mx-auto my-12" max-width="374")
          v-card-title Pokémon Escolhido
          v-card-text
            v-row(class="text-center")
              selected-pokemon(:pokemon="selectedPokemon"
                        @addTeamA="fillTeamA"
                        @addTeamB="fillTeamB")
      v-col(cols="5")
        v-card(class="mx-auto my-12" max-width="374")
          v-card-title Equipes para troca
          v-card-text
            display-team(:teamA="teamA"
                    :teamB="teamB"
                    @tradeSuccess="tradePokemon"
                    @reset="cleanTeams")
</template>

<script>

import api from '../services/api';
import PokemonCard from '../components/PokemonCard';
import AddPokemon from '../components/AddPokemon';
import SelectedPokemon from '../components/SelectedPokemon';
import DisplayTeam from '../components/DisplayTeam';

export default {
  name: 'Home',
  components: {
    PokemonCard,
    AddPokemon,
    SelectedPokemon,
    DisplayTeam,
  },
  data() {
    return {
      pokemons: [],
      tradeId: 0,
      selectedPokemon: {},
      teamA: {
        trainer: 0,
        teamPokemons: [],
      },
      teamB: {
        trainer: 0,
        teamPokemons: [],
      },
      trade: {
        trainer: 0,
        pokemonId: 0,
        tradeId: 0,
      },
    };
  },
  computed: {
  },
  methods: {
    loadPokemons() {
      api
        .get('/pokemons')
        .then((res) => {
          this.pokemons = res.data;
        })
        .catch((err) => {
          this.$notify({
            color: 'red',
            group: 'notification',
            position: 'top center',
            text: `${err}`,
          });
        });
    },
    addPokemon(name) {
      api
        .post(`/pokemons/${name}`)
        .then(() => {
          this.$notify('Sucesso');
        })
        .catch((err) => {
          this.$notify({
            color: 'red',
            group: 'notification',
            position: 'top center',
            text: `${err}`,
          });
        });
    },
    getLastTrade() {
      api
        .get('/trades/last')
        .then((res) => {
          this.tradeId = res.data;
        })
        .catch((err) => {
          this.$notify({
            color: 'red',
            group: 'notification',
            position: 'top center',
            text: `${err}`,
          });
        });
    },
    async tradePokemon() {
      try {
        this.trade.tradeId = this.tradeId + 1;
        if (this.teamA) {
          this.teamA.teamPokemons.forEach((teamA) => {
            this.trade.pokemonId = teamA.pokemon.id;
            this.trade.trainer = this.teamA.trainer;
            api.post('/trades', this.trade)
              .then(() => {
                this.$notify('Sucesso');
              })
              .catch((err) => {
                this.$notify({
                  color: 'red',
                  group: 'notification',
                  position: 'top center',
                  text: `${err}`,
                });
              });
          });
        }
        if (this.teamB) {
          this.teamB.teamPokemons.forEach((teamB) => {
            this.trade.pokemonId = teamB.pokemon.id;
            this.trade.trainer = this.teamB.trainer;
            api.post('/trades', this.trade)
              .then(() => {
                this.$notify('Sucesso');
              })
              .catch((err) => {
                this.$notify({
                  color: 'red',
                  group: 'notification',
                  position: 'top center',
                  text: `${err}`,
                });
              });
          });
        }
      } catch (err) {
        this.$notify({
          color: 'red',
          group: 'notification',
          position: 'top center',
          text: `${err}`,
        });
      }
      this.cleanTeams();
    },
    cleanTeams() {
      this.teamA.teamPokemons = [];
      this.teamB.teamPokemons = [];
    },
    selectPokemonToTeam(pokemon) {
      this.selectedPokemon = pokemon;
    },
    fillTeamA(pokemon) {
      if (this.teamA.teamPokemons.length >= 6) {
        return;
      }
      this.teamA.trainer = 0;
      this.teamA.teamPokemons.push({ pokemon });
    },
    fillTeamB(pokemon) {
      if (this.teamB.teamPokemons.length >= 6) {
        return;
      }
      this.teamB.trainer = 1;
      this.teamB.teamPokemons.push({ pokemon });
    },
    goToTrade() {
      this.$router.push({ name: 'Trade' });
    },
    goToHistory() {
      this.$router.push({ name: 'History' });
    },
  },
  async mounted() {
    this.loadPokemons();
    this.getLastTrade();
  },
  updated() {
    this.loadPokemons();
    this.getLastTrade();
  },
};
</script>

<style>
  #home {
    display: flex;
  }
  #pokemon-card {
    margin: 15px
  }
</style>
