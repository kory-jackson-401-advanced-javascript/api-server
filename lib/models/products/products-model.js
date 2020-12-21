'use strict';

const schema = require('./products-schema.js');

class Products{

    create(obj) {
        let newRecord = new schema(obj);
        return newRecord.save();
    }

    read(id) {

        if (id) {
            return schema.findById(id);
        } else {
            return schema.find({});
        }
    }

    update(id, updateContent) {
        return schema.findByIdAndUpdate(id, updateContent, { new: true });
    }

    delete(id) {
        return schema.findByIdAndDelete(id);
    }


}

module.exports = new Products();