<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div>
        <v-app-bar-title>
          商品在庫発注管理システム
        </v-app-bar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="/delivery" text>
        <v-icon>mdi-page-next-outline</v-icon>
        <span class="mx-2">納品管理</span>
      </v-btn>

      <v-btn href="#" text>
        <v-icon>mdi-package-variant-closed</v-icon>
        <span class="mx-2">在庫管理</span>
      </v-btn>

      <v-btn href="/order" text>
        <v-icon>mdi-order-bool-ascending-variant</v-icon>
        <span class="mx-2">発注管理</span>
      </v-btn>

    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
};
</script>
