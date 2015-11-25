/**
 * Created by bruno on 23/11/15.
 */

require.config({
            paths: {
                "jquery": "tests/js/helpers/jquery",
                "jasmine": "tests/js/helpers/jasmine",
                "jasmine-html": "tests/js/helpers/jasmine-html",
                "boot":"tests/js/helpers/boot",
                "flight":"tests/js/helpers/flight"
            }
        });




require(["jquery","jasmine","jasmine-html","boot","flight"],
    //$,jasmine,jasmine_html,boot,flight
    function($,jasmine,jasmine_html,boot,flight){
//alert(getJasmineRequireObj())
        });
