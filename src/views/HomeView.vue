<script setup>
import { ref } from 'vue'

const numberOfAttempts = ref(0)
const dice_1 = ref(0)
const dice_2 = ref(0)
const dice_3 = ref(0)
const dice_4 = ref(0)
const dice_5 = ref(0)
const dice_6 = ref(0)
const dice_1_text = ref('')
const dice_2_text = ref('')
const dice_3_text = ref('')
const dice_4_text = ref('')
const dice_5_text = ref('')
const dice_6_text = ref('')
const result = ref({})
const toevalBestaat = ref(false)

const colors = ['red', 'green', 'blue', 'cyan', 'yellow', 'magenta']
const toeval = ['T', 'O', 'E', 'V', 'A', 'L']
const hasDelay = false
const delay = 10


function initCalculation() {
  result.value = {}
  numberOfAttempts.value = 0
  toevalBestaat.value = false
  startCalculation()
  const container = document.getElementById('rendering')
  const observer = new MutationObserver(() => {
    container.scrollLeft = container.scrollWidth
  })
  observer.observe(container, { childList: true, subtree: true })
}

async function startCalculation() {
  while (!toevalBestaat.value) {
    numberOfAttempts.value++
    let resultString = ''

    // -- dice 1
    if (hasDelay) {
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
    dice_1.value = rollDice()
    dice_1_text.value = toeval[dice_1.value]
    resultString += dice_1_text.value

    // -- dice 2
    if (hasDelay) {
      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    dice_2.value = rollDice()
    dice_2_text.value = toeval[dice_2.value]
    resultString += dice_2_text.value

    // -- dice 3
    if (hasDelay) {
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
    dice_3.value = rollDice()
    dice_3_text.value = toeval[dice_3.value]
    resultString += dice_3_text.value

    // -- dice 4
    if (hasDelay) {
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
    dice_4.value = rollDice()
    dice_4_text.value = toeval[dice_4.value]
    resultString += dice_4_text.value

    // -- dice 5
    if (hasDelay) {
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
    dice_5.value = rollDice()
    dice_5_text.value = toeval[dice_5.value]
    resultString += dice_5_text.value

    // -- dice 6
    if (hasDelay) {
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
    dice_6.value = rollDice()
    dice_6_text.value = toeval[dice_6.value]
    resultString += dice_6_text.value

    // -- check if all the dice numbers are unique
    const uniqueDice = new Set([
      dice_1.value,
      dice_2.value,
      dice_3.value,
      dice_4.value,
      dice_5.value,
      dice_6.value,
    ])
    const hasUniqueDice = uniqueDice.size === 6

    if (resultString === 'TOEVAL') {
      toevalBestaat.value = true
    }

    if (result.value[resultString] === undefined) {
      result.value[resultString] = {
        string: resultString,
        hasUniqueDice: hasUniqueDice,
        toevalBestaat: toevalBestaat.value,
        numberOfResults: 0,
      }
    } else {
      result.value[resultString].numberOfResults++
    }
  }
}

function rollDice() {
  return Math.floor(Math.random() * 6)
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <main class="h-screen">
      <div class="flex w-full h-full">
        <div id="dice" class="w-[80px] bg-black border-r-2 border-black text-center font-bold">
          <div
            id="dice_1"
            class="p-4 border-b-2 border-black"
            :style="`background-color:${colors[dice_1]}`"
          >
            <div class="text-3xl">{{ dice_1 + 1 }}</div>
          </div>
          <div
            id="dice_2"
            class="p-4 text-3xl border-b-2 border-black"
            :style="`background-color:${colors[dice_2]}`"
          >
            {{ dice_2 + 1 }}
          </div>
          <div
            id="dice_3"
            class="p-4 text-3xl border-b-2 border-black"
            :style="`background-color:${colors[dice_3]}`"
          >
            {{ dice_3 + 1 }}
          </div>
          <div
            id="dice_4"
            class="p-4 text-3xl border-b-2 border-black"
            :style="`background-color:${colors[dice_4]}`"
          >
            {{ dice_4 + 1 }}
          </div>
          <div
            id="dice_5"
            class="p-4 text-3xl border-b-2 border-black"
            :style="`background-color:${colors[dice_5]}`"
          >
            {{ dice_5 + 1 }}
          </div>
          <div
            id="dice_6"
            class="p-4 text-3xl border-b-2 border-black"
            :style="`background-color:${colors[dice_6]}`"
          >
            {{ dice_6 + 1 }}
          </div>
        </div>
        <div id="rendering" class="overflow-x-auto overflow-y-none w-full">
          <div class="grid grid-flow-col grid-rows-48 ml-4 mt-2">
            <div v-for="(item, key) in result" :key="key" class="w-[85px] h-[18px] text-blue-700">
              <div class="text-xs">
                <div
                  v-if="item.toevalBestaat"
                  class="text-green-500 underline underline-offset-2 decoration-black"
                >
                  {{ item.string }}
                </div>
                <div v-else class="">
                  <div v-if="item.hasUniqueDice" class="flex gap-2">
                    <div class="underline underline-offset-2 decoration-black">
                      {{ item.string }}
                    </div>
                    <div
                      class="rounded-full bg-red-500 text-white px-1.5"
                      v-if="item.numberOfResults >= 2"
                    >
                      {{ item.numberOfResults }}
                    </div>
                  </div>
                  <div v-else class="flex gap-2">
                    <div class="">{{ item.string }}</div>
                    <div
                      class="rounded-full bg-red-500 text-white px-1.5"
                      v-if="item.numberOfResults >= 2"
                    >
                      {{ item.numberOfResults }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- footer -->
    <footer>
      <div id="footer" class="flex bg-black text-white">
        <div class="p-3">{{ numberOfAttempts }} pogingen</div>
        <div class="grow"></div>
        <div class="p-3" @click="initCalculation">Toeval bestaat</div>
      </div>
    </footer>
  </div>
</template>