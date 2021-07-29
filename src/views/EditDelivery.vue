<template>
  <v-card
    class="mx-auto mt-10"
    max-width="500"
  >
    <v-card-text>
      <v-list-item-title class="text-h5 mt-3 ml-3">
        納品編集 
      </v-list-item-title>

      <v-row>
        <v-col cols="10" md="8" class="mx-auto my-3">
          <v-text-field label="納品者" v-model="person"></v-text-field>
          <v-text-field label="商品" v-model="product"></v-text-field>
          <v-text-field label="個数" v-model="amount"></v-text-field>
          <v-text-field label="日付" type="date" v-model="date"></v-text-field>
        </v-col>
      </v-row>

      <v-alert
        v-show="error"
        dense
        outlined
        type="error"
      >
        {{ error }}
      </v-alert>

      <v-card-actions>
        <v-btn
          text
          color="info accent-4"
          @click="add"
        >
          <v-icon>mdi-playlist-plus</v-icon>
          <span class="mx-2">登録</span>
        </v-btn>
        <v-btn
          text
          color="info accent-4"
          href="/delivery"
        >
          <v-icon>mdi-undo-variant</v-icon>
          <span class="mx-2">戻る</span>
        </v-btn>
      </v-card-actions>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      person: '',
      product: '',
      amount: '',
      date: '',
      error: ''
    }
  },
  methods: {
    add() {
      // チェック
      if (!this.person || !this.product || !this.amount || !this.date) {
        this.error = 'すべて入力してください。';
        return;
      }
      // 登録
      this.$store.dispatch('delivery/addDelivery', {
        person: this.person,
        product: this.product,
        amount: this.amount.replace(/０−９/g, (s) => { 
          return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
        }),
        date: this.date.replace(/-/g, '/')
      });
    }
  }
}
</script>