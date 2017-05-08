console.log(document.URL);

/////////////////////////////////
// For index.html mobile part //
////////////////////////////////


$('.list-group-item').click(function() {
	$('.list-group-item').removeClass('active');
	$(this).toggleClass('active');
});


/////////////////////////////////
// For inventory.html //
////////////////////////////////

$('#motherCheckbox').click(function() {
	$('.childCheckbox').attr('checked', false);
	$('tbody tr').removeClass('table-info');

	if ($('#motherCheckbox').prop("checked")) {
		$('.childCheckbox').attr('checked', 'checked');
		$('tbody tr').removeClass('table-info');
		$('tbody tr').addClass('table-info');
	}
});

$('.childCheckbox').click(function() {
	if ($(this).prop("checked")) {
		$(this).attr('checked', 'checked');
		$(this).parents('tr').addClass('table-info');
	} else {
		$('.childCheckbox').attr('checked', false);
		$(this).parents('tr').removeClass('table-info');
	}
});
