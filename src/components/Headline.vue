<script setup lang="ts">
import Star from './Star.vue';
</script>

<template>
  <div class="headline-container">
    <p class="headeline-prefix">NBA's</p>
    <h1 class="headline">Most Valuable Contract</h1>
    <div class="headline-overlay-container">
      <div class="headline-overlay">
        <p>MVC</p>
        <div class="headline-stars">
          <Star class="headline-star"/>
          <Star class="headline-star" :pulse-frequency="3" :size="25"/>
          <Star class="headline-star" :pulse-frequency="4" :size="35"/>
          <Star class="headline-star" :pulse-frequency="3.4" :size="30"/>
          <Star class="headline-star" :pulse-frequency="4.2" :size="20"/>
          <Star class="headline-star" :pulse-frequency="2.7" :size="25"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .headline-container {
    position: relative;
  }

  .headeline-prefix {
    margin-bottom: 0.5rem;
    color: var(--headline-prefix-color);
  }

  .headline {
    color: var(--headline-color);
  }

  .headline-overlay-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-60%, -50%);
    width: 220px;
    height: 87px;
    user-select: none;
  } 

  .headline-overlay {
    position: relative;
    font-family: "Bungee Shade";
    line-height: 100%;
    text-transform: uppercase;
    font-size: 25vw;
    transform: rotate(-20deg);
    color: var(--headline-overlay-color);
  }

  .headline-stars {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(20deg);
  }

  .headline-star {
    position: absolute;

    &:nth-child(1) {
      right: -4%;
      top: -70%;
    }

    &:nth-child(2) {
      right: -7%;
    }

    &:nth-child(3) {
      bottom: -38%;
      left: 39%;
    }

    &:nth-child(4) {
      top: -35%;
      right: 25%;
    }

    &:nth-child(5) {
      top: 45%;
      left: -8%;
    }

    &:nth-child(6) {
      bottom: -60%;
      left: 3%;
    }
  }

</style>