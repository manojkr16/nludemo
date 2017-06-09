// generateMapView();

function generateMapView() {
    addCommentsbar();

    $('body #commentsIndex').html("");
    //$('#sidenavModified').html(trending);
    d3v3.select('.selected').html(treasury);
    d3v3.select('.notselected1').html(churn);
    d3v3.select('.notselected2').html(cross_sell);
    $('#page-wrapper').html("");
    $("#page-wrapper").append('<div class="row map"> \
	   <div id="map" style="width: 912px; height: 780px; margin-top: 20px; background: #fff;"><div style="width: 456px;height: 100px;opacity: 0.2;font-size: 64px;letter-spacing: -3px;margin-left: 5%;font-weight: 500;text-align: left;color: #3d4351;">Opportunity</div>\
	</div></div>');

    var center = [22.4, 78.9629];
    map = new L.Map('map', {
        zoomControl: false,
        center: new L.LatLng(center[0], center[1]),
        zoom: 4.5
    });

    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();

    if (map.tap) map.tap.disable();
	var polyPoints=[];

    document.getElementById('map').style.cursor = 'default';

    $.getJSON("../assets/india.json", function(json) {
        L.geoJSON(json, {
            style: function(feature) {
                return {
                    color: "#ccc",
                    opacity: "0.4",
                    stroke: "2px"
                };
            }
		}).addTo(map);

       	generateData();
    });

    var options = {
        radius: 12,
        opacity: 0.5,
        duration: 500,
        lng: function(d) {
            return d[0];
        },
        lat: function(d) {
            return d[1];
        },
        value: function(d) {
            return 3;
        },
        valueFloor: 1,
        valueCeil: undefined
    };

    // function isMarkerInsidePolygon(marker) {
    //     var x = marker[0],
    //         y = marker[1];

    //     var inside = false;
    //     for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
    //         var xi = polyPoints[i][0],
    //             yi = polyPoints[i][1];
    //         var xj = polyPoints[j][0],
    //             yj = polyPoints[j][1];

    //         var intersect = ((yi > y) != (yj > y)) &&
    //             (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    //         if (intersect) inside = !inside;
    //     }

    //     return inside;
    // };

    var hexLayer = L.hexbinLayer(options).addTo(map)
    hexLayer.colorScale().range(["#920029", "#d36e1f", "#f4760a"]);

    function checkSanity (a) {
        if (!a)
            return false;
        if (a.constructor === Array)
            return true;
        return false;
    }

    var img1 = L.icon({
        iconUrl: '../images/img-1.png',
        iconSize: [144, 144]
    });

    L.marker([21.049540, 76.532028], {icon: img1}).addTo(map);

    var img2 = L.icon({
        iconUrl: '../images/img-2.png',
        iconSize: [144, 144]
    });

    L.marker([18.245655, 76.505356], {icon: img2}).addTo(map);

    var img3 = L.icon({
        iconUrl: '../images/img-3.png',
        iconSize: [144, 144]
    });

    L.marker([19.853060, 74.000633], {icon: img3}).addTo(map);

    $('.leaflet-marker-icon').click(openMenu);
    
    var generateData = function() {
        $.post(baseApiUrl + "search", {"search": "What have been the product trends for ABFL by state in the last 12 months?"}, function(data, textStatus) {
            var ndata = data.rows.filter(checkSanity).map(function(a) { return [a[1], a[0]]});
            hexLayer.data(ndata);
        }, "json");
    };
}