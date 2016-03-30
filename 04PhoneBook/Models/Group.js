var MyApp = MyApp || {}

MyApp.Group = (function () {
    "use strict";
    function Group(name) {
        this.name = name;
        this.items = [];
    };

    Group.prototype.addGroupToParentGroup = function (parentGroup) {
        //set unique id;
        this.id = MyApp.dataHelpers.idGenerator();
        //set parentId;
        this.parentId = parentGroup.id;
        parentGroup.items.push(this)
    };

    //function return contact from this group;
    Group.prototype.getContactFromThisGroupById = function (id) {
        var self = this;
        for (var i = 0; i < self.items.length; i++) {
            if (self.items[i].id == id) {
                return self.items[i];
            }
        }
    };

    //recursive search function;
    Group.prototype.getItemsResult = function (textSearch, group) {
        var self = this;
        var result = [];
        for (var i = 0; i < self.items.length; i++) {
            if (self.items[i].name) {
                if (self.items[i].name.indexOf(textSearch) >= 0) {
                    result.push(self.items[i]);
                }
                self.items[i].getItemsResult = MyApp.Group.prototype.getItemsResult;
                result = result.concat(self.items[i].getItemsResult(textSearch));

            } else {
                if (result != null) {
                    if (self.items[i].firstName) {
                        if (self.items[i].firstName.indexOf(textSearch) >= 0
                            || self.items[i].lastName.indexOf(textSearch) >= 0
                            || self.items[i].phone.indexOf(textSearch) >= 0) {
                            result.push(self.items[i]);
                        }
                    }
                }
            }
        }
        return result;
    };

    //function delete child item from this group;
    Group.prototype.deleteChildByid = function (id) {
        var self = this;
        for (var i = 0; i < self.items.length; i++) {
            if (self.items[i].id == id) {
                self.items.splice(self.items.indexOf(self.items[i]), 1);
            }
        }
    };

    return Group;
})();
