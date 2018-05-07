$(function(){
  $("#user-search-field").on('keyup', function(){
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/groups/new',
      dasta: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
    });
  });
})
