/**
 * Created by simon on 3/10/16.
 */
//Storage.saveDataToLocalStorageMethod(group);
//--------------------------------------------------------------------------------------------------//
//Storage.saveDataToLocalStorageMethod(contact);
//--------------------------------------------------------------------------------------------------//
/*   saveDataToLocalStorageMethod: function (data) {
 // Parse the serialized data back into an array of objects;
 var oldItemsInLocalStorage = JSON.parse(localStorage.getItem('root'));
 //find current group and push new data there;
 this.findRightGroupInLocalStorageAndPushNewData(oldItemsInLocalStorage, currentGroup, data)
 // Re-serialize the array back into a string and store it in localStorage;
 localStorage.setItem('root', JSON.stringify(root));
 //****
 //****
 }*/
//--------------------------------------------------------------------------------------------------//
//var getItemsFromStorage = Storage.getItemsFromStorageMethod();
//--------------------------------------------------------------------------------------------------//
//displayDirectory(group.items[i]);
//--------------------------------------------------------------------------------------------------//
//showGroupContacts(currentGroup);
//--------------------------------------------------------------------------------------------------//
/*function showGroupContacts(currentGroup) {
 $('.showContentsTable').empty();
 for (var i = 0; i < currentGroup.items.length; i++) {
 if (currentGroup.items[i].firstName) {
 $('.showContentsTable').append('<tr>'
 + '<td>' + currentGroup.items[i].firstName + '</td>'
 + '<td>' + currentGroup.items[i].lastName + '</td>'
 + '<td>' + currentGroup.items[i].phone + '</td>'
 + '</tr>');
 }
 }
 }*/
//---------------------------------------------------------------------------------------------------//
//get group;
/*function getGroup(root, currentGroupName) {
 if (root.name == currentGroupName) {
 return root;
 }
 else {
 for (var i = 0; i < root.items.length; i++) { //run children;
 if (root.items[i].name) {  //if children are groups;
 var result = getGroup(root.items[i], currentGroupName);
 if (result != null) {
 return result;
 }
 }
 }
 }
 }*///search for user somthing like that but for user;
//---------------------------------------------------------------------------------------------------//
//printTreeFromStartOfTheRootOnChange(root);
//---------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------//
//print group on change;
/*function printTreeFromStartOfTheRootOnChange(root) {
 $('#directory').empty();
 htmlRendering.htmlGetRootAndDelivereToPrint(root);
 //getRootAndDelivereToPrint(root)
 }*/
//------------------------------------------------------------------------------------------------------//
/*function getRootAndDelivereToPrint(group) {
 //target dom element where print all data tree structure;
 var directory = document.getElementById('directory');
 //for every item in items array find group;
 for (var i = 0; i < group.items.length; i++) {
 if (group.items[i].name) {
 //run function to print all groups;
 htmlRendering.htmlMenuRendering(directory, group.items[i]);
 }
 }
 }
 */
//------------------------------------------------------------------------------------------------------//
/*function deleteContactFromGroup(id, currentGroup) {
 for (var i = 0; i < currentGroup.items.length; i++) {
 if (currentGroup.items[i].firstName) {
 if (currentGroup.items[i].id == id) {
 currentGroup.items.splice(currentGroup.items.indexOf(currentGroup.items[i]), 1);
 }
 }
 }
 }*/
//------------------------------------------------------------------------------------------------------//
/*function deleteGroupFromTree(id, groups) {
 if (groups != null) {
 for (var i = 0; i < groups.items.length; i++) {
 if (groups.items[i].name) {
 this.deleteGroupFromTree(id,groups.items[i]);
 }
 if (groups.items[i].id == id) {
 groups.items.splice(groups.items.indexOf(groups.items[i]), 1);
 }
 }
 }
 }*/
//------------------------------------------------------------------------------------------------------//
/*function htmlSearchGroupResultRender(result) {
 $('#directory').empty();
 $('#directory').append('<ul>' + '<li>' + result.name + '</li>' + '</ul>')
 }
 */
/*function getContact(group, searchText) {
 if (group != null) {
 for (var i = 0; i < group.items.length; i++) {
 if (group.items[i].name) {
 var result = getContact(group.items[i], searchText);
 if (result != null) {
 return result;
 }
 }
 if (group.items[i].firstName == searchText
 || group.items[i].lastName == searchText
 || group.items[i].phone == searchText) {
 return group.items[i];
 }
 }
 }
 }
 function htmlSearchResultForContactSearch(result) {
 htmlRendering.htmlContentViewShowContactsView();
 $('.contactsTableContainer').empty();
 $('.contactsTableContainer').append('<tr>'
 + '<td>' + result.id + '</td>'
 + '<td>' + result.firstName + '</td>'
 + '<td>' + result.lastName + '</td>'
 + '<td>' + result.phone + '</td>'
 + '<td class="deleteContact">' + 'Delete' + '</td>'
 + '</tr>');
 }
 //htmlRendering.htmlGroupNameRendering(currentGroup.name);
 /*

 if (root.name.indexOf(searchGroup) >= 0) {
 return root;
 }
 else {
 for (var i = 0; i < root.items.length; i++) { //run children;
 if (root.items[i].name) {
 var result = this.getGroupOnSearchResult(root.items[i], searchGroup);
 if (result != null) {
 return result;
 }
 }
 }
 }
 */
