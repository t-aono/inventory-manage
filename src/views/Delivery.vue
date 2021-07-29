<template>
  <v-card
    class="mx-auto mt-10"
    max-width="1000"
  >
    <v-card-text>
      <v-list-item-title class="text-h5 mt-3 ml-3">
        納品管理  
      </v-list-item-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="info accent-4"
          href="/edit-delivery"
        >
        <v-icon>mdi-pencil-outline</v-icon>
          新規追加
        </v-btn>
      </v-card-actions>

      <v-row>
        <v-col cols="10" sm="6" md="4" class="ml-5">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="検索"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="deliveries"
        :items-per-page="15"
        :search="search"
        class="elevation-1 ma-5"
      >
      </v-data-table>
          

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  mounted() {
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
        { text: '納品者', value: 'person' },
        { text: '商品', value: 'product' },
        { text: '個数', value: 'amount' },
        { text: '納品日付', value: 'date' },
      ],
      deliveries: []
    }
  }
}
</script>