<template>
  <v-card
    class="mx-auto mt-10"
    max-width="500"
  >
    <v-card-text>
      <v-list-item-title class="text-h5 mt-3 ml-3">
        発注編集 
      </v-list-item-title>

      <v-row>
        <v-col cols="10" md="8" class="mx-auto my-3">
          <v-row>
            <v-col cols="6">
              <v-text-field label="発注者" v-model="person"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select :items="peple" label="選択" v-model="person"></v-select>
            </v-col>
          </v-row>
          <v-text-field label="商品" v-model="product"></v-text-field>
          <v-text-field label="個数" type="number" v-model="amount"></v-text-field>
          <v-text-field label="日付" type="date" v-model="date"></v-text-field>
        </v-col>
      </v-row>

      <v-alert v-show="error" dense outlined type="error">
        {{ error }}
      </v-alert>

      <v-card-actions>
        <v-btn text color="info accent-4" @click="create" v-if="isNew">
          <v-icon>mdi-playlist-plus</v-icon>
          <span class="mx-2">登録</span>
        </v-btn>
        <v-btn text color="info accent-4" @click="update" v-else>
          <v-icon>mdi-refresh</v-icon>
          <span class="mx-2">更新</span>
        </v-btn>
        <v-btn text color="info accent-4" href="/order">
          <v-icon>mdi-undo-variant</v-icon>
          <span class="mx-2">戻る</span>
        </v-btn>
      </v-card-actions>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  mounted() {
    if (this.$route.params.id > 0) {
      const data = this.$store.getters["order/getDataById"](Number(this.$route.params.id));
      this.person = data.person;
      this.product = data.product;
      this.amount = data.amount; 
      this.date = data.date.replace(/\//g, '-');
    }
    this.peple = this.$store.getters["order/getOrderPeople"];
  },
  data() {
    return {
      person: '',
      product: '',
      amount: '',
      date: '',
      error: '',
      isNew: (this.$route.params.id > 0) ? false : true,
      peple: []
    }
  },
  methods: {
    create() {
      // チェック
      if (!this.checkData()) return;
      // 登録
      this.$store.dispatch('order/createOrder', {
        person: this.person,
        product: this.product,
        amount: this.amount,
        date: this.date.replace(/-/g, '/')
      });
    },
    update() {
      // チェック
      if (!this.checkData()) return;
      // 更新
      this.$store.dispatch('order/updateOrder', {
        id: this.$route.params.id,
        person: this.person,
        product: this.product,
        amount: this.amount,
        date: this.date.replace(/-/g, '/')
      });
    },
    checkData() {
      if (!this.person || !this.product || !this.amount || !this.date) {
        this.error = 'すべて入力してください。';
        return false;
      }
      return true;
    }
  }
}
</script>