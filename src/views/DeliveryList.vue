<template>
  <v-card class="mx-auto mt-10" max-width="1000">
    <v-card-text>

      <v-list-item-title class="text-h5 mt-3 ml-5">
        <v-icon>mdi-page-next-outline</v-icon>
        <span class="mx-2">納入管理</span>
      </v-list-item-title>

      <v-card-actions v-if="this.existProduct">
        <v-spacer></v-spacer>
        <router-link to="/delivery-edit/0">
          <v-btn
            text
            color="info accent-4"
          >
            <v-icon>mdi-plus-circle-outline</v-icon>新規追加
          </v-btn>
        </router-link>
      </v-card-actions>

      <div v-else>
        <v-alert dense outlined type="warning" class="mt-5">
          商品が未登録です。在庫管理から登録してください。
        </v-alert>
      </div>

      <v-row>
        <v-col cols="10" sm="6" md="4" class="ml-5">
          <v-select :items='$store.getters["delivery/getDeliveryPeople"]' label="納入者を選択" v-model="search"></v-select>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="deliveries"
        :items-per-page="15"
        :search="search"
        class="elevation-1 mx-5 mb-5"
      >
        <template v-slot:[`item.id`]="{ item }">
          <router-link :to="{name: 'delivery-edit', params:{ id: item.id }}">
            <v-btn text color="info accent-4">
              <v-icon>mdi-pencil-outline</v-icon>編集
            </v-btn>
          </router-link>
          <v-btn text color="info accent-4" @click="deleteDelivery(item.id)">
            <v-icon>mdi-trash-can-outline</v-icon>削除
          </v-btn>
        </template>
      </v-data-table>
          
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  created() {
    this.existProduct = (this.$store.state.stock.products.length == 0) ? false : true;
  },
  mounted() {
    // ステートにセット
    this.$store.dispatch('stock/fetchData');
    this.$store.dispatch('delivery/fetchData');
    // 表示項目セット
    this.deliveries = this.$store.getters["delivery/getDeliveries"];
  },
  data() {
    return {
      search: '',
      headers: [
        {
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '納入者', value: 'person' },
        { text: '商品', value: 'product' },
        { text: '個数', value: 'amount' },
        { text: '納入日付', value: 'date' },
        { text: '', value: 'id' },
      ],
      deliveries: [],
      existProduct: true
    }
  },
  methods: {
    deleteDelivery(id) {
      const product = this.deliveries.find(data => data.id === id).product;
      const addAmount = this.deliveries.find(data => data.id === id).amount;
      const stockId = this.$store.getters['stock/getDeliveries'].find(data => data.product === product).id;
      if (confirm('削除しますか？')) {
        this.$store.dispatch('delivery/deleteDelivery', {
          id,
          addAmount,
          stockId
        });
      }
    },
  }
}
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }
</style>