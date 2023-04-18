<template>
  <div id="home">
    <button @click="send('TOGGLE')">
      {{
        state.value === "inactive"
          ? "Click to activate"
          : "Active! Click to deactivate"
      }}
    </button>
    <BackGround />
  </div>
</template>


<script setup>
import BackGround from "./components/BackGround.vue";
import { useMachine } from "@xstate/vue";
import { toggleMachine } from "@/machines";

const { state, send } = useMachine(toggleMachine);
</script>


