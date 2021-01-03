import * as task from './task'
import * as pouchDb from './pouchDb'
import * as main from './main'
const send = document.getElementById('send-div');

task.setEventListeners();
main.serviceWorkerRegister();
// main.initFirebase();
pouchDb.initDb();

task.setEventListeners();
task.checkOnline({
    success: () => {
        console.log("[bundle | task.checkOnline]: checkonline success")
    },
    failure: () => {
        console.log("[bundle | task.checkOnline]: checkonline failure")
    }
});

send.addEventListener('click', main.sendFormData)
