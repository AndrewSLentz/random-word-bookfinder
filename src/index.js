$(function() {
  $.ajax({
    type: "GET",
    url: "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
    success: function(data) {
      var randomWord = data.word;
      $('#word').append($("<h2></h2>").text(randomWord));
      $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + randomWord,
        crossDomain: true,
        success: function(books) {
          $.each(books.items, function(i, book) {
            $('#books').append($('<span></span>').text(book.volumeInfo.title))
            console.log(book.volumeInfo)
          })
          $.ajax({
            type: "GET",
            url: "http://api.wordnik.com:80/v4/word.json/" + randomWord + "/definitions?limit=10&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
            crossDomain: true,
            success: function(definition) {
               if(definition.length < 1){
                 $('#definition').append($('<span>Sorry, we couldn\'t find a definition for your word!</span>'))
               } else {
              $.each(definition, function(j, def) {
                if(def.text === ""){
                $('#definition').append($('<span>Sorry, we couldn\'t find a definition for your word!</span>'))
              } else {
                $('#definition').append($('<span></span>').text(def.partOfSpeech + "-  "));
                $('#definition').append($('<p></p>').text(def.text))
                console.log(def);
                }
              })
             }
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
    $('#word').empty()
    $('#word').append($("<h2></h2>").text(whatISearched));
    $.ajax({
      url: "https://www.googleapis.com/books/v1/volumes?q=" + whatISearched,
      crossDomain: true,
      success: function(books) {
        $('#books').empty()
        $.each(books.items, function(i, book) {
          $('#books').append($('<span></span>').text(book.volumeInfo.title))
          $('#books').append($('<span></span>').text(book.volumeInfo.authors))
        })
        $.ajax({
          type: "GET",
          url: "http://api.wordnik.com:80/v4/word.json/" + whatISearched + "/definitions?limit=10&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
          crossDomain: true,
          success: function(definition) {
            $('#definition').empty()
             if(definition.length < 1){
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
