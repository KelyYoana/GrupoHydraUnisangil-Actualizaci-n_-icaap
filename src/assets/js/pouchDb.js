var db = new PouchDB('muestreo');
var remoteCouch = false;

function initDb() {
    console.log('[pouchDb.js | initDb]')
    console.log('[pouchDb.js | initDb] db:  ', db);
}

function addDataPouchDB(_data) {
    console.log('_data', _data);
    let dataToPut = {
        _id: new Date().toISOString(),
        data: _data
    };

    db.put(dataToPut).then(function (response) {
        console.log(response);
        alert("Data no se pudo guardar de manera local." + error);
    }).catch(function (err) {
        alert("Data guardada exitosamente de manera local.");
        console.log(err)
    })
}

function getAllPouchDBDocs(callbacks) {
    db.allDocs({
        include_docs: true,
        descending: false
    }, function (err, response) {
        if (err) callbacks.failure("PouchDB err: " + err);

        callbacks.success(response)

    })
}

function deletePouchDBDoc(doc) {
    db.remove(doc.id, doc.value.rev, function (err) {
        if (err) console.log("PouchDB err while delete doc: " + err);
    })
}

module.exports = {
    initDb,
    addDataPouchDB,
    getAllPouchDBDocs,
    deletePouchDBDoc
}
