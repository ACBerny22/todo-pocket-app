migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zzo5k3ksyhhvm9")

  collection.listRule = "user = @request.auth.id"
  collection.viewRule = "user = @request.auth.id"
  collection.createRule = "user = @request.auth.id"
  collection.updateRule = "user = @request.auth.id"
  collection.deleteRule = "user = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zzo5k3ksyhhvm9")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
