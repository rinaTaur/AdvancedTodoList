var items = []

var notifyComponents = function() {
  $(ListStore).trigger('storeHasChanged')
}

var findItemById = function(id) {
  return items.filter(function(item) {
    return item.id === id
  })[0]
},

ListStore = {

  getItems: function() {
    return items
  },

  loadItems: function() {
    var loadRequest = $.ajax({
      type: 'GET',
      url: "https://listalous.herokuapp.com/lists/rinataur/"
    })
    
    loadRequest.done(function(dataFromServer) { // this is saying 'grab the ajax stuff and when done loading, execute this anonymous function'
     
     // a way to fake a slow server response
     // for (var i = 0; i < 1000000; i++) {
        // Do nothing for a while
     //   console.log(i)
     // }
      items = dataFromServer.items
      notifyComponents()
    })
  },
  addItem: function(itemDescription) {
    var creationRequest = $.ajax({
      type: 'POST',
      url: "http://listalous.herokuapp.com/lists/rinataur/items",
      data: { description: itemDescription, completed: false }
    })

    creationRequest.done(function(itemDataFromServer) {
      items.push(itemDataFromServer)
      notifyComponents()
    })
  },
  removeItem: function() {
    var itemDestroy = $.ajax({
      type: 'DELETE',
      url: "http://listalous.herokuapp.com/lists/rinataur/items",
      data: { description: itemDescription, completed: false }
    })

    itemDestroy.done(function(itemDataDeleted) {
      notifyComponents()
    })
  }
  toggleCompleteness: function(itemId) {
    var item = findItemById(itemId)
    var currentCompletedValue = item.completed

    var updateRequest = $.ajax({
      type: 'PUT',
      url: "https://listalous.herokuapp.com/lists/rinataur/items/" + itemId,
      data: { completed: !currentCompletedValue }
    })

    updateRequest.done(function(itemData) {
      item.completed = itemData.completed
      notifyComponents()
    })

  }
}

