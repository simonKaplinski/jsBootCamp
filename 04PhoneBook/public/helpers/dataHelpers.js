var MyApp = MyApp || {}

MyApp.dataHelpers = (function () {

    return {
        idGenerator: idGenerator,
        getGroup: getGroup,
        getGroupById: getGroupById,
        getContactById: getContactById,
    }

    //function return new id;
    function idGenerator() {
        return MyApp.nextId++
    };

    //recursive function get group by name;
    function getGroup(root, currentGroup) {
        if (root.name == currentGroup) {
            return root;
        }
        else {
            for (var i = 0; i < root.items.length; i++) {
                if (root.items[i].name) {
                    var result = this.getGroup(root.items[i], currentGroup);
                    if (result != null) {
                        return result;
                    }
                }
            }
        }
    };

    //recursive function get group by id;
    function getGroupById(root, id) {
        if (root.id == id) {
            return root;
        }
        else {
            //run children;
            for (var i = 0; i < root.items.length; i++) {
                //case children are group;
                if (root.items[i].name) {
                    var result = this.getGroupById(root.items[i], id);
                    if (result != null) {
                        return result;
                    }
                }
            }
        }
    };

    //recursive function get contact by id;
    function getContactById(group, id) {
        var result;
        if (group.id == id) {
            return group;
        }
        else {
            //run children;
            for (var i = 0; i < group.items.length; i++) {
                //case children are group;
                if (group.items[i].name) {
                    //return recursive the result back;
                    return getContactById(group.items[i], id);
                } else {
                    if (group.items[i].id == id) {
                        result = group.items[i];
                        return result;
                    }
                }
            }
        }
    }

})();












