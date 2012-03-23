var TIME = 500;

function generateBlocks(data, contElem, createElement, addDelay) {
    $(data).each(function(i, value) {
        contElem.append(createElement(value))
    })
}

function createEventDiv(event) {
    var contentDiv, photosDiv
    var eventDiv = $('<div></div>').addClass('block delayed event')
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
    var contentDiv = $('<div></div>').addClass('block member')
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
	// Initialize member divs
	if (!memberDivs) { memberDivs = $('#container > .members > .member') }

	// Check if columns need to be rearranged at all
    var availableWidth = $('#container').innerWidth()
    var totalMemberWidth = $(memberDivs[0]).outerWidth(true)
    var nColumns = Math.floor(availableWidth / totalMemberWidth)
	if (nColumns == memberColumns) { return } 
	memberColumns = nColumns > 10 ? 10 : nColumns

	// Remove columns and detach members' divs
	memberDivs.detach()
	var membersDiv = $('#container > .members')
	membersDiv.find('> .column').remove()

	// Recreate columns
    var colHeights = [];
    for (var i = 0; i < memberColumns; ++i) { 
		var columnDiv = $('<div></div>').addClass('column delayed').appendTo(membersDiv)
		colHeights[i] = columnDiv.height()
	}

	// Attach members' divs to right columns
	var columnDivs = membersDiv.find('> .column')
	memberDivs.each(function(i, e) {
		var col = indexOfMin(colHeights)
		colHeights[col] = $(columnDivs.get(col)).append(e).height()
	})
}
