$(function() {
  $.ajax({
    type: "GET",
    url: "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
    success: function(data) {
      var randomWord = data.word.charAt(0).toUpperCase() + data.word.substring(1, data.word.lenght);
      $('#word').append($("<h2></h2>").text(randomWord));
      $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + randomWord,
        crossDomain: true,
        async: false,
        success: function(books) {
          var shelf = $('<div class="books"></div>')
          $.each(books.items, function(i, book) {
            var imgBox = $('<div "class=imgBox"></div>')
            var aBook = $('<div class="aBook"></div>')
            $(imgBox).append($('<img>').attr('src', book.volumeInfo.imageLinks.thumbnail));
            $(aBook).append(imgBox)
            $(aBook).append($('<a></a>').attr('href', book.volumeInfo.infoLink).text(book.volumeInfo.title))
            $(aBook).append($('<br>'))
            $(aBook).append($('<p></p>').text(book.volumeInfo.authors[0]))
            $(shelf).append(aBook)
          })
          $('#books').append(shelf);
          $.ajax({
            type: "GET",
            url: "http://api.wordnik.com:80/v4/word.json/" + randomWord.toLowerCase() + "/definitions?limit=10&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
            crossDomain: true,
            success: function(definition) {
              var definitionLine = $('<div class="definitions"></div>')
              $.each(definition, function(j, def) {
                $(definitionLine).append($('<span></span>').text((j + 1) + ". " + def.partOfSpeech + ":  "));
                $(definitionLine).append($('<p></p>').text(def.text))
                $(definitionLine).append($('<span></span>').text("-" + def.attributionText))
                $(definitionLine).append($('<br>'))
                console.log(def);
              })
              $('#definition').append(definitionLine);
            }
          })
        }
      })
    }
  }).then(function(data) {})
  $("form").on("submit", function(e) {
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
