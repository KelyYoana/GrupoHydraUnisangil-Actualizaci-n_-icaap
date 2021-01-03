function checkOnline(callbacks) {
    console.log('[task.js | checkOnline]')
    if (navigator.onLine) {
        document.getElementById('connect-mode').innerHTML = "On line"
        callbacks.success();
    } else {
        document.getElementById('connect-mode').innerHTML = "Off line"
        callbacks.failure();
    }
}

function setEventListeners() {
    console.log('[task.js | setEventListeners]')
    window.addEventListener('online', function () {
        console.log('conectado a internet')
        document.getElementById('connect-mode').innerHTML = "On line"
    })

    window.addEventListener('offline', function () {
        console.log('no conectado');
        alert("No conectado a internet")
        document.getElementById('connect-mode').innerHTML = "Off line"
    })
}

module.exports = {
    checkOnline,
    setEventListeners
}

