var TIME = 500;

function assignTransitionDelay(elem, order) {
    var delay = (TIME / 2) * (order / (order+1))
    elem.css('-webkit-transition-delay', Math.round(delay) + 'ms')
}

function generateBlocks(data, contElem, createElement) {
    $(data).each(function(i, value) {
        var elem = createElement(value)
        assignTransitionDelay(elem, i)
        contElem.append(elem)
    })
}

function createEventDiv(event) {
    var contentDiv, photosDiv
    var eventDiv = $('<div></div>').addClass('block').addClass('event')
        .append(contentDiv = $('<div></div>')
            .append($('<div></div>').addClass('fadeout'))
            .append($('<div></div>').addClass('bottom'))
            .append($('<div>' + formatDate(event) + '</div>').addClass('date'))
            .append($('<div>' + event['title'] + '</div>').addClass('title'))
            .append(photosDiv = $('<div></div>').addClass('photos').hide())
    )
    
    if (event['description']) {
        eventDiv.append($('<div>' + event['description'] + '</div>').addClass('description'))
    }
    
    if (event['photos']) {
        $(event['photos']).each(function(i, url) { photosDiv.append($('<img src="' + url + '">')) })
        photosDiv.show()
    }
    
    return eventDiv
}

function createMemberDiv(member) {
    var contentDiv = $('<div></div>').addClass('block').addClass('member')
            .append($('<div>' + member['name'] + '</div>').addClass('name'))
            .append($('<div>' + member['visits'] + ' visits</div>').addClass('visits'))
    
    if (member['websites']) {
        var html = ''
    
        $.each(member['websites'], function(name, url) { 
            var comma = html == '' ? '' : ', '
            html += comma + '<a href="' + url + '">' + name + '</a>' 
        });
        
        contentDiv.append($(html))
    }
    
    return contentDiv;
}

var memberColumns = 0
var memberDivs = null

function layoutMembers() {
	if (!memberDivs) {
		memberDivs = $('#container > .members > .member')
	}

    var availableWidth = $('#container').innerWidth()
    var totalMemberWidth = $(memberDivs[0]).outerWidth(true)

    var nColumns = Math.floor(availableWidth / totalMemberWidth)
    if (nColumns == memberColumns) { return }

	memberDivs.detach()
	$('#container > .members > .column').remove()
    
    memberColumns = nColumns;
    
    var colHeights = [];
    for (var i = 0; i < nColumns && i < 10; ++i) { 
		var columnDiv = $('<div></div>').addClass('column')
		$('#container > .members').append(columnDiv)
		colHeights[i] = columnDiv.height()
	}
	
	var columnDivs = $('#container > .members > .column')
	
	memberDivs.each(function(i, e) {
		var col = indexOfMin(colHeights)
		var columnDiv = $(columnDivs.get(col))
		columnDiv.append(e)
		colHeights[col] = columnDiv.height()
	})
}
