function createUi() {
    var TIME = 500;
    var CLASS_CURRENT = 'current';

	var pages = {};
	var navs = {}
	var currentPageId;
            
    var ui = {
        addPage: function(id, ePage, eNav) {
            pages[id] = createPage(id, ePage);
            navs[id] = createNav(id, eNav);
            return ui;
        },
        
        addGridPage: function(id, ePage, eCounter, eNav) {
            pages[id] = createGridPage(id, ePage, eCounter);
            navs[id] = createNav(id, eNav);
            return ui;
        },
        
        getPage: function(id) { return pages[id]; },
        getNav: function(id) { return navs[id]; },
        
        startPage: function(id) {
            currentPageId = id;
            pages[currentPageId].preShow();
            pages[currentPageId].show();
        },
        
        openPage: function(id) {
            pages[id].preShow();
            
            pages[currentPageId].hide(function() {
                currentPageId = id;
                pages[currentPageId].show();
            });
        },
    }

    function createNav(id, element) {
        element.click(function() {
            ui.openPage(id); 
        });
        
        return {
            select: function() { element.addClass(CLASS_CURRENT); },
            deselect: function() { element.removeClass(CLASS_CURRENT); },    
        }
    }
    
    function createPage(id, element) {
        return {
            preShow: function() {
                ui.getNav(id).select();
            },
            hide: function(onEnd) {
                ui.getNav(id).deselect();
                element.animate({ opacity: '0' }, TIME, function() {
                    element.removeClass(CLASS_CURRENT);
                    onEnd();
                });
            },
            show: function() {
                element.addClass(CLASS_CURRENT);
                element.css('opacity', '0').animate({ opacity: '1' }, TIME);
            },
        }
    }
    
    function createGridPage(id, element, eCounter) {
        return {
            preShow: function() {
                ui.getNav(id).select();
            },
            hide: function(onEnd) {
                ui.getNav(id).deselect();
                
                element.children().each(function(i, eCell) {
                    $(eCell).delay(TIME/2*(i/(i+1))).animate({ opacity: '0' }, TIME/2);
                });
                
                setTimeout(function() {
                    element.removeClass(CLASS_CURRENT);
                    onEnd();
                }, TIME);
            },
            show: function() {
                element.addClass(CLASS_CURRENT);
                
                element.children().each(function(i, eCell) {
                    $(eCell).css('opacity', '0').delay(TIME/2*(i/(i+1))).animate({ opacity: '1' }, TIME);
                    if (eCounter) { setTimeout(function() { eCounter.text(i+1); }, TIME/2*(i/(i+1))); } 
                });
            },
            generate: function(data, createElement) {
                $(data).each(function(i, item) {
                    element.append(createElement(i, item));
                });
                
                if (eCounter) { eCounter.text(data.length); }
            }
        };
    }
    
    return ui;
}
