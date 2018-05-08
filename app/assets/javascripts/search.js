$(function() {

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
               </div>`
    $("#user-search-result").append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">${user}</div>`
    $("#user-search-result").append(html);
  }

  function appendGroupUser(user_name, user_id){
     var html = `<div class='chat-group-user clearfix js-chat-member' id='${user_id}'>
                   <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                   <p class='chat-group-user__name'>${user_name}</p>
                   <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                 </div>`
     $('#chat-group-form__users').append(html)
   }

    $("#user-search-field").on("keyup", function(){
      var input = $(this).val();
      if (input !== "") {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: {keyword: input},
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
         });
         }
        else {
          appendNoUser("一致するユーザーはいません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      });
      }
     $("#user-search-result").empty()
   })
   $('#user-search-result').on('click', '.user-search-add', function() {
     $('#user-search-field').val('');
     var userId = $(this).data('user-id')
     var userName = $(this).data('user-name')
     appendGroupUser(userName, userId)
     $(this).parent().remove()
   })
   $('#chat-group-form__users').on('click', '.user-search-remove', function() {
     $(this).parent().remove()
   })
 })
