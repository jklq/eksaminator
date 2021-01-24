<style lang="scss">
@use './base.scss' as b;

.hero {
  font-size: 1.2em;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 10px 10px 0 0;
  background-color: b.$backgroundColor;
  padding: 4rem;
  background-image: url("../../assets/robot2.svg");
  background-repeat: no-repeat;
  background-size: 30%;
  background-position: 85% -100%;
}
@media (min-width: 30rem) {
  .hero .captions {
    text-align: left;
  }
  .hero .captions h1 {
    font-weight: 800;
    color: b.$primaryColorDark;
    margin: 0;
    font-size: 2em;
    max-width: 20ch;
  }
  .hero .captions p {
    max-width: 40ch;
  }
  .hero .captions .btn {
      margin-right: 10px;
  }
}
</style>

<template>
  <section class="hero">
    <div class="captions">
      <slot></slot>
    </div>
  </section>
</template>
