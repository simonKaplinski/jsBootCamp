var PhoneBookManager = PhoneBookManager || {}


function Group(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.items = [];
}


