$("form").on("submit", function(e){
  e.preventDefault();
  typeWord($("input").val())
})

function typeWord(whatISearched) {

  $.ajax({
   url: "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/test?key=7f6b3df1-8268-4bbc-aac5-96066babcf0a"
 }).then(function(response) {

 }

}
