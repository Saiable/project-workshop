import { createMachine } from "xstate";

export const playerMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAcA2BDAnmATgWXQGMALASwDswA6UiVMAYgAUAZAQQE0B9AIQFEA4gEkAcgG0ADAF1EKAPaxSAF1JzyskAA9EARgDMAJgA0ITIgAcATirmA7AFYAvo5NosuAiQrU3mClB4wKApmdg5JGSQQZAVlVXUo7QQAFnsDKgA2Wx07exMzBH0DZ1cMbHwiMkoqX39A4PJmNgBVAGU+CI0YxRU1DSTU9Kych3zEA3t7KgmS6LKPSu8asv8mto7pLtjehNAk2wMdTOzcscK9ZKonFzn3Cq9q2vIoUM5eQVFOqO64vsTEQbHEZ5UwWI7XUp3TxVHzoACusEgr3Cm2+23i-UQtj0ekyEkselGoIQ5mSzhu5DkEDgXXm9xhWx6GP+CAAtBkzuzZr4Fg9qLR6IzfrstADjMTLBIqISIbdytClk8AkEKEKdpiEAYrFRkqSZWdJdKHNy6QrHitnmrmXtEBkdFKdPYMhMDVKJOYcZ6vZ6TVDFo94YiIFa-jaSXopi7ifpbFdyY4gA */
    predictableActionArguments: true,
    id: "playerMachine",
    initial: "idle",
    states: {
        idle: {
            on: { PLAY_BEGIN: { target: "playingBegin" } },
        },
        playingBegin: {
            on: {
                PLAY: { target: "playing" },
                PAUSE: { target: "paused" },
            },
        },
        playing: {
            on: {
                PAUSE: { target: "paused" },
                PLAY_BEGIN: { target: "playingBegin" }
            },
        },
        paused: {
            on: {
                PLAY: { target: "playing" },
            },
        },
    },
});


export const toggleMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCWAdgIYDGyeAbmAMQAqA8gOKMAyAogNoAMAuoqAAdUsPOVQF+IAB6IAjADYAnDi6rVAVgDM8gEw75XAByGANCACeczbJyK7d+Us2aA7Jp3qAvp7NoM2HFJyKjomVk5eSSERMQkkaTklFTUuLV19I1MLREMbABZ7RRcXdXUXLhcdQ28fEAJUCDhJPywwKOFRPHFJGQQAWnkzS375ZJTxtRdvX3RW-GIySjb46M7u+N68nSGclxx1Q2dNLkVZWUVDArzpkBaAoKX2mK640F6dRU0caw8jTTz1PJ1LJ-jsEIouCpDv8KsY9JpDF4akA */
    id: "toggle",
    initial: "inactive",
    states: {
        inactive: {
            on: { TOGGLE: "active" },
        },
        active: {
            on: { TOGGLE: "inactive" },
        },
    },
    predictableActionArguments: true,
});
