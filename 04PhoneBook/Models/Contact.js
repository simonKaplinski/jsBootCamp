var MyApp = MyApp || {}

MyApp.Contact = (function () {
    "use strict";
    function Contact(firstName, lastName, phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
    }

    Contact.prototype.addContactToGroup = function (parentGroup) {
        //set unique id;
        this.id = MyApp.dataHelpers.idGenerator();
        //set parentId;
        this.parentId = parentGroup.id;
        parentGroup.items.push(this)
    };

    return Contact;
})();





