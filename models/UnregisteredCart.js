<<<<<<< HEAD
module.exports = function UnregisteredCart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;


    this.add = function (item, id, size) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, item_id: item.id, name: item.name, image: item.main_image, size: size, qty: 0, price: 0 };
        }
        console.log(item)
        storedItem.qty++;
        storedItem.price = storedItem.item.price.base * storedItem.qty;
        this.totalQty++
        this.totalPrice += storedItem.item.price.base

    }

    this.reduceByOne = function (id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qty <= 0) {
            delete this.items[id]
        }
    }

    this.removeItem = function (id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id]
    }

    this.generateArray = function () {
        let arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
=======
module.exports = function UnregisteredCart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;


    this.add = function (item, id, size) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, item_id: item.id, name: item.name, image: item.main_image, size: size, qty: 0, price: 0 };
        }
        console.log(item)
        storedItem.qty++;
        storedItem.price = storedItem.item.price.base * storedItem.qty;
        this.totalQty++
        this.totalPrice += storedItem.item.price.base

    }

    this.reduceByOne = function (id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qty <= 0) {
            delete this.items[id]
        }
    }

    this.removeItem = function (id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id]
    }

    this.generateArray = function () {
        let arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
>>>>>>> a8a8b4650a974eeda356f271e4e38c9b4cab5fa3
};