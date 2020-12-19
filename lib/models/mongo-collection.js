'use strict';

class Model {
    constructor(schema) {
        this.schema = schema;
    }

    async create(obj) {
        let newRecord = await new this.schema(obj);
        return newRecord.save();
    }

    async read(request) {
        console.log(request, '====request in mongo collection========================================')
        if ( request ) return await this.schema.findById(request);
        else return await this.schema.find({});
    }

    async delete(_id) {
        return await this.schema.deleteOne({_id});
    }

    async update(_id, updateContent) {
        let result = await this.schema.updateOne({ _id }, updateContent);
        if ( result && result.nModified === 1) {
            let modifiedRecord = await this.read(_id);
            return modifiedRecord;
        };
    }
}

module.exports = Model;