$(function(){
  function buildHTML(message){
    if (message.image){
      let html =
       `<div class="Main-chat__main-messages__box-1">
          <div class="Main-chat__main-messages__box-1__name">
            ${message.user_name}
          </div>
          <div class="Main-chat__main-messages__box-1__date">
            ${message.created_at}
          </div>
        </div>
        <div class="Main-chat__main-messages__box-2">
          <div class="Main-chat__main-messages__box-2__comment">
            <p class="Message__content">
            ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="Main-chat__main-messages__box-1">
           <div class="Main-chat__main-messages__box-1__name">
             ${message.user_name}
           </div>
         <div class="Main-chat__main-messages__box-1__date">
           ${message.created_at}
         </div>
        </div>
        <div class="Main-chat__main-messages__box-2">
          <div class="Main-chat__main-messages__box-2__comment">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this)
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Main-chat__main-messages').append(html);
      $('.Main-chat__main-messages').animate({ scrollTop: $('.Main-chat__main-messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.input-box__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    })
  })
});