var PhoneBookManager = (function () {
    nextId = Storage.getObject('id') || 1;
    var idGenerator = function () {
        return nextId++
    };

    return {
        //create contact;
        createContact: function (firstName, lastName, phone) {
            var person = new Person(idGenerator(), firstName, lastName, phone);
            //add contact to current group items array;
            this.addItem(person);
            return person;
        },
        //create group;
        createGroup: function (name, type) {
            var group = new Group(idGenerator(), name, type);
            //add group to current group items array;
            this.addItem(group);
            return group;
        },

        addItem: function (item) {
            currentGroup.items.push(item);
        },
        //find group in tree;
        getGroup: function (root, currentGroupName) {
            if (root.name == currentGroupName) {
                return root;
            }
            else {
                for (var i = 0; i < root.items.length; i++) { //run children;
                    if (root.items[i].name) {  //if children are groups;
                        var result = this.getGroup(root.items[i], currentGroupName);
                        if (result != null) {
                            return result;
                        }
                    }
                }
            }
        },
        //delete contact from group array;
        deleteContactFromGroup: function (id, currentGroup) {
            //run on current group array;
            for (var i = 0; i < currentGroup.items.length; i++) {
                if (currentGroup.items[i].firstName) {
                    if (currentGroup.items[i].id == id) { //delete user;
                        currentGroup.items.splice(currentGroup.items.indexOf(currentGroup.items[i]), 1);
                    }
                }
            }
        },
        //delete group;
        deleteGroupFromTree: function (id, groups) {
            if (groups != null) {
                for (var i = 0; i < groups.items.length; i++) {
                    if (groups.items[i].name) { //if item is group;
                        this.deleteGroupFromTree(id, groups.items[i]);
                    }//delete group;
                    if (groups.items[i].id == id) {
                        groups.items.splice(groups.items.indexOf(groups.items[i]), 1);
                    }
                }
            }
        },
        //get group on search on keyup event;
        getGroupOnSearchResult: function (group, searchGroup) {
            var result = [];
            for (var i = 0; i < group.items.length; i++) {
                if (group.items[i].name) {
                    result = result.concat(this.getGroupOnSearchResult(group.items[i], searchGroup));
                    if (result != null) {
                        if (group.items[i].name.indexOf(searchGroup) >= 0) { //find string inside string;
                            result.push(group.items[i]);
                        }
                    }
                }
            }
            return result;
        },
        //find contact array and return them;
        getContactOnSearchResult: function (group, searchText) {
            var result = [];
            for (var i = 0; i < group.items.length; i++) {
                if (group.items[i].name) {
                    result = result.concat(this.getContactOnSearchResult(group.items[i], searchText));
                }
                else {
                    if (group.items[i].firstName == searchText
                        || group.items[i].lastName == searchText
                        || group.items[i].phone == searchText) {
                        result.push(group.items[i]);
                    }
                }
            }
            return result;
        }
    }
})();


