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
          v-flex(xs12 sm4)
            v-card(height="500px" class="scroll" justify-center)
              div(class="d-flex grow flex-wrap")
                v-card-title(primary-title class="layout justify-center") Escolha um Pokémon
                add-pokemon(@addPokemon="addPokemon")
                pokemon-card(v-for="(pokemon, index) in pokemons"
                      :key="index"
                      :pokemon="pokemon"
                      @click.native="selectPokemonToTeam(pokemon)")
          v-flex(xs12 sm4)
            v-card(tile)
              div(class="d-flex grow flex-wrap")
                v-card-title(primary-title class="layout justify-center") Pokémon Escolhido
                v-card-text
                  v-row(class="text-center")
                    selected-pokemon(:pokemon="selectedPokemon"
                              @addTeamA="fillTeamA"
                              @addTeamB="fillTeamB")
          v-flex(xs12 sm4)
            v-card(tile)
              div(class="d-flex grow flex-wrap")
                v-card-title(primary-title class="layout justify-center") Equipes para troca
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
    banner() {
      return '~/pokemon1.jpg';
    },
  },
  methods: {
    async loadPokemons() {
      await api
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
    async addPokemon(name) {
      await api
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
    async getLastTrade() {
      await api
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
          this.teamA.teamPokemons.forEach(async (teamA) => {
            this.trade.pokemonId = teamA.pokemon.id;
            this.trade.trainer = this.teamA.trainer;
            await api.post('/trades', this.trade)
              .then(() => {
                this.$notify({
                  color: 'red',
                  group: 'notification',
                  position: 'top center',
                  text: 'Troca realizada com sucesso!',
                });
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
          this.teamB.teamPokemons.forEach(async (teamB) => {
            this.trade.pokemonId = teamB.pokemon.id;
            this.trade.trainer = this.teamB.trainer;
            await api.post('/trades', this.trade)
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

<style scoped>
.finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}

.scroll {
  overflow-y: scroll
}
</style>
