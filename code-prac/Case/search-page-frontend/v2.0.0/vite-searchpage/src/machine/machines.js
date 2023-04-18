import {
    assign,
    createMachine
} from 'xstate';

export function fetchDataMachine() {
    return createMachine({
        /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALAdASwgBswBiAMQFEAVAYQAkBtABgF1FQAHAe1jzTy4A7diAAeiAIwBOKTgCsAZilMAbABY1TOQCYVCgBxqANCACeiBUyY4lcw1O0B2LY6mOFAXw8nUmXIS4AQwg8QSgSCCEwfEEANy4Aa2jfbBwA4NCoBFD4jED+IWYWIpFuXgLhJDFEORU5HDUFRzkmNyl9KRV3E3MECWcbBTkpNXcVFRGFJq8fdFT0kLCSMAAnFa4VnA5CfOQNgFscFP8gxaycrjyKopKqsr4BStBxPuUcFX1tbSkFb4VGtw9RCOeRWKz6WxuPRqCQzEDHI6BPCEACuK1IACVqBiAJq3Tg8B5CEQvbRWHBMCS1XRSCQfbSjCRAvr6fTyFTaOQSSxuL76FRebwgQRcCBwETHUqEiokySyGQK2nfQwtJrMgC0rhwitpKiYmm0CnGcIRBGIUvKj1lCEcbP+HTkjkcht+umZDLUOAdhmalhpEJNcxOGTCFqJT2qCCNEhw7ka+iYLrUdiGzLpbNUnIknKcEjU420gb8OFgKIwGDg8Du0qtVReji6NiY7lUlJk0gUabknv02a52mzBhkdiLqWQSNR6LDMrriEbOqV7WT+rTTDZ0lc2gT3MU+kcakFHiAA */
        predictableActionArguments: true,
        id: 'fetch',
        initial: 'idle',
        context: {
            data: undefined,
            error: undefined
        },
        states: {
            idle: {
                on: {
                    FETCH: 'loading'
                }
            },
            loading: {
                invoke: {
                    src: 'fetchData',
                    onDone: {
                        target: 'success',
                        actions: assign({
                            data: (_context, event) => event.data
                        })
                    },
                    onError: {
                        target: 'failure',
                        actions: assign({
                            error: (_context, event) => event.data
                        })
                    }
                }
            },
            success: {
                entry: 'notifySuccess',
                type: 'final'
            },
            failure: {
                on: {
                    RETRY: 'loading'
                }
            }
        }
    });
};

export function authMachine() {
    return createMachine({
        /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFmAduglgMbIED2OAdIdoQNb45QCSAZgDKlQwRM4DEYAE6DSgigAcANiRaiAthTRZcBYmUrUwdBs3aduvBAwBupNfnIBtAAwBdG7cShxpWPnVOQAD0QAmawDsFAAsAKwAzACMvgCc-jHBAZEAHKEANCAAnn7WFAHJ0cHJMTHhoaExAGwAvtUZSth4RCQWGjT0jKwcXJC8fABKAKIACgDy-QAqAPpMAMpTbKMA4kuDACIzAHIOni5uHkjeOUFhUbHxiSnpWYiRwbnJlWHJvsn5odYxtfUYjaot5Co7R0XX0vX4QzGkxm80WK3WU1GAFUJjtDnt3K1PD4EP4ThFonFPpdUhlsggALSxPIpAKhXz+WLWMqRGp1EANFTNdQUSRgnj8OGIlFo5yuTHkbGIR6VCgVcIBAJRcIxJLhMmICkRCisyp6qq+YKRUIBSpfdmcprmQF8noQUYYPhCpjbOy7cUHUA4xW5BUffx3GL0yrqm6U3wUPVR5LBXymhImsK1dk4UgQOCeS3-T0gDE5nEU-IUawlksMv1GhUayl3XJRyoBaypVmqunfDm-LnWtpaDq6boGHDu-ZYw4F8K5Utl3wVyLhPXVyKRGIUONN8K+ZfL6wz80-ZRWgGUW2D4cSodj26BUIhWNKpKPUJzyqLlevQoFcrBGKBdtZ7mtLy-IOugZ75ogwSVMkFAvAU87lPSxTWC+YYUvOOplEaCRRKEYSbmytRAA */
        id: 'authentication',
        initial: 'checkingIfLoggedIn',
        states: {
            checkingIfLoggedIn: {
                invoke: {
                    src: 'checkIfLoggedIn',
                    onError: {
                        target: 'loggedOut',
                    },
                },
                on: {
                    REPORT_IS_LOGGED_IN: {
                        target: 'loggedIn',
                        actions: 'assignUserDetailsToContext',
                    },
                    REPORT_IS_LOGGED_OUT: 'loggedOut',
                },
            },
            loggedIn: {
                on: {
                    LOG_OUT: {
                        target: 'loggedOut',
                    },
                },
            },
            loggedOut: {
                entry: ['navigateToAuthPage', 'clearUserDetailsFromContext'],
                on: {
                    LOG_IN: {
                        target: 'loggedIn',
                        actions: 'assignUserDetailsToContext',
                    },
                },
            },
        },
    });
};

export function storageMachine() {
    return createMachine({
        /** @xstate-layout N4IgpgJg5mDOIC5SwC4HsBOBDGA6MAtgA4oCeAxAMoCiAKgPoDS1AmgNoAMAuoqEWrACWKQWgB2vEAA9EAWgCMAZlzyAbKoAsHDfIAcaxQHZNATgA0IUoiUdcAJjvz5dk4oCsbxbo4dDAXz8LVEwcMFwACyxYABEsFCxyCHEwwTEANzQAazDg7DxImLisBFSMgGM40TFOLhrJfiERcUkZBA03O1x3DvlXEw49QwsrBDtDeS6B+XG3VXkOHoCg9Dywgtj48jAMDExcIgAbOIAzTAJcXNCIqI3i0rQKpuruOqQQBuEqlsQ7VTdcVS+VSGBwcBwadrDRAmQy4DR2fQ6Yy6NwcXQmJYgS54NAAVxQAHljgAlLBiGDkYl0Ynsbj1ASfZpvEYmf4mBHORyA3R2WbyCytVQw3AwuyKVSKXz6XyKAKBEBiNAQOCSbFgemNL5vVqyBywuw6DiKGEadw8vRQhC6OEctHtIWeDx2TFq-DEMgaxkSbVyaYmeyG42GU1uc26S2-TomdpGwE6Rzil0rK7rIqep7fBDyLQqNROVEmebAiPzOEaFF-MbA4ympMhPCwXFlMpweBvD4Zn1tHS4TxqEGeLyKX5uS3i60S+H6RTZ35CuurXB4wkkskwdNa0CtdrW7PwrxS+Yg1SW1kijkONRo3lzOV+IA */
        id: 'storage',
        initial: 'empty',
        context: {
            key: {},
        },
        states: {
            empty: {
                on: {
                    SET_KEY: 'hasData'
                }
            },
            hasData: {
                invoke: {
                    src: 'setData',
                    onDone: {
                        target: 'success'
                    },
                    onError: {
                        target: 'outOfRange'
                    }
                }
            },
            success: {
                entry: 'notifySuccess',
                type: 'final'
            },
            outOfRange: {
                on: {
                    RETRY: {
                        target: 'hasData'
                    }
                }
            }
        }
    })
};