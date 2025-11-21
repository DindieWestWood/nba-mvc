<script setup lang="ts">
import { useAttrs } from 'vue';
import Card from './Card.vue';

interface Props {
  headline?: string;
  listLabel: string;
  players: any;

}

const attrs = useAttrs();
const props = defineProps<Props>()

</script>
<template>
<Card v-bind="attrs" clickable>
  <div class="player-list-card">
    <slot name="title">
      <p v-if="props.headline" class="player-list-card__rank">
        {{props.headline}}
      </p>
    </slot>
    <dl class="player-list-card__list" :aria-label="props.listLabel">
      <template v-for="(player, index) in players" :key="player.id ?? player.rank">
        <dt>
          <slot name="term" :player :index>{{ player.name }}</slot>
        </dt>
        <dd>
          <slot name="detail" :player="player" :index></slot>
        </dd>
      </template>
    </dl>
  </div>
</Card> 
</template>
<style scoped lang="scss">
.player-list-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  height: 100%;
  
  &__rank {
    font-family: 'Bungee Shade';
    font-size: 60px;
    line-height: 100%;
    margin-bottom: 1rem;
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: 0.5rem;
    row-gap: 0.25rem;
    justify-content: stretch;

    & dd {
     text-align: center;
    }
  }
}
</style>