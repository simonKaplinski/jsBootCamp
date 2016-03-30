var MyApp = MyApp || {}
MyApp.nextId = Storage.getObject('id') || 1;
$(function () {
    "use strict";
    //check if local storage has object or is empty;
    var getItemsFromStorageToTestIfItemsInside = Storage.getObject('root');
    //if no data in local storage;
    if (!getItemsFromStorageToTestIfItemsInside) {
        //create new root group;
        MyApp.root = new MyApp.Group('PhoneBook');
        MyApp.currentGroup = MyApp.root;
        //store new created group to local storage;
        Storage.setObject('root', MyApp.root);
    } else {
        //get data from local storage into root;
        MyApp.root = Storage.getObject('root');
        MyApp.currentGroup = MyApp.root;
    }
    var menu = new MyApp.Menu($('#ulContainerForAllItems'));
    menu.bind(MyApp.root);
//--------------------------------------------------------------------------------------------
//create group event;
    $('#addGroupButton').on('click', function () {
        //validate inputs;
        if (MyApp.Validate.checkIfInputEmpty($('#contentCreateGroup').val())) {
            //create new group;
            var group = new MyApp.Group($('#contentCreateGroup').val());
            // add group to parent group;
            group.addGroupToParentGroup(MyApp.currentGroup);
            //update storage;
            Storage.updateStorage();
            //clear input and show success message;
            $('#contentCreateGroup').val('');
            toastr.success('new group created!', {timeOut: 5000})
            // bind new data on menu ;
            menu.bind(MyApp.currentGroup);
        } else {
            //display info message;
            toastr.info('Please provide name for the group!', {timeOut: 5000})
        }
    });
//--------------------------------------------------------------------------------------------
//create contact event;
    $('#addContactButton').on('click', function () {
        //validate inputs;
        if (MyApp.Validate.checkIfInputEmpty($('#contentFirstName').val())
            && MyApp.Validate.checkIfInputEmpty($('#contentPhone').val())) {
            //create new contact;
            var contact = new MyApp.Contact($('#contentFirstName').val(), $('#contentLasttName').val(), $('#contentPhone').val());
            //add contact to group;
            contact.addContactToGroup(MyApp.currentGroup);
            //save storage;
            Storage.updateStorage();
            //send success message;
            toastr.success('new contact created!', {timeOut: 5000})
            //clear all inputs after submit;
            MyApp.domHelpers.clearInputs($('#contentFirstName'), $('#contentLasttName'), $('#contentPhone'))
            //display new data;
            menu.bind(MyApp.currentGroup);
        } else {
            //sent info message;
            toastr.info('please fill name and phone input !', {timeOut: 5000})
        }
    });
//--------------------------------------------------------------------------------------------
//change panel view createContact/createGroup;
    $('#createGroupButton').on('click', function () {
        MyApp.domHelpers.changeViewFromTo($('#createContact'), $('#createGroup'));
    });
    $('#createContactButton').on('click', function () {
        MyApp.domHelpers.changeViewFromTo($('#createGroup'), $('#createContact'));
    });
//--------------------------------------------------------------------------------------------
//change current group;
    $(document).on('click', 'li', function () {
        if (this.childNodes[1] != undefined) {
            //get group name;
            var currentGroupName = this.childNodes[1].innerHTML;
            //run function to get group object;
            var result = MyApp.dataHelpers.getGroup(MyApp.root, currentGroupName);
            if (result) {
                //if result is a group;
                if (result.items != undefined) {
                    // set current group result group;
                    MyApp.currentGroup = result;
                    //update view with new data;
                    menu.bind(result);
                }
            }
        }
        else {
            //get user id;
            var contactId = ($(this).attr("data-id"));
            //get back prototype function;
            MyApp.currentGroup.getContactFromThisGroupById = MyApp.Group.prototype.getContactFromThisGroupById;
            var result = MyApp.currentGroup.getContactFromThisGroupById(contactId);
            if (result) {
                menu.updateDOMWithContactInfo(result);
            }
            if (!result) {
                //run function get group by id;
                result = MyApp.dataHelpers.getContactById(MyApp.root, contactId);
                menu.updateDOMWithContactInfo(result);
            }
        }
    });
//--------------------------------------------------------------------------------------------
//go up;
    $('#upButtonContainer span').on('click', function () {
        //parent group is root group;
        if (MyApp.currentGroup.parentId == undefined) {
            MyApp.currentGroup = MyApp.root;
            menu.bind(MyApp.root);
        } else {
            //get parent group;
            var result = MyApp.dataHelpers.getGroupById(MyApp.root, MyApp.currentGroup.parentId);
            //set current group to parent group;
            MyApp.currentGroup = result;
            //update view;
            menu.bind(result);
        }
    });
//--------------------------------------------------------------------------------------------
// go back from contact to group;
    $(document).on('click', '.iconBackContainer span', function () {
        //get parent id;
        var parentId = ($(this).parent().attr("data-id"));
        //case parent is root group;
        if (parentId == 'undefined') {
            menu.bind(MyApp.root);
        }
        if (parentId != 'undefined') {
            //get group by id;
            var result = MyApp.dataHelpers.getGroupById(MyApp.root, parentId);
            //set current group to result;
            MyApp.currentGroup = result;
            //update view;
            menu.bind(result);
        }
    });
//--------------------------------------------------------------------------------------------
//search;
    $('#searchInput').on('keyup', function () {
        //get input value;
        var searchText = $('#searchInput').val();
        if (searchText.length > 1) {
            //get back the lost prototype;
            MyApp.root.getItemsResult = MyApp.Group.prototype.getItemsResult;
            //run search from root group;
            var result = MyApp.root.getItemsResult(searchText);
            menu.bind(result);
        }
        if (searchText == 0) {
            menu.bind(MyApp.root);
        }
    });
    $('#searchInput').on('blur', function () {
        $('#searchInput').val(' ');
    });

//--------------------------------------------------------------------------------------------
//delete
    $(document).on('click', '.deleteSpanContainer', function (e) {
        e.stopPropagation();
        //get child id;
        var chileId = ($(this).parent().attr("data-Id"));
        //get parent id;
        var parentId = ($(this).parent().attr("data-parentId"));
        //confirm dialogBox;
        bootbox.confirm("Are you sure?", function (result) {
            if (result) {
                //run function delete item;
                deleteElementAfterConfirm(chileId, parentId);
            }
        });
    });
//function delete item after user confirmed;
    function deleteElementAfterConfirm(chileId, parentId) {
        if (parentId != 'undefined') {
            // find parent group;
            var group = MyApp.dataHelpers.getGroupById(MyApp.root, parentId);
            //get back the prototype functions;
            group.deleteChildByid = MyApp.Group.prototype.deleteChildByid;
            //delete child from group;
            group.deleteChildByid(chileId);
            // update storage;
            Storage.updateStorage();
            //update menu display
            menu.bind(group);
        } else {
            //else parentID is root group;
            var group = MyApp.root;
            group.deleteChildByid = MyApp.Group.prototype.deleteChildByid;
            group.deleteChildByid(chileId);
            // update storage;
            Storage.updateStorage();
            //update menu displa
            menu.bind(group);
        }
    }
});
