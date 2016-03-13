var htmlRendering = {

    htmlPrintTreeFromStartOfTheRootOnChange: function (root) {
        $('#directory').empty();
        htmlRendering.htmlGetRootAndDelivereToPrint(root);
    },

    htmlGetRootAndDelivereToPrint: function (group) {
        $('#directory').empty();
        //target dom element where print all data tree structure;
        var directory = document.getElementById('directory');
        //for every item in items array find group;
        for (var i = 0; i < group.items.length; i++) {
            if (group.items[i].name) {
                //run function to print all groups;
                htmlRendering.htmlMenuRendering(directory, group.items[i]);
            }
        }
    },
    //function show group current group name;
    htmlGroupNameRendering: function (currentGroupName) {
        $('#currentGroupName').empty();
        $('#currentGroupName').text(currentGroupName);
    },
    //function show html menu;
    htmlMenuRendering: function (directory, item) {
        //directory is DOM element contains all groups;
        var item = item || root;
        //case item is group;
        if (item.name) {
            //create element;
            var li = document.createElement('li');
            //insert group name;
            li.innerHTML = item.name;
            //append to directory;
            directory.appendChild(li);
            //if group has items in items array;
            if (item.items.length > 0) {
                var ul = document.createElement('ul');
                directory = directory.appendChild(ul);
                //for each item in items array run recursive function for same process;
                item.items.forEach(function (childItem) {
                    htmlRendering.htmlMenuRendering(directory, childItem);
                });
                //set directory DOM item to parentNode for clean print;
                directory = directory.parentNode;
            }
        }
    },

    htmlSearchGroupResultRender: function (result) {
        $('#directory').empty();
        for(var i = 0 ; i<result.length;i++) {
            $('#directory').append('<ul>' + '<li>' + result[i].name + '</li>' + '</ul>')
        }
    },

    htmlContactsRenderingShowOnTableByGroup: function (currentGroup) {
        $('.contactsTableContainer').empty();
        for (var i = 0; i < currentGroup.items.length; i++) {
            if (currentGroup.items[i].firstName) {
                $('.contactsTableContainer').append('<tr>'
                    + '<td>' + currentGroup.items[i].id + '</td>'
                    + '<td>' + currentGroup.items[i].firstName + '</td>'
                    + '<td>' + currentGroup.items[i].lastName + '</td>'
                    + '<td>' + currentGroup.items[i].phone + '</td>'
                    + '<td class="deleteContact">' + 'Delete' + '</td>'
                    + '</tr>');
            }
        }
    },
    //hide createContact/create group panel , show showContentsContainer panel;
    htmlContentViewShowContactsView: function () {
        $('#createContact').removeClass("show").addClass("invisible");
        $('#createGroup').removeClass("show").addClass("invisible");
        $('#showContentsContainer').removeClass("invisible").addClass("show");
    },
    //hide showContentsContainer/createGroup group panel , show createContact panel;
    htmlChangeViewCreateContactMode: function () {
        $('#showContentsContainer').removeClass("show").addClass("invisible");
        $('#createGroup').removeClass("show").addClass("invisible");
        $('#createContact').removeClass("invisible").addClass("show");
    },
    //hide showContentsContainer/createContact group panel , show createGroup panel;
    htmlChangeViewCreateGroupMode: function () {
        $('#showContentsContainer').removeClass("show").addClass("invisible");
        $('#createContact').removeClass("show").addClass("invisible");
        $('#createGroup').removeClass("invisible").addClass("show");
    },

    htmlSearchResultForContactSearch: function (result) {
        $('.contactsTableContainer').empty();
        htmlRendering.htmlContentViewShowContactsView();
        for (var i = 0; i < result.length; i++) {
            $('.contactsTableContainer').append('<tr>'
                + '<td>' + result[i].id + '</td>'
                + '<td>' + result[i].firstName + '</td>'
                + '<td>' + result[i].lastName + '</td>'
                + '<td>' + result[i].phone + '</td>'
                + '</tr>');
        }
    }
}


