$("form").on("submit", function(e){
  e.preventDefault();
  typeWord($("input").val())
})

function typeWord(whatISearched) {
  $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes?q=" + whatISearched,
    crossDomain: true,
    success: function(books) {
      $.each(books.items, function(i, book) {
        console.log(book.volumeInfo.title)
      })
      $.ajax({
        type: "GET",
        url: "https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=" + whatISearched + "&apikey=gFKC8n1QtPXDkINvhlm7v8fwFulOwzYR",
        crossDomain: true,
        success: function(definition) {
          console.log(definition.results);
        }
      })
    }
  })
  }.then(function(data) {})
