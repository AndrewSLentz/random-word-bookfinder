$(function() {
  $.ajax({
    type: "GET",
    url: "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
    success: function(data) {
      var randomWord = data.word;
      console.log(randomWord);
      $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + randomWord,
        crossDomain: true,
        success: function(books) {
          $.each(books.items, function(i, book) {
            console.log(book.volumeInfo)
          })
          $.ajax({
            type: "GET",
            url: "http://api.wordnik.com:80/v4/word.json/" + randomWord + "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
            crossDomain: true,
            success: function(definition) {
              console.log(definition);
            }
          })
        }
      })
    }
  }).then(function(data) {})
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
        console.log(book.volumeInfo)
      })
      $.ajax({
        type: "GET",
        url: "http://api.wordnik.com:80/v4/word.json/" + whatISearched + "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
        crossDomain: true,
        success: function(definition) {
          console.log(definition);
        }
      })
    }
  })
  }
})
