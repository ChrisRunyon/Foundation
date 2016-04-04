function requireConfig(options) {

    var basePath;

    options   = options || {};
    basePath  = options.basePath || 'js';

    var config = {

        urlArgs: 'r=' + (new Date()).getTime(),
        baseUrl: basePath,
        findNestedDependencies: true,
        wrapShim: true,
        waitSeconds: 0,

        paths: {
            'jquery': 'libraries/jquery',
            'jquery-ui': 'libraries/jquery/jquery-ui',
            'handlebars': 'libraries/handlebars',
            'backbone': 'libraries/backbone-1.2.3',
            'underscore': 'libraries/underscore-1.8.3',
            'text': 'libraries/text',
            'router': 'controller/router',
            /* Foundation */
            'foundation.core': 'libraries/foundation',
            "foundation.abide": 'libraries/foundation.abide',
            "foundation.accordion": 'libraries/foundation.accordion',
            "foundation.alert": 'libraries/foundation.alert',
            "foundation.clearing": 'libraries/foundation.clearing',
            "foundation.dropdown": 'libraries/foundation.dropdown',
            "foundation.equalizer": 'libraries/foundation.equalizer',
            "foundation.interchange": 'libraries/foundation.interchange',
            "foundation.magellan": 'libraries/foundation.magellan',
            "foundation.offcanvas": 'libraries/foundation.offcanvas',
            "foundation.orbit": 'libraries/foundation.orbit',
            "foundation.reveal": 'libraries/foundation.reveal',
            "foundation.slider": 'libraries/foundation.slider',
            "foundation.tab": 'libraries/foundation.tab',
            "foundation.toolbar": 'libraries/foundation.toolbar',
            "foundation.topbar": 'libraries/foundation.topbar',
        },

        shim: {
            'jquery': { exports: '$' },
            'handlebars': { exports: 'Handlebars' },
            'backbone': { deps: ['underscore', 'jquery'], exports: 'Backbone' },
            'underscore': { exports: '_' },
            'text': { exports: 'HTML' },
            'router': { exports: 'Router' },
            /* Foundation */
            'foundation.core': { deps: ['jquery'], exports: 'Foundation' },
            'foundation.abide': { deps: ['foundation.core'] },
            'foundation.accordion': { deps: ['foundation.core'] },
            'foundation.alert': { deps: ['foundation.core']},
            'foundation.clearing': { deps: ['foundation.core'] },
            'foundation.dropdown': { deps: ['foundation.core'] },
            'foundation.equalizer': { deps: ['foundation.core'] },
            'foundation.interchange': { deps: ['foundation.core'] },
            'foundation.magellan': { deps: ['foundation.core'] },
            'foundation.offcanvas': { deps: ['foundation.core'] },
            'foundation.orbit': {deps: ['foundation.core'] },
            'foundation.reveal': { deps: ['foundation.core'] },
            'foundation.tab': { deps: ['foundation.core'] },
            'foundation.tooltip': { deps: ['foundation.core'] },
            'foundation.topbar': { deps: ['foundation.core'] }
        }
    };

     // add RequireJS config
    require.config(config);

    // handle RequireJS loading errors
    requirejs.onError = function (err) {
        console.error('RequireJS Error: ' + err.requireType + ' : ' + JSON.stringify(err.requireModules));
    };
}