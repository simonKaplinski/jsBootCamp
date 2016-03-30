var Storage = {
    setObject: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getObject: function (key) {
        return JSON.parse(localStorage.getItem(key));
    },
    //function update data and id to local storage;
    updateStorage: function () {
        Storage.setObject('root', MyApp.root);
        Storage.setObject('id', MyApp.nextId);
    },
}



