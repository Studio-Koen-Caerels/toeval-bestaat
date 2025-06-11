<script setup>
import { onMounted, ref } from 'vue'
import Dice from '@/components/Dice.vue'
import moment from '@/utils/moment-setup'

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

const colors = ['red', 'green', 'blue', 'cyan', 'yellow', 'magenta']
const toeval = ['T', 'O', 'E', 'V', 'A', 'L']
const hasDelay = false
const delay = 1

// samenvatting van de zoektocht

const toevalBestaat = ref(false)
const startAt = ref(moment())
const endAt = ref(moment())
const duration = ref()

const startLabel = ref('')
const endLabel = ref('')
const durationLabel = ref('')

onMounted(() => {
  initCalculation()
})

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
  startAt.value = moment()
  startLabel.value =
    startAt.value.format('ddd') +
    ' ' +
    startAt.value.format('ll') +
    ' ' +
    startAt.value.format('LTS')

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
      endAt.value = moment()
      duration.value = moment.duration(endAt.value.diff(startAt.value))
      endLabel.value =
        endAt.value.format('ddd') + ' ' + endAt.value.format('ll') + ' ' + endAt.value.format('LTS')

      const h = String(duration.value.hours()).padStart(2, '0')
      const m = String(duration.value.minutes()).padStart(2, '0')
      const s = String(duration.value.seconds()).padStart(2, '0')
      durationLabel.value = `${h}u. ${m}m. ${s}s.`

      // --------------------------------------------------------------------------
      // TOEVAL bestaat
      // --------------------------------------------------------------------------

      toevalBestaat.value = true
    }

    // -- render reporting

    const totalDice =
      dice_1.value + dice_2.value + dice_3.value + dice_4.value + dice_5.value + dice_6.value
    const colorIndex = totalDice % colors.length

    if (result.value[resultString] === undefined) {
      result.value[resultString] = {
        string: resultString,
        hasUniqueDice: hasUniqueDice,
        toevalBestaat: toevalBestaat.value,
        numberOfResults: 0,
        color: colors[colorIndex],
      }
    } else {
      result.value[resultString].numberOfResults++
    }

    if (!hasDelay) {
      await new Promise((resolve) => setTimeout(resolve, 1))
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
            class="border-b-2 border-black"
            :style="`background-color:${colors[dice_1]}`"
          >
            <Dice :dice="dice_1 + 1" />
          </div>
          <div
            id="dice_2"
            class="border-b-2 border-black"
            :style="`background-color:${colors[dice_2]}`"
          >
            <Dice :dice="dice_2 + 1" />
          </div>
          <div
            id="dice_3"
            class="border-b-2 border-black"
            :style="`background-color:${colors[dice_3]}`"
          >
            <Dice :dice="dice_3 + 1" />
          </div>
          <div
            id="dice_4"
            class="border-b-2 border-black"
            :style="`background-color:${colors[dice_4]}`"
          >
            <Dice :dice="dice_4 + 1" />
          </div>
          <div
            id="dice_5"
            class="border-b-2 border-black"
            :style="`background-color:${colors[dice_5]}`"
          >
            <Dice :dice="dice_5 + 1" />
          </div>
          <div
            id="dice_6"
            class="border-b-2 border-black"
            :style="`background-color:${colors[dice_6]}`"
          >
            <Dice :dice="dice_6 + 1" />
          </div>
        </div>

        <!-- // render canvas -->

        <div id="rendering" class="overflow-x-auto overflow-y-none w-full flex bg-neutral-300">
          <div
            class="grid grid-flow-col grid-rows-48 m-6 border-l-2 border-t-[1px] border-neutral-400"
          >
            <div
              v-for="(item, key) in result"
              :key="key"
              class="w-[100px] h-full border-r-[2px] border-b-[1px] border-neutral-400"
            >
              <div class="text-xs h-full">
                <div v-if="item.toevalBestaat" class="flex">
                  <div class="border-b-[1px] border-black flex text-black bg-white">
                    <div
                      v-for="(char, index) in item.string"
                      :key="index"
                      class="border-r-[1px] border-neutral-400 px-0.5 h-full text-black"
                    >
                      {{ char }}
                    </div>
                  </div>
                  <div class="grow">&nbsp;</div>
                </div>
                <div v-else class="">
                  <div v-if="item.hasUniqueDice" class="flex h-full">
                    <div class="border-b-[1px] border-black flex">
                      <div
                        v-for="(char, index) in item.string"
                        :key="index"
                        :style="'color:' + item.color"
                        class="border-r-[1px] border-neutral-400 px-0.5 h-full"
                      >
                        {{ char }}
                      </div>
                    </div>
                    <div
                      class="rounded-full bg-red-500 text-white px-1 ml-0.5"
                      v-if="item.numberOfResults >= 2"
                    >
                      {{ item.numberOfResults }}
                    </div>
                  </div>
                  <div v-else class="flex h-full">
                    <div class="flex">
                      <div
                        v-for="(char, index) in item.string"
                        :key="index"
                        :style="'color:' + item.color"
                        class="border-r-[1px] border-neutral-400 px-0.5 h-full"
                      >
                        {{ char }}
                      </div>
                    </div>
                    <div
                      class="rounded-full bg-red-500 text-white px-1 ml-0.5"
                      v-if="item.numberOfResults >= 2"
                    >
                      {{ item.numberOfResults }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="grow">&nbsp;</div>
        </div>
      </div>
    </main>

    <!-- footer -->
    <footer>
      <div id="footer" class="flex bg-black text-white">
        <div class="p-3 w-48">{{ numberOfAttempts }} pogingen</div>
        <div class="p-3 flex gap-1">
          <div>gestart op {{ startLabel }}</div>
          <div v-if="toevalBestaat">en beëindigd op {{ endLabel }}</div>
          <div v-if="toevalBestaat">(duur {{ durationLabel }})</div>
        </div>
        <div class="grow"></div>
        <div class="p-3" @click="initCalculation">Toeval bestaat</div>
      </div>
    </footer>
  </div>
</template>
