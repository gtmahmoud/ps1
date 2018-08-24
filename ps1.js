var Paginator = function(_0xb979x2, _0xb979x3, _0xb979x4, _0xb979x5, _0xb979x6) {
    if (!document['getElementById'](_0xb979x2) || !_0xb979x3 || !_0xb979x4) {
        return false
    };
    this['inputData'] = {
        paginatorHolderId: _0xb979x2,
        pagesTotal: _0xb979x3,
        pagesSpan: _0xb979x4 < _0xb979x3 ? _0xb979x4 : _0xb979x3,
        pageCurrent: _0xb979x5,
        baseUrl: _0xb979x6 ? _0xb979x6 : '/pages/'
    };
    this['html'] = {
        holder: null,
        table: null,
        trPages: null,
        trScrollBar: null,
        tdsPages: null,
        scrollBar: null,
        scrollThumb: null,
        pageCurrentMark: null
    };
    this['prepareHtml']();
    this['initScrollThumb']();
    this['initPageCurrentMark']();
    this['initEvents']();
    this['scrollToPageCurrent']();
};
Paginator['prototype']['prepareHtml'] = function() {
    this['html']['holder'] = document['getElementById'](this['inputData']['paginatorHolderId']);
    this['html']['holder']['innerHTML'] = this['makePagesTableHtml']();
    this['html']['table'] = this['html']['holder']['getElementsByTagName']('table')[0];
    var _0xb979x7 = this['html']['table']['getElementsByTagName']('tr')[0];
    this['html']['tdsPages'] = _0xb979x7['getElementsByTagName']('td');
    this['html']['scrollBar'] = getElementsByClassName(this['html']['table'], 'div', 'scroll_bar')[0];
    this['html']['scrollThumb'] = getElementsByClassName(this['html']['table'], 'div', 'scroll_thumb')[0];
    this['html']['pageCurrentMark'] = getElementsByClassName(this['html']['table'], 'div', 'current_page_mark')[0];
    if (this['inputData']['pagesSpan'] == this['inputData']['pagesTotal']) {
        addClass(this['html']['holder'], 'fullsize')
    };
};
Paginator['prototype']['makePagesTableHtml'] = function() {
    var _0xb979x8 = (100 / this['inputData']['pagesSpan']) + '%';
    var _0xb979x9 = '' + '<table width="100%">' + '<tr>';
    for (var _0xb979xa = 1; _0xb979xa <= this['inputData']['pagesSpan']; _0xb979xa++) {
        _0xb979x9 += '<td width="' + _0xb979x8 + '"></td>'
    };
    _0xb979x9 += '' + '</tr>' + '<tr>' + '<td colspan="' + this['inputData']['pagesSpan'] + '">' + '<div class="scroll_bar">' + '<div class="scroll_trough"></div>' + '<div class="scroll_thumb">' + '<div class="scroll_knob"></div>' + '</div>' + '<div class="current_page_mark"></div>' + '</div>' + '</td>' + '</tr>' + '</table>';
    return _0xb979x9;
};
Paginator['prototype']['initScrollThumb'] = function() {
    this['html']['scrollThumb']['widthMin'] = '8';
    this['html']['scrollThumb']['widthPercent'] = this['inputData']['pagesSpan'] / this['inputData']['pagesTotal'] * 100;
    this['html']['scrollThumb']['xPosPageCurrent'] = (this['inputData']['pageCurrent'] - Math['round'](this['inputData']['pagesSpan'] / 2)) / this['inputData']['pagesTotal'] * this['html']['table']['offsetWidth'];
    this['html']['scrollThumb']['xPos'] = this['html']['scrollThumb']['xPosPageCurrent'];
    this['html']['scrollThumb']['xPosMin'] = 0;
    this['html']['scrollThumb']['xPosMax'];
    this['html']['scrollThumb']['widthActual'];
    this['setScrollThumbWidth']();
};
Paginator['prototype']['setScrollThumbWidth'] = function() {
    this['html']['scrollThumb']['style']['width'] = this['html']['scrollThumb']['widthPercent'] + '%';
    this['html']['scrollThumb']['widthActual'] = this['html']['scrollThumb']['offsetWidth'];
    if (this['html']['scrollThumb']['widthActual'] < this['html']['scrollThumb']['widthMin']) {
        this['html']['scrollThumb']['style']['width'] = this['html']['scrollThumb']['widthMin'] + 'px'
    };
    this['html']['scrollThumb']['xPosMax'] = this['html']['table']['offsetWidth'] - this['html']['scrollThumb']['widthActual'];
};
Paginator['prototype']['moveScrollThumb'] = function() {
    this['html']['scrollThumb']['style']['left'] = this['html']['scrollThumb']['xPos'] + 'px'
};
Paginator['prototype']['initPageCurrentMark'] = function() {
    this['html']['pageCurrentMark']['widthMin'] = '3';
    this['html']['pageCurrentMark']['widthPercent'] = 100 / this['inputData']['pagesTotal'];
    this['html']['pageCurrentMark']['widthActual'];
    this['setPageCurrentPointWidth']();
    this['movePageCurrentPoint']();
};
Paginator['prototype']['setPageCurrentPointWidth'] = function() {
    this['html']['pageCurrentMark']['style']['width'] = this['html']['pageCurrentMark']['widthPercent'] + '%';
    this['html']['pageCurrentMark']['widthActual'] = this['html']['pageCurrentMark']['offsetWidth'];
    if (this['html']['pageCurrentMark']['widthActual'] < this['html']['pageCurrentMark']['widthMin']) {
        this['html']['pageCurrentMark']['style']['width'] = this['html']['pageCurrentMark']['widthMin'] + 'px'
    };
};
Paginator['prototype']['movePageCurrentPoint'] = function() {
    if (this['html']['pageCurrentMark']['widthActual'] < this['html']['pageCurrentMark']['offsetWidth']) {
        this['html']['pageCurrentMark']['style']['left'] = (this['inputData']['pageCurrent'] - 1) / this['inputData']['pagesTotal'] * this['html']['table']['offsetWidth'] - this['html']['pageCurrentMark']['offsetWidth'] / 2 + 'px'
    } else {
        this['html']['pageCurrentMark']['style']['left'] = (this['inputData']['pageCurrent'] - 1) / this['inputData']['pagesTotal'] * this['html']['table']['offsetWidth'] + 'px'
    }
};
Paginator['prototype']['initEvents'] = function() {
    var _0xb979xb = this;
    this['html']['scrollThumb']['onmousedown'] = function(_0xb979xc) {
        if (!_0xb979xc) {
            var _0xb979xc = window['event']
        };
        _0xb979xc['cancelBubble'] = true;
        if (_0xb979xc['stopPropagation']) {
            _0xb979xc['stopPropagation']()
        };
        var _0xb979xd = getMousePosition(_0xb979xc)['x'] - this['xPos'];
        document['onmousemove'] = function(_0xb979xc) {
            if (!_0xb979xc) {
                var _0xb979xc = window['event']
            };
            _0xb979xb['html']['scrollThumb']['xPos'] = getMousePosition(_0xb979xc)['x'] - _0xb979xd;
            _0xb979xb['moveScrollThumb']();
            _0xb979xb['drawPages']();
        };
        document['onmouseup'] = function() {
            document['onmousemove'] = null;
            _0xb979xb['enableSelection']();
        };
        _0xb979xb['disableSelection']();
    };
    this['html']['scrollBar']['onmousedown'] = function(_0xb979xc) {
        if (!_0xb979xc) {
            var _0xb979xc = window['event']
        };
        if (matchClass(_0xb979xb['paginatorBox'], 'fullsize')) {
            return
        };
        _0xb979xb['html']['scrollThumb']['xPos'] = getMousePosition(_0xb979xc)['x'] - getPageX(_0xb979xb['html']['scrollBar']) - _0xb979xb['html']['scrollThumb']['offsetWidth'] / 2;
        _0xb979xb['moveScrollThumb']();
        _0xb979xb['drawPages']();
    };
    addEvent(window, 'resize', function() {
        Paginator['resizePaginator'](_0xb979xb)
    });
};
Paginator['prototype']['drawPages'] = function() {
    var _0xb979xe = this['html']['scrollThumb']['xPos'] / (this['html']['table']['offsetWidth']);
    var _0xb979xf = Math['round'](_0xb979xe * this['inputData']['pagesTotal']);
    var _0xb979x9 = '';
    if (_0xb979xf < 1) {
        _0xb979xf = 1;
        this['html']['scrollThumb']['xPos'] = 0;
        this['moveScrollThumb']();
    } else {
        if (_0xb979xf >= this['inputData']['pagesTotal'] - this['inputData']['pagesSpan']) {
            _0xb979xf = this['inputData']['pagesTotal'] - this['inputData']['pagesSpan'] + 1;
            this['html']['scrollThumb']['xPos'] = this['html']['table']['offsetWidth'] - this['html']['scrollThumb']['offsetWidth'];
            this['moveScrollThumb']();
        }
    };
    for (var _0xb979xa = 0; _0xb979xa < this['html']['tdsPages']['length']; _0xb979xa++) {
        var _0xb979x10 = _0xb979xf + _0xb979xa;
        if (_0xb979x10 == this['inputData']['pageCurrent']) {
            _0xb979x9 = '<span>' + '<strong>' + _0xb979x10 + '</strong>' + '</span>'
        } else {
            _0xb979x9 = '<span>' + '<a href=\'#\'  onclick=\'redirect' + jenis + '(' + _0xb979x10 + ');return false\'>' + _0xb979x10 + '</a>' + '</span>'
        };
        this['html']['tdsPages'][_0xb979xa]['innerHTML'] = _0xb979x9;
    };
};
Paginator['prototype']['scrollToPageCurrent'] = function() {
    this['html']['scrollThumb']['xPosPageCurrent'] = (this['inputData']['pageCurrent'] - Math['round'](this['inputData']['pagesSpan'] / 2)) / this['inputData']['pagesTotal'] * this['html']['table']['offsetWidth'];
    this['html']['scrollThumb']['xPos'] = this['html']['scrollThumb']['xPosPageCurrent'];
    this['moveScrollThumb']();
    this['drawPages']();
};
Paginator['prototype']['disableSelection'] = function() {
    document['onselectstart'] = function() {
        return false
    };
    this['html']['scrollThumb']['focus']();
};
Paginator['prototype']['enableSelection'] = function() {
    document['onselectstart'] = function() {
        return true
    }
};
Paginator['resizePaginator'] = function(_0xb979x11) {
    _0xb979x11['setPageCurrentPointWidth']();
    _0xb979x11['movePageCurrentPoint']();
    _0xb979x11['setScrollThumbWidth']();
    _0xb979x11['scrollToPageCurrent']();
};

function getElementsByClassName(_0xb979x13, _0xb979x14, _0xb979x15) {
    var _0xb979x16 = _0xb979x13['getElementsByTagName'](_0xb979x14);
    if (!_0xb979x15) {
        return _0xb979x16
    };
    var _0xb979x17 = [];
    for (var _0xb979xa = 0; _0xb979xa < _0xb979x16['length']; _0xb979xa++) {
        if (matchClass(_0xb979x16[_0xb979xa], _0xb979x15)) {
            _0xb979x17[_0xb979x17['length']] = _0xb979x16[_0xb979xa]
        }
    };
    return _0xb979x17;
}

function addClass(_0xb979x19, _0xb979x1a) {
    replaceClass(_0xb979x19, _0xb979x1a, '')
}

function removeClass(_0xb979x19, _0xb979x1c) {
    replaceClass(_0xb979x19, '', _0xb979x1c)
}

function replaceClass(_0xb979x19, _0xb979x1a, _0xb979x1c) {
    var _0xb979x1e = _0xb979x1a;
    if (_0xb979x1c && _0xb979x1c['length']) {
        _0xb979x1c = _0xb979x1c['replace'](/\s+(\S)/g, '|$1');
        if (_0xb979x1e['length']) {
            _0xb979x1e += '|'
        };
        _0xb979x1e += _0xb979x1c;
    };
    _0xb979x19['className'] = _0xb979x19['className']['replace'](new RegExp('(^|\s+)(' + _0xb979x1e + ')($|\s+)', 'g'), '$1');
    _0xb979x19['className'] += ((_0xb979x19['className']['length']) ? ' ' : '') + _0xb979x1a;
}

function matchClass(_0xb979x19, _0xb979x1c) {
    return (_0xb979x19 && _0xb979x19['className']['length'] && _0xb979x19['className']['match'](new RegExp('(^|\s+)(' + _0xb979x1c + ')($|\s+)')))
}

function addEvent(_0xb979x21, _0xb979x22, _0xb979x23) {
    if (_0xb979x21['addEventListener']) {
        _0xb979x21['addEventListener'](_0xb979x22, _0xb979x23, false)
    } else {
        if (_0xb979x21['attachEvent']) {
            _0xb979x21['attachEvent']('on' + _0xb979x22, _0xb979x23)
        }
    }
}

function removeEvent(_0xb979x21, _0xb979x22, _0xb979x23) {
    if (_0xb979x21['removeEventListener']) {
        _0xb979x21['removeEventListener'](_0xb979x22, _0xb979x23, false)
    } else {
        if (_0xb979x21['detachEvent']) {
            _0xb979x21['detachEvent']('on' + _0xb979x22, _0xb979x23)
        }
    }
}

function getPageY(_0xb979x26) {
    var _0xb979x27 = _0xb979x26['offsetTop'];
    while (_0xb979x26['offsetParent'] != null) {
        _0xb979x26 = _0xb979x26['offsetParent'];
        _0xb979x27 += _0xb979x26['offsetTop'];
        if (_0xb979x26['tagName'] == 'BODY') {
            break
        };
    };
    return _0xb979x27;
}

function getPageX(_0xb979x26) {
    var _0xb979x29 = _0xb979x26['offsetLeft'];
    while (_0xb979x26['offsetParent'] != null) {
        _0xb979x26 = _0xb979x26['offsetParent'];
        _0xb979x29 += _0xb979x26['offsetLeft'];
        if (_0xb979x26['tagName'] == 'BODY') {
            break
        };
    };
    return _0xb979x29;
}

function getMousePosition(_0xb979xc) {
    if (_0xb979xc['pageX'] || _0xb979xc['pageY']) {
        var _0xb979x2b = _0xb979xc['pageX'];
        var _0xb979x2c = _0xb979xc['pageY'];
    } else {
        if (_0xb979xc['clientX'] || _0xb979xc['clientY']) {
            var _0xb979x2b = _0xb979xc['clientX'] + document['body']['scrollLeft'] + document['documentElement']['scrollLeft'];
            var _0xb979x2c = _0xb979xc['clientY'] + document['body']['scrollTop'] + document['documentElement']['scrollTop'];
        }
    };
    return {
        x: _0xb979x2b,
        y: _0xb979x2c
    };
}
