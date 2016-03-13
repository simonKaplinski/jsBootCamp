$(function () {
    //localStorage.clear();
    initialize();
});

function initialize() {
    //check if local storage has object or is empty;
    var getItemsFromStorageToTestIfItemsInside = Storage.getObject('root');
    //if no data in local storage;
    if (!getItemsFromStorageToTestIfItemsInside) {
        //create new root group;
        root = new Group(0, 'PhoneBook', 'Group');
        currentGroup = root;
        //print current group name on DOM element;
        htmlRendering.htmlGroupNameRendering(currentGroup.name);
        //store new created group to local storage;
        Storage.setObject('root', root);
    } else {
        //get data from local storage into root;
        root = Storage.getObject('root');
        currentGroup = root;
        //run function to print to DOM all data;
        htmlRendering.htmlGetRootAndDelivereToPrint(root);
    }
}
