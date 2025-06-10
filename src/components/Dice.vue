<script setup>
const props = defineProps({
  dice: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <div id="dice" class="w-full p-4 flex flex-col gap-1">
    <div class="flex">
      <div class="w-1/3 text-center">
        <div
          class="bg-black rounded-full w-3 h-3"
          v-if="dice === 6 || dice === 5 || dice === 4 || dice === 2 || dice === 3"
        >
          &nbsp;
        </div>
      </div>
      <div class="w-1/3 text-center h-3">&nbsp;</div>
      <div class="w-1/3 text-center">
        <div class="bg-black rounded-full w-3 h-3" v-if="dice === 6 || dice === 5 || dice === 4">
          &nbsp;
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="w-1/3 text-center">
        <div class="bg-black rounded-full w-3 h-3" v-if="dice === 6">&nbsp;</div>
      </div>
      <div class="w-1/3 text-center">
        <div class="bg-black rounded-full w-3 h-3" v-if="dice === 1 || dice === 5 || dice === 3">
          &nbsp;
        </div>
        <div v-else class="h-3">&nbsp;</div>
      </div>
      <div class="w-1/3 text-center">
        <div class="bg-black rounded-full w-3 h-3" v-if="dice === 6">&nbsp;</div>
      </div>
    </div>
    <div class="flex">
      <div class="w-1/3 text-center">
        <div class="bg-black rounded-full w-3 h-3" v-if="dice === 6 || dice === 5 || dice === 4">
          &nbsp;
        </div>
      </div>
      <div class="w-1/3 text-center h-3">&nbsp;</div>
      <div class="w-1/3 text-center">
        <div
          class="bg-black rounded-full w-3 h-3"
          v-if="dice === 6 || dice === 5 || dice === 4 || dice === 2 || dice === 3"
        >
          &nbsp;
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
