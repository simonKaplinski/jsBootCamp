//---------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------//
//change content view manager;
//add event for change to show contacts mode;
var showContactsButton = document.getElementById('showContactsButton');
showContactsButton.addEventListener('click', htmlRendering.htmlContentViewShowContactsView);
//add event for change to create contacts mode;
var createContactButton = document.getElementById('createContactsButton');
createContactButton.addEventListener('click', htmlRendering.htmlChangeViewCreateContactMode);
//add event for change to create group mode;
var createGroupButton = document.getElementById('createGroupButton');
createGroupButton.addEventListener('click', htmlRendering.htmlChangeViewCreateGroupMode);
//---------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------//
//create contacts;
var addContactButton = document.getElementById('addContactButton');
//set event for add contact;
addContactButton.addEventListener('click', function () {
    //get contact data from inputs;
    var contentFirstName = document.getElementById('contentFirstName').value; //firstName;
    var contentLastName = document.getElementById('contentLasttName').value; //lastName;
    var contentPhone = document.getElementById('contentPhone').value; //phoneNumber;
    //run validator to check all inputs  not empty;
    if (Validator.checkIfInputEmpty(contentFirstName)
        && Validator.checkIfInputEmpty(contentLastName)
        && Validator.checkIfInputEmpty(contentPhone)) {
        //create new contact;
        PhoneBookManager.createContact(contentFirstName, contentLastName, contentPhone);
        //save changes to local storage;
        Storage.setObject('root', root);
        Storage.setObject('id', nextId);
        //parse new local storage;
        root = Storage.getObject('root');
        //run function change view to contact panel and update new data;
        htmlRendering.htmlContentViewShowContactsView();
        htmlRendering.htmlContactsRenderingShowOnTableByGroup(currentGroup);
    }
    else { // run function alert message;
        swal("please be sure you fill all inputs :)")
    }
});
//---------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------//
//create group;
var addGroupButton = document.getElementById('addGroupButton');
//set event for add group;
addGroupButton.addEventListener('click', function () {
    //get group name from input;
    var newGroupNameGetByUser = document.getElementById('contentCreateGroup').value; //groupName;
    //validate user gave name for new group;
    if (Validator.checkIfInputEmpty(newGroupNameGetByUser)) {
        //create group;
        PhoneBookManager.createGroup(newGroupNameGetByUser, 'Group');
        //update storage updated data;
        Storage.setObject('root', root);
        Storage.setObject('id', nextId);
        root = Storage.getObject('root');
        //run function to print tree with update data;
        htmlRendering.htmlPrintTreeFromStartOfTheRootOnChange(root);
        //after adding group , update current group to new group,
        var updatedGroup = PhoneBookManager.getGroup(root, newGroupNameGetByUser);
        currentGroup = updatedGroup;
        htmlRendering.htmlGroupNameRendering(currentGroup.name);
        //clean input after submit;
        document.getElementById('contentCreateGroup').value = " ";
    } else {//run function with message;
        swal("please provide name for new group :)")
    }
});
//---------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------//
//change current group;
$(document).on('click', 'li', function () {
    //get group name on click group li;
    var currentGroupName = this.innerHTML;
    //run function find the group object in the root;
    var updatedGroup = PhoneBookManager.getGroup(root, currentGroupName);
    //update current group to new group clicked;
    currentGroup = updatedGroup;
    //print group name;
    htmlRendering.htmlGroupNameRendering(currentGroup.name);
    //change to mode show contacts mode;
    htmlRendering.htmlContentViewShowContactsView();
    //print all contacts of current group on contacts table;
    htmlRendering.htmlContactsRenderingShowOnTableByGroup(currentGroup);
    //console.log(currentGroup);
});
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//delete contact from group;
$(document).on('click', '.deleteContact', function () {
    //get object id;
    var contactId = $(this).siblings(":first").text();
    //run function to delete contact from group;
    PhoneBookManager.deleteContactFromGroup(contactId, currentGroup);
    //update storage with new data;
    Storage.setObject('root', root);
    root = Storage.getObject('root');
    //run function to render html with new data;
    htmlRendering.htmlPrintTreeFromStartOfTheRootOnChange(root);
    htmlRendering.htmlContactsRenderingShowOnTableByGroup(currentGroup);
});
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//delete group;
var deleteButton = document.getElementById('deleteButton');
//add event for deleting group from tree;
deleteButton.addEventListener('click', function () {
    //run function do delete all contacts;
    PhoneBookManager.deleteGroupFromTree(currentGroup.id, root)
    //update storage with new data;
    Storage.setObject('root', root);
    root = Storage.getObject('root');
    //after deleting group update new current group;
    var updatedGroup = PhoneBookManager.getGroup(root, 'PhoneBook');
    currentGroup = updatedGroup;
    //run function update current group name;
    htmlRendering.htmlGroupNameRendering(root.name);
    //change to mode show contacts mode;
    htmlRendering.htmlContentViewShowContactsView();
    //print all contacts of current group on contacts table;
    htmlRendering.htmlContactsRenderingShowOnTableByGroup(currentGroup);
    //run function to render html with new data;
    htmlRendering.htmlPrintTreeFromStartOfTheRootOnChange(root);

});
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//search for groups;
var groupSearchInput = document.getElementById('groupSearchInput');
//add event for searching group;
groupSearchInput.addEventListener('keyup', function () {
    //get search value from input;
    var searchText = document.getElementById('groupSearchInput').value;
    if (searchText.length > 2) {
        //run function for find result for group search;
        var result = PhoneBookManager.getGroupOnSearchResult(root, searchText);
        //run function render html for search result;
        htmlRendering.htmlSearchGroupResultRender(result);
    } else if (searchText.length == 0) {
        //if input empty set group tree to original mode;
        htmlRendering.htmlGetRootAndDelivereToPrint(root);
    }
});
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//search for contacts;
var searchContactButton = document.getElementById('search');
//add event for searching contact;
searchContactButton.addEventListener('click', function () {
    //get search text from input;
    var searchText = document.getElementById('searchInput').value;
    //clean input after submitting;
    document.getElementById('searchInput').value = "";
    //run function for search and catch the result;
    var result = PhoneBookManager.getContactOnSearchResult(root, searchText);
    console.log(result);
    //run function display result on the dom;
    htmlRendering.htmlSearchResultForContactSearch(result);
});
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//reset all phoneBook
var resetAllPhoneBook = document.getElementById('resetAllPhoneBook');
//add event for reset phoneBook;
resetAllPhoneBook.addEventListener('click', function () {
    root = null;
    Storage.setObject('root', root);
    //run function to render html with new data;
    htmlRendering.htmlPrintTreeFromStartOfTheRootOnChange(root);
    htmlRendering.htmlContactsRenderingShowOnTableByGroup(currentGroup);
});