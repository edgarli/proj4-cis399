
//author: heqian li cis 322 project4
//work with hedong meng
//date 10/22/2015
var URL = 'http://www.mapquestapi.com/geocoding/v1/reverse';
var KEY = 'dVqdHWrWCGvBTrPJmRvi5wGiEY0jQJOe';
var CENTER_LAT = 44.05778;
var CENTER_LNG = -123.10944;

function get_address_by_location(lat, lng, cb) {
    $.ajax({
        'url': URL + '?key=' + KEY + '&location=' + lat + ',' + lng,
        'type': 'get',
        'success': function(r) {
            var loc = r['results'][0]['locations'][0];
            cb(loc['street']);
        },
        'error': function(e) {
            console.log(e);
        },
    });
}

$(document).ready(function() {
    // Do the following when the page is finished loading
    var map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [CENTER_LAT, CENTER_LNG],
        zoom: 12,
    });
    map.on('click', function(e) {
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        var marker = L.marker([lat, lng]).addTo(map);
        get_address_by_location(lat, lng, function(addr) {
            marker.bindPopup("<b>Street:</b><br/>" + addr).openPopup();
        });
    });
});
