var TIME = 500;

function select(name) {
    $('#container > .current').removeClass('current')
    $('#container > .' + name).addClass('current')
    $('#navigation > .current').removeClass('current')
    $('#navigation > .' + name).addClass('current')
}

function generateBlocks(data, contElem, createElement, addDelay) {
    $(data).each(function(i, value) {
        contElem.append(createElement(value))
    })
}

var topicIcons = { 
    'android' : 'img/icon-android.png',
    'chrome' : 'img/icon-chrome.png', 
    'html5' : 'img/icon-html5.png', 
    'games' : 'img/icon-games.png', 
}

function createEventDiv(event) {
    var contentDiv, photosDiv
    var eventDiv = $('<div></div>').addClass('block delayed event')
        .append(contentDiv = $('<div></div>')
            .append($('<div></div>').addClass('fadeout'))
            .append($('<div></div>').addClass('bottom'))
            .append($('<div>' + formatDate(event) + '</div>').addClass('date'))
            .append($('<div>' + event['title'] + '</div>').addClass('title'))
            .append(photosDiv = $('<div></div>').addClass('photos').hide()))
        .click(function() {
            $('#container > .selected').remove()
            createEventDivSelected(event).appendTo('#container')
            setTimeout(function() { select('selected') }, 0)
        })

    if (event.description) {
        eventDiv.append($('<div>' + event.description + '</div>').addClass('description'))
    }
    
    if (event.topics) {
        var topicsDiv
        eventDiv.prepend(topicsDiv = $('<div></div>').addClass('topics'))
        $(event.topics).each(function(i, topic) {
            topicsDiv.append($('<img src="' + topicIcons[topic] + '">').addClass('topic'))
        })
    }
    
    if (event.photos) {
        photosDiv.show().pwi({
            username: event.photos.username,
            album: event.photos.album,
            mode: 'album',
            maxResults: 7,
            thumbCrop: true,
            onclickThumb: function() { },
            showPager: 'none',
            showSlideshow: false,
            showSlideshowLink: false,
            showPhotoDate: false,
            showAlbumDescription: false,
            thumbSize: 104,
        })
    }
    
    return eventDiv
}

function createEventDivSelected(event) {
    var contentDiv, photosDiv
    var eventDiv = $('<div></div>').addClass('block selected event')
        .append(contentDiv = $('<div></div>')
            .append($('<div>' + formatDate(event) + '</div>').addClass('date'))
            .append($('<div>' + event['title'] + '</div>').addClass('title'))
            .append(photosDiv = $('<div></div>').addClass('photos').hide()))

    if (event['description']) {
        eventDiv.append($('<div>' + event['description'] + '</div>').addClass('description'))
    }
    
    if (event.photos) {
        photosDiv.show().pwi({
            username: event.photos.username,
            album: event.photos.album,
            mode: 'album',
            maxResults: 20,
            thumbCrop: true,
            onclickThumb: function() { },
            showPager: 'none',
            showSlideshow: false,
            showSlideshowLink: false,
            showPhotoDate: false,
            showAlbumDescription: false,
            thumbSize: 160,
        })
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
