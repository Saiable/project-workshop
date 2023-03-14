import './style.css';

import { createMachine, interpret } from 'xstate';

const machine = createMachine({
    initial: 'loading',
    states: {
        loading: {
            entry: ['loadingData'],
            exit: [],
            on: {
                SUCCESS: {
                    actions: [() => {
                        console.log('Assigning data')
                    }],
                    target: 'loaded'
                }
            }
        },
        loaded: {},
        playing: {
            entry: [
                'playAudio'
            ],
            exit: [
                'exitAudio'
            ],
            on: {
                PAUSE: {
                    target: 'paused'
                }
            }
        },
        paused: {
            on: {
                PLAY: {
                    target: 'playing'
                }
            }
        }
    }
}).withConfig({
    actions: {
        loadingData: () => {
            console.log('configured loading data')
        }
    }
});

const service = interpret(machine).start();

service.subscribe(state => {
    console.log(state.value)
})

window.service = service;
