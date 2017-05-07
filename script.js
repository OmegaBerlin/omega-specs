console.log(document.URL);

$('.list-group-item').click(function() {
  $('.list-group-item').removeClass('active');
  $(this).toggleClass('active');
});
