window.onerror = function handler(msg, file, line, col, err) {
    if (!window.JSON || handler.count > 5) { return; }

    var counterId = 12345, // Ваш номер счётчика Метрики.
        siteInfo = {},
        pointer = siteInfo,
        stack = err && err.stack,
        path = [
            // Укажите в регулярном выражении домены, с которых загружается ваш сайт и скрипты.
            'JS ' + (!filename || /mysite\.ru|cdn\.com/.test(filename) ? 'in' : 'ex') + 'ternal errors',
            'message: ' + msg,
            stack ?
                'stack: ' + stack :
                (filename ? 'filename: ' + filename + ':' + line + ':' + column : 'nofilename'),
            'href: ' + location.href
        ];

    for (var i = 0; i < path.length - 1; i++) {
        var item = path[i];
        pointer[item] = {};
        pointer = pointer[item];
    }

    pointer[path[i]] = 1;

    var url = 'https://mc.yandex.ru/watch/' + id + '/' +
            '?site-info=' + encodeURIComponent(JSON.stringify(siteInfo)) +
            '&rn=' + Math.random();

    if (typeof navigator.sendBeacon === 'function') {
        navigator.sendBeacon(url, ' ');
    } else {
        new Image().src = url;
    }

    if (handler.count) {
        handler.count++;
    } else {
        handler.count = 1;
    }
};