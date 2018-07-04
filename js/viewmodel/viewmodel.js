/*global ko*/
let catalogVm = function () {
    "use strict";
    let self = this;
    let catalog = ko.observableArray([
        Product(1, 'T-Shirt', 10.00, 20),
        Product(2, 'Pants', 20.00, 5),
        Product(3, 'Shirt', 15.00, 25),
        Product(4, 'Shorts', 8.00, 10)
    ]);

    let newProduct = Product('', '', '', '');

    let clearNewProduct = function () {
        newProduct.name('');
        newProduct.price('');
        newProduct.stock('');
    };

    let addProduct = function (data) {
        let product = Product(parseInt(catalog.length) + 1, data.name(), data.price(), data.stock());
        catalog.push(product);
        clearNewProduct();
    };

    let searchTerm = ko.observable('');

    let filteredCatalog = ko.computed(function () {
        if (!catalog()) {
            return [];
        }
        let filterString = searchTerm().toLowerCase();
        if (!filterString) {
            return catalog();
        }

        return ko.utils.arrayFilter(catalog(), function (item) {
            let filterFields = ["name"];
            let i = filterFields.length;
            while (i--) {
                let prop = filterFields[i];
                let strProp = ko.unwrap(item[prop]).toLowerCase();
                if (strProp.indexOf(filterString) !== -1) {
                    return true;
                }
            }
            return false;
        });
    });

    return {
        catalog: filteredCatalog,
        newProduct: newProduct,
        addProduct: addProduct,
        searchTerm: searchTerm
    };
};

ko.applyBindings(catalogVm, document.getElementById('catalog-container'));
