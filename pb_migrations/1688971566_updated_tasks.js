migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zzo5k3ksyhhvm9")

  collection.listRule = "user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zzo5k3ksyhhvm9")

  collection.listRule = null

  return dao.saveCollection(collection)
})
