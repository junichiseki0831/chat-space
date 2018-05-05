$(function(){
  function buildHTML(message){
    var img = "";
    if (message.image){
      img = `<img src=${message.image} class: 'lower-message__image'>`
    }
    var html = `<div class="message">
                  <ul class="upper-message">
                    <li class="upper-message__user-name">
                      ${message.user_name}
                    </li>
                    <li class="upper-message__date">
                      ${message.created_at}
                    </li>
                  </ul>
                  <ul class="lower-message">
                      <li class="lower-message__content">
                        ${message.content}
                      </li>
                        ${img}
                  </ul>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__message').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight }, 'fast');
      $('.form__submit').prop("disabled", false)
      $('.new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  })
});
