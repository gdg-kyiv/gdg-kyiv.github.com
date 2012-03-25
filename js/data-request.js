function requestData(success, failure) {
    $.ajax({ 
        url: 'data.js', dataType: 'json', success: success, 
        error: function(jqXHR, textStatus, errorThrown) { 
            return failure(textStatus + ": " + errorThrown) 
        }
    })
}
