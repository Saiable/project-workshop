import './style.css';

import {
    send,
    createMachine,
    interpret
} from 'xstate';

const callback = (sendBack, receive) => {
    let timeout;
    receive(event => {
        console.log('Received:', event);
        
        timout = setTimeout(() => {
            sendBack({type: 'PING'})
        }, 1000);
    })
    return () => {
        clearTimeout(timeout);
    }
}
const fetchMachine = createMachine({
    initial: 'fetching',
    states: {
        fetching: {
            after: {
                1000: 'success'
            }
        },
        success: {
            type: 'final',
            data: {
                count: 42
            }
        }
    }
})
const machine = createMachine({
    initial: 'loading',
    states: {
        loading: {
            invoke: {
                id: 'fetchNumber',
                src: fetchMachine,
                onDone: {
                    target: 'success',
                    actions:(_, event) => {
                        console.log('DONE', event)
                    }
                }
            },
            on: {
                NOTIFY: {
                    actions: send('ANY_EVENT', {
                        to: "fetchNumber"
                    })
                },
                PING: {
                    target: 'success'
                }
            }
        },
        success: {

        },
        canceled: {

        }
    },
});

const service = interpret(machine).start();
service.subscribe(state => {
    console.log(state.value)
})
window.service = service;