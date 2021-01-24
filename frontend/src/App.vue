<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">

body {
  font-family: "Inter", "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif;
}
.block {
  display:block;
}
#app {
  color: #2c3e50;
}
</style>
