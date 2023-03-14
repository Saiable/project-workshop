import { createMachine, interpret } from "xstate";
const pedestrianStates = {
  initial: 'walk',
  states: {
    walk: {
      on: {
        PED_COUNTDOWN: { target: 'wait' }
      }
    },
    wait: {
      on: {
        PED_COUNTDOWN: { target: 'stop' }
      }
    },
    stop: {},
    blinking: {}
  }
};

const lightMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYgAUB5AdQFEAlAfQoFUAVAQQHEaBtABgC6iUAAcA9rFwAXXGPzCQAD0QAWAEwAaEAE9EADgCMAOgCsAXzNa0WPIVKVajOjQDKrCs4Ai-IUhDjJGTkFZQR1LV0ENQBmYwA2BLiAdnUATji+OIM1CysMHAJiIygAJzAwfBJWAEkAWXofBQDpWXk-ULUVPSM+VOikkwjEaJM1IxUDBKTDAz4BvRVckGsCuyNtMAAbTbEAdyq6hsEmiRbg9tUTJKM4tUGdYdHxyeSZuZMFpZXbIrKIA-qdEafmaQTaoA6Hx6fQGQwQBhGRlSLySfC6CLi0VSOUsy3yPyIRj+Rl26E2AGtyDRPAwAMIsAByrE81AZwNEpzBIUQSRiRiS6T0sIeUTiJiRKLe80WuO+hUJxNJ0ipNPpzCZLKobOOIM5rW58L4kyMhjucLUYolUylHxluPwYggcAUcrsJ0C+ouCAAtHE4b6vvj5cUyhV3WdwUpVJoRQZ1D0+Im5rc+qkVCZooGbMGNts9uGuV6RtckmLbvdIiMxsiEoZsSZ01cs6tfpAC56IYgTHEVEY1ILhZEDNNntaDLNpZnZUG1oqyeT2+dOwhMdF+QOK4gLXFR3E63dG0lmwSiZASehpIvI6FsTvTZvRTuJrWDPXD8fg8TYFIxCIrwbslfE01Hvc0El3fcGxMJtp2zWczwAI02AhyQIKB-y9LIxn7PdB2GTorT3V8D2go8LDMIA */
  key: 'light',
  initial: 'green',
  states: {
    green: {
      on: {
        TIMER: { target: 'yellow' }
      }
    },
    yellow: {
      on: {
        TIMER: { target: 'red' }
      }
    },
    red: {
      on: {
        TIMER: { target: 'green' }
      },
      ...pedestrianStates
    }
  },
  on: {
    POWER_OUTAGE: { target: '.red.blinking' },
    POWER_RESTORED: { target: '.red' }
  }
});