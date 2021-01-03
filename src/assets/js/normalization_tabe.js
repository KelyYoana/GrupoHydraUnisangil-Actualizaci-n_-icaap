// Table used to calculate ICA by book method

let commonNormalizationTable = {
    100: {
        nitratos: {
            method: "interval",
            min: 0,
            max: 0.5
        },
        po4: {
            method: "interval",
            min: 0,
            max: 0.16
        },
        st: {
            method: "interval",
            min: 0,
            max: 250
        },
        ph: {
            method: "fixed",
            min: 7,
            max: 7
        },
        tempC: {
            method: "fixed",
            min: 16,
            max: 21
        },
        ct: {
            method: "interval",
            min: 0,
            max: 0.5
        },
        turbidez: {
            method: "interval",
            min: 0,
            max: 5
        }
    },
    90: {
        nitratos: {
            method: "interval",
            min: 0.5,
            max: 2
        },
        po4: {
            method: "interval",
            min: 0.16,
            max: 1.6
        },
        st: {
            method: "interval",
            min: 250,
            max: 750
        },
        ph: {
            method: "fixed",
            min: 7,
            max: 8
        },
        tempC: {
            method: "fixed",
            min: 15,
            max: 22
        },
        ct: {
            method: "interval",
            min: 0.5,
            max: 2
        },
        turbidez: {
            method: "interval",
            min: 5,
            max: 10
        }
    },
    80: {
        nitratos: {
            method: "interval",
            min: 2,
            max: 4
        },
        po4: {
            method: "interval",
            min: 1.6,
            max: 3.20
        },
        st: {
            method: "interval",
            min: 750,
            max: 1000
        },
        ph: {
            method: "fixed",
            min: 7,
            max: 8.5
        },
        tempC: {
            method: "fixed",
            min: 14,
            max: 24
        },
        ct: {
            method: "interval",
            min: 2,
            max: 3
        },
        turbidez: {
            method: "interval",
            min: 10,
            max: 15
        }
    },
    70: {
        nitratos: {
            method: "interval",
            min: 4,
            max: 6
        },
        po4: {
            method: "interval",
            min: 3.2,
            max: 6.4
        },
        st: {
            method: "interval",
            min: 1000,
            max: 1500
        },
        ph: {
            method: "fixed",
            min: 7,
            max: 9
        },
        tempC: {
            method: "fixed",
            min: 12,
            max: 26
        },
        ct: {
            method: "interval",
            min: 3,
            max: 4
        },
        turbidez: {
            method: "interval",
            min: 15,
            max: 20
        }
    },
    60: {
        nitratos: {
            method: "interval",
            min: 6,
            max: 8
        },
        po4: {
            method: "interval",
            min: 6.4,
            max: 9.6
        },
        st: {
            method: "interval",
            min: 1500,
            max: 2000
        },
        ph: {
            method: "fixed",
            min: 6.5,
            max: 6.5
        },
        tempC: {
            method: "fixed",
            min: 10,
            max: 28
        },
        ct: {
            method: "interval",
            min: 4,
            max: 5
        },
        turbidez: {
            method: "interval",
            min: 20,
            max: 25
        }
    },
    50: {
        nitratos: {
            method: "interval",
            min: 8,
            max: 10
        },
        po4: {
            method: "interval",
            min: 9.6,
            max: 16
        },
        st: {
            method: "interval",
            min: 2000,
            max: 3000
        },
        ph: {
            method: "fixed",
            min: 6,
            max: 9.5
        },
        tempC: {
            method: "fixed",
            min: 5,
            max: 30
        },
        ct: {
            method: "interval",
            min: 5,
            max: 6
        },
        turbidez: {
            method: "interval",
            min: 25,
            max: 30
        }
    },
    40: {
        nitratos: {
            method: "interval",
            min: 10,
            max: 15
        },
        po4: {
            method: "interval",
            min: 16,
            max: 32
        },
        st: {
            method: "interval",
            min: 3000,
            max: 5000
        },
        ph: {
            method: "fixed",
            min: 5,
            max: 10
        },
        tempC: {
            method: "fixed",
            min: 0,
            max: 32
        },
        ct: {
            method: "interval",
            min: 6,
            max: 8
        },
        turbidez: {
            method: "interval",
            min: 30,
            max: 40
        }
    },
    30: {
        nitratos: {
            method: "interval",
            min: 15,
            max: 20
        },
        po4: {
            method: "interval",
            min: 32,
            max: 64
        },
        st: {
            method: "interval",
            min: 5000,
            max: 8000
        },
        ph: {
            method: "fixed",
            min: 4,
            max: 11
        },
        tempC: {
            method: "fixed",
            min: -2,
            max: 36
        },
        ct: {
            method: "interval",
            min: 8,
            max: 10
        },
        turbidez: {
            method: "interval",
            min: 40,
            max: 60
        }
    },
    20: {
        nitratos: {
            method: "interval",
            min: 20,
            max: 50
        },
        po4: {
            method: "interval",
            min: 64,
            max: 96
        },
        st: {
            method: "interval",
            min: 8000,
            max: 12000
        },
        ph: {
            method: "fixed",
            min: 3,
            max: 12
        },
        tempC: {
            method: "fixed",
            min: -4,
            max: 40
        },
        ct: {
            method: "interval",
            min: 10,
            max: 12
        },
        turbidez: {
            method: "interval",
            min: 60,
            max: 80
        }
    },
    10: {
        nitratos: {
            method: "interval",
            min: 50,
            max: 101
        },
        po4: {
            method: "interval",
            min: 96,
            max: 161
        },
        st: {
            method: "interval",
            min: 12000,
            max: 20001
        },
        ph: {
            method: "fixed",
            min: 2,
            max: 13
        },
        tempC: {
            method: "fixed",
            min: -6,
            max: 45
        },
        ct: {
            method: "interval",
            min: 12,
            max: 16
        },
        turbidez: {
            method: "interval",
            min: 80,
            max: 101
        }
    },
    0: {
        nitratos: {
            method: "interval",
            min: 101,
            max: "00"
        },
        po4: {
            method: "interval",
            min: 161,
            max: "00"
        },
        st: {
            method: "interval",
            min: 20001,
            max: "00"
        },
        ph: {
            method: "fixed",
            min: 1,
            max: 14
        },
        tempC: {
            method: "interval-child",
            min: {
                method: "interval",
                min: 46,
                max: "00"
            },
            max: {
                method: "interval",
                min: 0,
                max: -6
            }
        },
        ct: {
            method: "interval",
            min: 16,
            max: "00"
        },
        turbidez: {
            method: "interval",
            min: 101,
            max: "00"
        }
    },

}

function getTable() {
    return commonNormalizationTable
}

module.exports = {
    getTable
}