"use strict";

class Model {

  constructor(schema) {
    this.schema = schema;
  }
  
  create(obj) {
    let newRecord = new this.schema(obj);
    return newRecord.save();
  }

  read(id) {
    if (id) {
      return this.schema.findById(id);
    } else {
      return this.schema.find({});
    }
  }

  update(id, updateContent) {
    return this.schema.findByIdAndUpdate(id, updateContent, { new: true });
  }

  delete(id) {
    return this.schema.findByIdAndDelete(id);
  }
}

module.exports = Model;
