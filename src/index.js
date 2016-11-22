$(function() {
  $.ajax({
    type: "GET",
    url: "http://randomword.setgetgo.com/get.php",
    dataType: "jsonp",
    success: function(data) {
      var randomWord = data.Word;
      console.log(randomWord);
      $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + randomWord,
        crossDomain: true
      }).then(function(books) {
        $.each(books.items, function(i, book) {
          console.log(book.volumeInfo.title);
        })
      })
    }
  }).then(function(data) {})

})
