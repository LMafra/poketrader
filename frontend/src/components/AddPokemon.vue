<template lang="pug">
v-container(@submit.prevent="submit")
  v-layout(column wrap class="my-5" align-center)
    v-flex(xs12 sm4 class="my-3")
      div(class="text-xs-center")
        v-text-field(label="Adicionar Novo Pokémon" v-model="form.pokemonName")
        v-btn(type="submit" @click="add") Adicionar
</template>

<script>

export default {
  pokemonName: 'AddPokemon',
  data() {
    return {
      form: {
        pokemonName: '',
      },
      submitting: false,
    };
  },
  methods: {

    async add() {
      try {
        this.submitting = true;
        if (!this.form.pokemonName) {
          this.$notify({
            color: 'red',
            group: 'notification',
            position: 'top center',
            text: 'Busca vazia',
          });
          return;
        }
        this.$emit('addPokemon', this.form.pokemonName.toLowerCase());
      } catch (err) {
        this.$notify(err);
        this.submitting = false;
      }
    },
  },
};
</script>
