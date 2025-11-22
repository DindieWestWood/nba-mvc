<script setup lang="ts">
import { useAttrs } from 'vue'
import LinkCard from './LinkCard.vue'
import Headshot from './Headshot.vue';
import Tag from './Tag.vue';

type PlayerListEntry = {
  id: number;
  name: string;
  team: string;
  value: string;
}

interface Props {
  headline: string;
  listLabel: string;
  players: PlayerListEntry[];
}

const attrs = useAttrs()
const props = defineProps<Props>()

</script>
<template>
<LinkCard v-bind="attrs">
  <div class="player-list-card">
    <slot name="title">
      <p v-if="props.headline" class="player-list-card__rank">
        {{props.headline}}
      </p>
    </slot>
    <dl class="player-list-card__list" :aria-label="props.listLabel">
      <template v-for="(player, index) in players" :key="player.id">
        <dt>
          <slot name="term" :player="player" :index="index">
            <div class="player-list-card__player">
              <Headshot :player-id="player.id" size="small"/>
              <p>
                <span
                  class="player-list-card__name"
                  :class="{ 'player-list-card__leader': index === 0 }"
                >
                  {{ player.name }}
                </span>
                <span class="player-list-card__team" v-if="player.team">&ensp;{{ player.team }}</span>
              </p>
            </div>
          </slot>
        </dt>
        <dd>
          <slot name="detail" :player="player" :index="index">
            <component :is="!!index ? 'span' : Tag">
              {{ player.value }}
            </component>
          </slot>
        </dd>
      </template>
    </dl>
  </div>
</LinkCard> 
</template>
<style scoped lang="scss">
.player-list-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  height: 100%;
  width: 100%;
  
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

  &__player {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  &__leader {
    font-weight: bold;
  }

  &__team {
    font-size: 0.75rem;
    color: var(--text-secondary-color);
  }
}
</style>
