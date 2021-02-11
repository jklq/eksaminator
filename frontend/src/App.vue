<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
body {
  margin: 0;
  font-family: "Inter", "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif;
}
.bdock {
  display:block;
}
#app {
  color: #2c3e50;
}
p {
  font-size: 1.1em;
}
</style>
