var Storage = {
    setObject: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    getObject: function (key) {
        return JSON.parse(localStorage.getItem(key));
    },
    getItemsFromStorageMethod: function () {
        var getItemsFromStorage = localStorage.getItem('root');
        getItemsFromStorage = JSON.parse(getItemsFromStorage);
        return getItemsFromStorage;
    },

    findRightGroupInLocalStorageAndPushNewData: function (oldItemsInLocalStorage, currentGroup, data) {
        //push into items array main group;
        if (oldItemsInLocalStorage.name == currentGroup.name) {
            oldItemsInLocalStorage['items'].push(data);
        }
        //if no loop items in item array;
        else {
            for (var i = 0; i < oldItemsInLocalStorage.items.length; i++) { //loop local storage items;
                if (oldItemsInLocalStorage.items.name) {
                    var result = this.findRightGroupInLocalStorageAndPushNewData(oldItemsInLocalStorage.items[i], currentGroup, data);
                    if (result != null) {
                        return result;
                    }
                }
                if (oldItemsInLocalStorage.items[i].name == currentGroup.name) { //if items  == currentGroup;
                    oldItemsInLocalStorage.items[i]['items'].push(data); // push data inside currentGroup in localStorage;
                }
            }
        }
    }
}




