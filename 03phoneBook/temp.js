var rl = require('readline-sync');
var fs = require('fs');
//---------------------------------------------------------------------------------------------//
var root = createGroup("~");
var currentGroup = root;
var nextId = 0;
//menu;
var Menu = {
    ADD_NEW_CONTACT: 1,
    ADD_NEW_GROUP: 2,
    CHANGE_CURRENT_GROUP: 3,
    PRINT: 4,
    PRINT_ALL: 5,
    FIND: 6,
    DELETE: 7,
    EXIT: 8
};
//printMenu;
function printMenu() { //no need;
    console.log('**********' + ' ' + currentGroup.name + ' ' + '**********');
    console.log();
    console.log("1) Add new contact");
    console.log("2) Add new group");
    console.log("3) Change current group");
    console.log("4) Print");
    console.log("5) Print All");
    console.log("6) Find");
    console.log("7) Delete");
    console.log("8) Exit AND SAVE THE FILES");
}
//fun;
function run() { //no need;
    while (true) {
        printMenu();
        var command = rl.question("Contact Book> ");
        handleCommand(command);
    }
}
//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//
function handleCommand(line) {
    var command = parseInt(line);

    if (command == Menu.ADD_NEW_CONTACT) {
        addNewContact();
    }
    else if (command == Menu.ADD_NEW_GROUP) {
        addNewGroup();
    }
    else if (command == Menu.CHANGE_CURRENT_GROUP) {
        changeCurrentGroup();
    }
    else if (command == Menu.PRINT) {
        print();
    }
    else if (command == Menu.PRINT_ALL) {
        printAll(root);
    }
    else if (command == Menu.FIND) {
        find();
    }
    else if (command == Menu.DELETE) {
        deleteItem();
    }
    else if (command == Menu.EXIT) {
        exit();
    }
}
//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//
function addNewContact() {
    var firstName = readNonEmptyString("First Name: ");
    var lastName = readNonEmptyString("Last Name: ");
    var phoneNumbers = [];
    while (true) {
        var phoneNumber = rl.question("Phone Number (press enter when done): ");
        if (!phoneNumber) {
            break;
        }
        phoneNumbers.push(phoneNumber);
    }
    var contact = createContact(firstName, lastName, phoneNumbers) // create contact;
    addItem(contact);
}

function addNewGroup() {
    var name = readNonEmptyString("Name: ");
    var group = createGroup(name);
    addItem(group);

}

function createContact(firstName, lastName, phoneNumbers) {
    var contact = {
        id: generateNextId(),
        firstName: firstName,
        lastName: lastName,
        phoneNumbers: phoneNumbers,
        parent: currentGroup,
    };

    return contact;
}

function createGroup(name) {
    var group = {
        id: generateNextId(),
        name: name,
        items: [],
        type: "Group",
        parent: currentGroup,
    };
    return group;
}
function addItem(item) {
    if (currentGroup.item) {
        throw Error("Item with id " + item.id + " was already added to group: " + currentGroup.item.id);
    }
    currentGroup.items.push(item);
}
//---------------------------------------------------------------------------------------------//
//change group actions;
function changeCurrentGroup() {
    var name = readNonEmptyString("Name: ");
    if (name == "..") {
        if (currentGroup.parent == undefined) {
            console.log("you already in main directory");
            return;
        }
        currentGroup = currentGroup.parent;
    } else {
        currentGroup.items.forEach(function (item) {
            if (item.name == name) {
                currentGroup = item;
            }
        });
    }
}
//---------------------------------------------------------------------------------------------//
//printers current group;
function print() {
    currentGroup.items.forEach(function (childItem) {
        if (childItem.name) {
            console.log(childItem.name);
        }
        else if (childItem.firstName) {
            console.log(childItem.firstName + " " + childItem.lastName + " " + childItem.phoneNumbers);
        }
    });
}
//---------------------------------------------------------------------------------------------//
//print all data in your file;
function printAll() {
    var phoneBookArreyFromFile = fs.readFileSync('myFile.txt', 'utf8');
    if (phoneBookArreyFromFile) {
        readFile();
    } else {
        console.log('you don\'t have data in you\'r file');
    }
}
function deleteItem() {
}
//---------------------------------------------------------------------------------------------//
//exit;
function exit() {
    writeToFile();
    process.exit(0);
}
//---------------------------------------------------------------------------------------------//
//working with files...
//---------------------------------------------------------------------------------------------//
function changeItemToWantedFormForFile(item, PhoneBookItemsArray) { //get item and array;
    var PhoneBookItems = PhoneBookItemsArray || [];
    if (!item) {
        item = root;
    }
    if (item) {
        var writeFileItemInJsonStyle;
        if (item.firstName) { // condition contact;
            writeFileItemInJsonStyle = {
                "firstName": item.firstName,
                "lastName": item.lastName,
                "phoneNumbers": item.phoneNumbers,
                "items": 0
            };
            PhoneBookItems.push(writeFileItemInJsonStyle);
        }
        else if (item.name) { //condition group;
            writeFileItemInJsonStyle = {
                "name": item.name,
                "items": item.items.length
            };
            PhoneBookItems.push(writeFileItemInJsonStyle); // push the item into the array ;
            item.items.forEach(function (itemChildren) { // and immediately run it on every child ;
                changeItemToWantedFormForFile(itemChildren, PhoneBookItems);
            })
        }
        return PhoneBookItems;
    }
}
//write to file;
//---------------------------------------------------------------------------------------------//
function writeToFile() {
    var phoneBookArrey = changeItemToWantedFormForFile();
    var phoneBookArreyJsonStyle = JSON.stringify(phoneBookArrey);
    fs.writeFileSync('myFile.txt', phoneBookArreyJsonStyle, 'utf8');
}

function readFile() {
    var phoneBookArreyFromFile = fs.readFileSync('myFile.txt', 'utf8'); //read file;
    var phoneBookAfterJsonParse = JSON.parse(phoneBookArreyFromFile); //parse Json;
    phoneBookAfterJsonParse.forEach(function (item, index, array) {
        readArrayDataFromFileAndMakeDataStructure(item, index, array)
    });
}
//read from file;
//---------------------------------------------------------------------------------------------//
function readArrayDataFromFileAndMakeDataStructure(item, index, array) {
    //condition contact , add item to current group;
    if (item.firstName) {
        var contact = createContact(item.firstName, item.lastName, item.phoneNumbers);
        addItem(contact);
    }//condition item equal to group;
    else if (item.name) {
        var group = createGroup(item.name);
        addItem(group);
        // condition item has items in array;
        if (item.items.length > 0) {
            currentGroup = group;
            for (var i = ++index; i < index + item.items.length; i++) { // send next index represent child of parent array items;
                readArrayDataFromFileAndMakeDataStructure(array[i], i, array);
            }
            array.splice(index, item.items.length); //splice from index parent items indexes;
            currentGroup = group.parent;
        }
    }
    console.log(item);
}
//---------------------------------------------------------------------------------------------//
function generateNextId() {
    return nextId++;
}
function readNonEmptyString(message) {
    while (true) {
        var line = rl.question(message).trim();
        if (line) {
            return line;
        }
    }
}
run();


