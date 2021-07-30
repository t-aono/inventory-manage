<template>
  <v-card
    class="mx-auto mt-10"
    max-width="1000"
  >
    <v-card-text>
      <v-list-item-title class="text-h5 mt-3 ml-5">
        <v-icon>mdi-page-next-outline</v-icon>
        <span class="mx-2">納品管理</span>
      </v-list-item-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="info accent-4"
          href="/delivery-edit/0"
        >
          <v-icon>mdi-plus-circle-outline</v-icon>新規追加
        </v-btn>
      </v-card-actions>

      <v-row>
        <v-col cols="10" sm="6" md="4" class="ml-5">
          <v-select :items="peple" label="納品者を選択" v-model="search"></v-select>
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
          <v-btn text color="info accent-4" :href="'/delivery-edit/' + item.id">
            <v-icon>mdi-pencil-outline</v-icon>編集
          </v-btn>
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
  mounted() {
    this.peple = this.$store.getters["delivery/getDeliveryPeople"];
    this.deliveries = this.$store.getters["delivery/getDeliveries"];
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
        { text: '納品者', value: 'person' },
        { text: '商品', value: 'product' },
        { text: '個数', value: 'amount' },
        { text: '納品日付', value: 'date' },
        { text: '', value: 'id' },
      ],
      deliveries: []
    }
  },
  methods: {
    deleteDelivery(id) {
      if (confirm('削除しますか？')) {
        this.$store.dispatch('delivery/deleteDelivery', { id });
      }
    },
  }
}
</script>