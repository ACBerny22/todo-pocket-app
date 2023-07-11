migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zzo5k3ksyhhvm9")

  collection.listRule = "@request.auth.id = @request.data.user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8zzo5k3ksyhhvm9")

  collection.listRule = null

  return dao.saveCollection(collection)
})
