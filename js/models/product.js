let Product = function (id, name, price, stock) {
    "use strict";
    let _id = ko.observable(id);
    let _name = ko.observable(name);
    let _price = ko.observable(price);
    let _stock = ko.observable(stock);

    return {
        id: _id,
        name: _name,
        price: _price,
        stock: _stock
    };
};
