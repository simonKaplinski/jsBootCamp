function main() {
    var readlineSync = require('readline-sync');
//--------------------------------------------------------------------------------------/
//id;
//--------------------------------------------------------------------------------------/
    var id = 1;
    var currentGroupId = 0;
//--------------------------------------------------------------------------------------/
//arrays;
//--------------------------------------------------------------------------------------/
    var groupsArr = [];
    var contactsArr = [];
//---------------------------------------------------------------------------------------/
//person constructor;
//---------------------------------------------------------------------------------------/
    var Person = function (id, firstName, lastName, phone, groupId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.groupId = groupId;
    }
//----------------------------------------------------------------------------------------/
//group constructor;
//----------------------------------------------------------------------------------------/
    var Group = function (id, name, parentId) {
        this.id = id;
        this.name = name;
        this.parentId = parentId;
    }
//-----------------------------------------------------------------------------------------/
//phoneBookAction function;
//-----------------------------------------------------------------------------------------/
    var PhoneBookActoion = {
        idGenerator: function () {
            return id++
        },
        addPerson: function (id, firstName, lastName, phone, groupId) {
            var person = new Person(id, firstName, lastName, phone, groupId);
            contactsArr.push(person);
        },
        addGroup: function (id, name, parentId) {
            var group = new Group(id, name, parentId);
            groupsArr.push(group);
        },
        displayMenu: function () {
            var currentGroupName = this.findGroupNameById(currentGroupId); //get group name;
            //run function display data;
            this.displayData("*****" + " " + currentGroupName + " " + "*****");
            var menu = ['1. Add new person', '2. Add new group', '3. Change current group'
                , '4. Print current group', '5. Print All', '6. Find', '7. Delete item', '8. Exit'];
            //run function display menu;
            this.displayData(menu);
        },
        displayData: function (data) {
            //condition array or string;
            if (toString.call(data) === "[object Array]") {
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]); //case array;
                }
            } else {
                console.log(data); //case string;
            }
        },
        findGroupNameById: function (id) {
            if (id == 0) { //if id 0 mean currentClassId is main;
                return "You are in main phone book";
            } else {
                for (var i = 0; i < groupsArr.length; i++) {
                    if (groupsArr[i].id == id) {
                        return groupsArr[i].name;
                    }
                }
            }
        },
        throwMessage: function (message) {
            return console.log(message);
        },
        changeCurrentGroup: function (name) {
            if (name == "..") {
                for (var i = 0; i < groupsArr.length; i++) {
                    //if group id same to currentGroupId , change it to parent id;
                    if (groupsArr[i].id == currentGroupId) {
                        currentGroupId = groupsArr[i].parentId;
                    }
                }
            }
            else {
                for (var i = 0; i < groupsArr.length; i++) { //if currentGroupId same to parent id , change it to child id;
                    if (groupsArr[i].name == name && groupsArr[i].parentId == currentGroupId) {
                        currentGroupId = groupsArr[i].id;
                    } else {
                        PhoneBookActoion.throwMessage('specific user not exist');
                    }
                }
            }
        },
        printAll: function (id, space) {
            for (var i = 0; i < groupsArr.length; i++) {
                if (groupsArr[i].parentId == id) { // after print parent;
                    console.log(space  //print group;
                        + "id: " + groupsArr[i].id + " "
                        + "group name: " + groupsArr[i].name
                        + " parent Id: " + groupsArr[i].parentId);
                    this.printAll(groupsArr[i].id, space + " "); //send children to recursive function;
                }
            }
            for (var j = 0; j < contactsArr.length; j++) {
                if (contactsArr[j].groupId == id) {
                    console.log(space + "id :" + contactsArr[j].id + " "
                        + " name: " + contactsArr[j].firstName + " "
                        + " lastName: " + contactsArr[j].lastName + " "
                        + " Phone: " + contactsArr[j].phone + " "
                        + " groupId: " + contactsArr[j].groupId);
                }
            }
        },
        find: function (findMe) {
            var searchResult = [];
            for (var i = 0; i < groupsArr.length; i++) {
                if (groupsArr[i].name.search(findMe) != -1) {
                    searchResult.push("result found: group: " + groupsArr[i].name + "\n");
                }
            }
            for (var j = 0; j < contactsArr.length; j++) {
                if (contactsArr[j].firstName.search(findMe) != -1 || contactsArr[j].lastName.search(findMe) != -1) {
                    searchResult.push("result found: contact: " + contactsArr[j].firstName + " " + contactsArr[j].lastName);
                }
            }
            console.log(searchResult.join(''));
        },
        printCurrentGroup: function () {
            for (var i = 0; i < groupsArr.length; i++) {
                if (groupsArr[i].parentId == currentGroupId) {
                    console.log(groupsArr[i].name);
                }
            }
            for (var j = 0; j < contactsArr.length; j++) {
                if (contactsArr[j].groupId == currentGroupId) {
                    console.log(contactsArr[j].firstName + " " + contactsArr[j].lastName + " " + contactsArr[j].phone);
                }
            }
        },
        deleteItem: function (id) {
            for (var i = 0; i < contactsArr.length; i++) {// fun on contactsArr loop;
                if (contactsArr[i].id == id) { // find contactsArr of group;
                    contactsArr.splice(contactsArr.indexOf(contactsArr[i]), 1, 'X');// todo -  return boolean array after filter "X"
                }
            }
            for (var j = 0; j < groupsArr.length; j++) {
                if (groupsArr[j].id == id) { // find child and delete them;
                    groupsArr.splice(groupsArr.indexOf(groupsArr[j]), 1, 'X');//delete groupsArr; todo -  return boolean array after filter "
                }
            }
            for (var x = 0; x < groupsArr.length; x++) { // Runs on all groupsArr
                if (groupsArr[x].parentId == id) { // find parent;
                    this.deleteItem(groupsArr[x].id); // Pass child group to recursive function;
                }
            }
        }
    }
//---------------------------------------------------------------------------------------------------------------//
//validator object;
//---------------------------------------------------------------------------------------------------------------//
    var Validator = {}
    Validator.prototype = {};
    Validator.prototype.checkIfInputEmpty = function (input) {
        return input.length > 0
    }
    Validator.prototype.checkIfGrupAlreadyExist = function (array, groupName) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].name == groupName) {
                return true
            }
        }
        return false;
    }
//---------------------------------------------------------------------------------------------------------------//
//app action controller;
//---------------------------------------------------------------------------------------------------------------//
    function doAction() {
        var command = 0;
        while (command != 8) {
            PhoneBookActoion.displayMenu(); //display menu;
            var command = readlineSync.question('click number for you action'); //get command for action;
            switch (command) {
                case "1" :
                    var phonesArr = []; //array to store multiply phone
                    var firstName = readlineSync.question('May I have your first name? :'); //input firstName;
                    var lastName = readlineSync.question('May I have your last name? :'); //input lastName;
                    var phone = readlineSync.question('May I have your phone? :'); //input phone;
                    phonesArr.push(phone);
                    //check add another phone;
                    while (readlineSync.question('add another phone : yes/no :') != "no") {
                        var anotherPhone = readlineSync.question('write another phone :'); //input phone;
                        phonesArr.push(anotherPhone);
                    }
                    //validate inputs are not empty;
                    if (Validator.prototype.checkIfInputEmpty(firstName)
                        && Validator.prototype.checkIfInputEmpty(lastName)
                        && Validator.prototype.checkIfInputEmpty(phone)) {
                        PhoneBookActoion.addPerson(PhoneBookActoion.idGenerator(), firstName, lastName, phonesArr, currentGroupId);
                        PhoneBookActoion.throwMessage('User added to the phoneBook successfully')
                    }
                    else {
                        PhoneBookActoion.throwMessage('please fill all inputs ,' + 'press command 1 and try again')
                    }
                    break;
                case "2" :
                    var groupName = readlineSync.question('Add new group:');
                    if (!Validator.prototype.checkIfInputEmpty(groupName)) {
                        PhoneBookActoion.throwMessage('Please enter group name');
                    }
                    else if (!!Validator.prototype.checkIfGrupAlreadyExist(groupsArr, groupName)) {
                        PhoneBookActoion.throwMessage('Group already exist');
                    }
                    else {
                        PhoneBookActoion.addGroup(PhoneBookActoion.idGenerator(), groupName, currentGroupId);
                        PhoneBookActoion.throwMessage('group added');
                    }
                    break;
                case "3":
                    var changedGroup = readlineSync.question('Change group to:');
                    PhoneBookActoion.changeCurrentGroup(changedGroup);
                    break;
                case "4":
                    var printCurrentGroup = readlineSync.question('Print current group:');
                    PhoneBookActoion.printCurrentGroup(printCurrentGroup);
                    break;
                case "5":
                    readlineSync.question('Enter print all:');
                    PhoneBookActoion.printAll(0, ' ');
                    break;
                case "6":
                    var find = readlineSync.question('What would you like to search for ???');
                    PhoneBookActoion.find(find);
                    break;
                case "7":
                    var deleteItem = readlineSync.question('Insert id');
                    if (readlineSync.question('Delete : yes/no ') == 'yes') {
                        PhoneBookActoion.deleteItem(deleteItem);
                        PhoneBookActoion.throwMessage('user deleted');
                    }
                    else {
                        PhoneBookActoion.throwMessage('canceled');
                    }
                    break;
                case "8":
                    process.exit();
            }
        }
    }

    doAction();

}
main();
//---------------------------------------------------------------------------------------------------------------//













