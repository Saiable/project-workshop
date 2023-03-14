<template>
  <div></div>
</template>
<script>
import { createMachine } from "xstate";
export default {
  name: "Xstate",
  setup() {
    const promiseMachine = createMachine({
      id: "promise",
      initial: "pendding",
      states: {
        pendding: {
          on: {
            RESOLVE: { target: "resolved" },
            REJECT: { target: "rejected" },
          },
        },
        resolved: {
            type: "final"
        },
        rejected: {
            type: "final"
        },
      },
    });
  }
};
</script>