<script setup lang="ts">
import { useAttrs } from 'vue';
import LinkCard from './LinkCard.vue';

type PlayerListEntry = {
  id?: string | number;
  rank?: number;
  name: string;
  headshot?: string;
} & Record<string, unknown>;

interface Props {
  headline?: string;
  listLabel: string;
  players: PlayerListEntry[];
}

const attrs = useAttrs();
const props = defineProps<Props>()

const getHeadshot = (player: PlayerListEntry): string | null => {
  if (typeof player.headshot === 'string' && player.headshot.trim().length) {
    return player.headshot;
  }

  if (player.id) {
    return `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`;
  }

  return null;
}

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
      <template v-for="(player, index) in players" :key="player.id ?? player.rank">
        <dt>
          <slot name="term" :player :index>
            <div class="player-list-card__player">
              <img
                v-if="getHeadshot(player)"
                class="player-list-card__avatar"
                :src="getHeadshot(player)!"
                alt=""
                loading="lazy"
              />
              <span>{{ player.name }}</span>
            </div>
          </slot>
        </dt>
        <dd>
          <slot name="detail" :player="player" :index></slot>
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

  &__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--separator-color);
  }
}
</style>
