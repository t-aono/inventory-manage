<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true" class="d-block d-md-none"></v-app-bar-nav-icon>
      
      <v-navigation-drawer v-model="drawer" absolute temporary app color="primary">
        <v-list>
          <v-list-item>
            <router-link to="/">
              <v-icon>mdi-home</v-icon>
              <span class="mx-2 white--text">トップページ</span>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/delivery">
              <v-icon>mdi-page-next-outline</v-icon>
              <span class="mx-2 white--text">納入管理</span>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/stock">
              <v-icon>mdi-package-variant-closed</v-icon>
              <span class="mx-2 white--text">在庫管理</span>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/order">
              <v-icon>mdi-order-bool-ascending-variant</v-icon>
              <span class="mx-2 white--text">発注管理</span>
            </router-link>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar-title>
        商品在庫発注管理システム
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="d-none d-md-block">
        <router-link to="/">
          <v-btn text>
            <v-icon>mdi-home</v-icon>
            <span class="mx-2 white--text">トップページ</span>
          </v-btn>
        </router-link>

        <router-link to="/delivery">
          <v-btn text>
            <v-icon>mdi-page-next-outline</v-icon>
            <span class="mx-2">納入管理</span>
          </v-btn>
        </router-link>

        <router-link to="/stock">
          <v-btn text>
            <v-icon>mdi-package-variant-closed</v-icon>
            <span class="mx-2">在庫管理</span>
          </v-btn>
        </router-link>

        <router-link to="/order">
          <v-btn text>
            <v-icon>mdi-order-bool-ascending-variant</v-icon>
            <span class="mx-2">発注管理</span>
          </v-btn>
        </router-link>
      </div>

    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: null
  }),
  created() {
    // ステートにセット
    this.$store.dispatch('stock/fetchData');
  }
};
</script>

<style>
  a {
    text-decoration: none;
  }
</style>
