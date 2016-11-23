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
        success: function(books) {
          var shelf = $('<div class="books"></div>')
          $.each(books.items, function(i, book) {
            var aBook = $('<div class="aBook"></div>')
            var titleAuthor = $('<div class="titleAuthor"></div>')
            if (book && book.volumeInfo && book.volumeInfo.imageLinks) {
              $(aBook).append($('<img>').attr('src', book.volumeInfo.imageLinks.thumbnail));
            }
            $(titleAuthor).append($('<a></a>').attr('href', book.volumeInfo.infoLink).text(book.volumeInfo.title))
            $(titleAuthor).append($('<br>'))
            $(titleAuthor).append($('<p></p>').text(book.volumeInfo.authors.join(', ')))
            $(aBook).append(titleAuthor)
            $(aBook).append($('<p></p>').text(book.volumeInfo.description))
            $(shelf).append(aBook)
          })
          $('#books').append(shelf);
          $.ajax({
            type: "GET",
            url: "http://api.wordnik.com:80/v4/word.json/" + randomWord.toLowerCase() + "/definitions?limit=10&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
            crossDomain: true,
            success: function(definition) {
              var definitionLine = $('<div class="definitions"></div>')
              if (definition.length < 1) {
                $('#definition').append($('<span>Sorry, we couldn\'t find a definition for your word!</span>'))
              } else {
                $.each(definition, function(j, def) {
                  if (def.text === "") {
                    $('#definition').append($('<span>Sorry, we couldn\'t find a definition for your word!</span>'))
                  } else {
                    $(definitionLine).append($('<span></span>').text((j + 1) + ". " + def.partOfSpeech + ":  "));
                    $(definitionLine).append($('<p></p>').text(def.text))
                    $(definitionLine).append($('<span></span>').text("-" + def.attributionText))
                    $(definitionLine).append($('<br>'))
                  }
                })
              }
              $('#definition').append(definitionLine);
            }
          })
        }
      })
    }
  })
  $("form").on("submit", function(e) {
    e.preventDefault();
    typeWord($("input").val())
  })

  function typeWord(whatISearched) {
    $('#word').empty()
    $('#word').append($("<h2></h2>").text(whatISearched.charAt(0).toUpperCase() + whatISearched.substring(1, whatISearched.length).toLowerCase()));
    $.ajax({
      url: "https://www.googleapis.com/books/v1/volumes?q=" + whatISearched,
      crossDomain: true,
      success: function(books) {
        var shelf = $('<div class="books"></div>')
        $.each(books.items, function(i, book) {
          var aBook = $('<div class="aBook"></div>')
          var titleAuthor = $('<div class="titleAuthor"></div>')
          if (book && book.volumeInfo && book.volumeInfo.imageLinks) {
            $(aBook).append($('<img>').attr('src', book.volumeInfo.imageLinks.thumbnail));
          }
          $(titleAuthor).append($('<a></a>').attr('href', book.volumeInfo.infoLink).text(book.volumeInfo.title))
          $(titleAuthor).append($('<br>'))
          $(titleAuthor).append($('<p></p>').text(book.volumeInfo.authors.join(', ')))
          $(aBook).append(titleAuthor)
          $(aBook).append($('<p></p>').text(book.volumeInfo.description))
          $(shelf).append(aBook)
        })
        $('#books').empty().append(shelf);
        $.ajax({
          type: "GET",
          url: "http://api.wordnik.com:80/v4/word.json/" + whatISearched.toLowerCase() + "/definitions?limit=10&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
          crossDomain: true,
          success: function(definition) {
            $('#definition').empty()
            if (definition.length < 1) {
              $('#definition').append($('<span></span>').text('Sorry, we couldn\'t find a definition for your word!'))
            } else {
              $.each(definition, function(j, def) {
                if (def.text === "") {
                  $('#definition').append($('<span></span>').text('Sorry, we couldn\'t find a definition for your word!'))
                } else {
                  $('#definition').append($('<span></span>').text(def.partOfSpeech + "-  "));
                  $('#definition').append($('<p></p>').text(def.text))
                }
              })
            }
          }
        })
      }
    })
  }
})
