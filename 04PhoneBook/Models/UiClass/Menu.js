var MyApp = MyApp || {}

MyApp.Menu = (function () {

    function Menu(element) {
        //MyApp.View.call(this, element);
        this.element = element;
        this.items = null;
    }

    //inheritance View class;
    Menu.prototype = Object.create(MyApp.View.prototype);

    Menu.prototype.bind = function (items) {
        //set contacts
        this.items = items;
        this.updateDOM();
    }

    //function run to update the dom with right data;
    Menu.prototype.updateDOM = function () {
        var self = this;
        self.element.empty();
        self.items;
        if (!self.items) {
            console.log(self);
        }
        //update view one object only;
        if (self.items.length == 1) {
            if (self.items[0].firstName) {
                self.element.append(
                    '<li class="hvr-float-shadow" data-parentId = "' + self.parentId + '" data-id="' + self.id + '">'
                    + '<div class="uiContectContainer"  data-parentId = "' + self.parentId + '" data-id="' + self.id + '">'
                    + '<i class="fa fa-user"></i>'
                    + '<p>'
                    + self.firstName
                    + '</p>'
                    + " "
                    + '<p>'
                    + self.lastName
                    + '</p>'
                    + " "
                    + '<p>'
                    + self.phone
                    + '</p>'
                    + '<span class="glyphicon glyphicon-remove-circle deleteSpanContainer"></span>'
                    + '</div>'
                    + '</li>');
            }
        }
        //update view with main root witch has items inside items array;
        //case 1 : special case root group have only one item and it is contact;
        if (self.items.items) {
            if (self.items.items.length == 1 && self.items.items[0].firstName) {
                self.element.append(
                    '<li class="hvr-float-shadow" data-parentId = "' + self.parentId + '" data-id="' + self.id + '">'
                    + '<div class="uiContectContainer"  data-parentId = "' + self.parentId + '" data-id="' + self.id + '">'
                    + '<i class="fa fa-user"></i>'
                    + '<p>'
                    + self.items.items.firstName
                    + '</p>'
                    + " "
                    + '<p>'
                    + self.items.items.lastName
                    + '</p>'
                    + " "
                    + '<p>'
                    + self.items.items.phone
                    + '</p>'
                    + '<span class="glyphicon glyphicon-remove-circle deleteSpanContainer"></span>'
                    + '</div>'
                    + '</li>');
            }
            //case 2: item is a group;
            self.items.items.forEach(function (item) {
                if (item.name) {
                    self.element.append(
                        '<div class="iconContainer">'
                        + '</div>'
                        + '<li class="hvr-float-shadow"  data-parentId = "' + item.parentId + '" data-id="' + item.id + '">'
                        + '<p class="groupIconContainer">'
                        + '<i class="fa fa-users"></i>'
                        + '</p>'
                        + '<div class="uiGroupContainer">'
                        + item.name
                        + '</div>'
                        + '<div class="deleteSpanContainer" data-id="' + item.id + '">' + '<span class="glyphicon glyphicon-remove-circle iconDeleteContainer"></span>'
                        + '</div>'
                        + '</li>'
                    );
                }
            });
            //case 3: item is a contact;
            self.items.items.forEach(function (item) {
                if (item.firstName) {
                    self.element.append(
                        '<li class="hvr-float-shadow" data-id="' + item.id + '">'
                        + '<div class="uiContectContainer"  data-parentId = "' + item.parentId + '" data-id="' + item.id + '">'
                        + '<i class="fa fa-user"></i>'
                        + '<p>'
                        + item.firstName
                        + '</p>'
                        + " "
                        + '<p>'
                        + item.lastName
                        + '</p>'
                        + " "
                        + '<p>'
                        + item.phone
                        + '</p>'
                        + '<span class="glyphicon glyphicon-remove-circle deleteSpanContainer"></span>'
                        + '</div>'
                        + '</li>');
                }
            });
            //update view with items witch has items inside;
            //case item is group;
        } else if (self.items) {
            self.items.forEach(function (item) {
                if (item.name) {
                    self.element.append(
                        '<div class="iconContainer">'
                        + '</div>'
                        + '<li class="hvr-float-shadow"   data-parentId = "' + item.parentId + '" data-id="' + item.id + '">'
                        + '<p class="groupIconContainer">'
                        + '<i class="fa fa-users"></i>'
                        + '</p>'
                        + '<div class="uiGroupContainer">'
                        + item.name
                        + '</div>'
                        + '<div class="deleteSpanContainer" data-id="' + item.id + '">' + '<span class="glyphicon glyphicon-remove-circle iconDeleteContainer"></span>'
                        + '</div>'
                        + '</li>');
                }
            });
            //case item is contact;
            self.items.forEach(function (item) {
                if (item.firstName) {
                    self.element.append(
                        '<li class="hvr-float-shadow" data-id="' + item.id + '">'
                        + '<div class="uiContectContainer" data-parentId = "' + item.parentId + '" data-id="' + item.id + '">'
                        + '<i class="fa fa-user"></i>'
                        + '<p>'
                        + item.firstName
                        + '</p>'
                        + " "
                        + '<p>'
                        + item.lastName
                        + '</p>'
                        + " "
                        + '<p>'
                        + item.phone
                        + '</p>'
                        + '<span class="glyphicon glyphicon-remove-circle deleteSpanContainer"></span>'
                        + '</li>');
                }
            });
        }
    }
    //function update view with contact information;
    Menu.prototype.updateDOMWithContactInfo = function (result) {
        var self = this;
        self.element.empty();
        self.element.append(
            '<div id="uiOneContactContainer">'
            + '<img src="./includes/images/profile2.png">'
            + '<div class="iconBackContainer" data-id="' + result.parentId + '">' + '<span class="hvr-icon-back"></span>' + '</div><br/><br/>'
            + '<div class="uiOneContactContainerOnePart">' + '<h5>' + 'FirstName :' + '</h5>' + " " + result.firstName + '</div>'
            + '<div class="uiOneContactContainerOnePart">' + '<h5>' + 'LastName :' + '</h5>' + " " + result.lastName + '</div>'
            + '<div class="uiOneContactContainerOnePart">' + '<h5>' + 'Phone :' + '</h5>' + " " + result.phone + '</div>'
            + '</div>'
        );
    }

    return Menu;
    
})();











