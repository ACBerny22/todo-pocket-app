migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zzo5k3ksyhhvm9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rvicjihz",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zzo5k3ksyhhvm9")

  // remove
  collection.schema.removeField("rvicjihz")

  return dao.saveCollection(collection)
})
