$(function() {
  $.ajax({
    type: "GET",
    url: "http://randomword.setgetgo.com/get.php?len=6",
    dataType: "jsonp",
    success: function(data) {
      var randomWord = data.Word;
      console.log(randomWord);
      $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + randomWord,
        crossDomain: true,
        success: function(books) {
          $.each(books.items, function(i, book) {
            console.log(book.volumeInfo.title)
          })
          $.ajax({
            type: "GET",
            url: "https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=" + randomWord + "&apikey=gFKC8n1QtPXDkINvhlm7v8fwFulOwzYR",
            crossDomain: true,
            success: function(definition) {
              console.log(definition.results);
            }
          })
        }
      })
    }
  }).then(function(data) {})

})
