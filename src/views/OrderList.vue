<template>
  <v-card
    class="mx-auto mt-10"
    max-width="1000"
  >
    <v-card-text>
      <v-list-item-title class="text-h5 mt-3 ml-5">
        <v-icon>mdi-order-bool-ascending-variant</v-icon>
        <span class="mx-2">発注管理</span>
      </v-list-item-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <router-link to="/order-edit/0">
          <v-btn text color="info accent-4">
            <v-icon>mdi-plus-circle-outline</v-icon>新規追加
          </v-btn>
        </router-link>
      </v-card-actions>

      <v-row>
        <v-col cols="10" sm="6" md="4" class="ml-5">
          <v-select :items="peple" label="発注者を選択" v-model="search"></v-select>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="orders"
        :items-per-page="15"
        :search="search"
        class="elevation-1 mx-5 mb-5"
      >
        <template v-slot:[`item.id`]="{ item }">
          <router-link :to="{name: 'order-edit', params: {id: item.id}}">
            <v-btn text color="info accent-4">
              <v-icon>mdi-pencil-outline</v-icon>編集
            </v-btn>
          </router-link>
          <v-btn text color="info accent-4" @click="deleteorder(item.id)">
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
    // ステートにセット
    this.$store.dispatch('stock/fetchData');
    this.$store.dispatch('order/fetchData');
    // 表示項目セット
    this.peple = this.$store.getters["order/getOrderPeople"];
    this.orders = this.$store.getters["order/getOrders"];
  },
  data() {
    return {
      peple: [],
      search: '',
      headers: [
        {
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '発注者', value: 'person' },
        { text: '商品', value: 'product' },
        { text: '個数', value: 'amount' },
        { text: '発注日付', value: 'date' },
        { text: '', value: 'id' },
      ],
      orders: []
    }
  },
  methods: {
    deleteorder(id) {
      const product = this.orders.find(data => data.id === id).product;
      const deleteAmount = this.orders.find(data => data.id === id).amount;
      const stockId = this.$store.getters['stock/getProducts'].find(data => data.product === product).id;
      if (confirm('削除しますか？')) {
        this.$store.dispatch('order/deleteOrder', { 
          id, 
          deleteAmount,
          stockId
        });
      }
    },
  }
}
</script>