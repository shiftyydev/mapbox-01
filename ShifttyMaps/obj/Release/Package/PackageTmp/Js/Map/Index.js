var sourceslist;
var eventSource;
var Global_objectid;
var Global_serial_number;
var Global_date;
var Global_ctrlId;
var VehiclesData;
var OnLoadDate;
const size = 100;
$(function () {
    $('#txtDateFilter').datepicker({ dateFormat: 'yy-mm-dd' }); var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var NewDate = yyyy + '-' + mm + '-' + dd;
    OnLoadDate = NewDate;
    $('#txtDateFilter').datepicker('setDate', NewDate);
    BuildlegendsForParcels(NewDate);
});
this.$slideOut = $('#slideOut');
// Slideout show
this.$slideOut.find('.slideOutTab').on('click', function () {
    $("#slideOut").toggleClass('showSlideOut');
});
//mapboxgl.accessToken = 'pk.eyJ1IjoiZmZlajRvcmQiLCJhIjoiY2tsdDZ3ZzE3MjN1YjJvcXlvdnYwaTgwaSJ9.KDPbEz1s0vnJDa5ITRKsrQ';
mapboxgl.accessToken = 'pk.eyJ1IjoidHhlYXAiLCJhIjoiY2tmZWJiMzFwMDFzbzJ2b2tvbmFjdmFtayJ9.xPedByH9KnPT76-c2AG8fQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-96.8762766, 32.9565216],
    zoom: 12
});
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
$.widget("custom.autocompleteHighlight", $.ui.autocomplete, {
    _renderItem: function (ul, item) {
        return $('<li style="z-index:1100">' + item.label + '</li>').appendTo(ul);
    }
});
function OnLoadMaps() {
    map.loadImage(
        '../../Images/OfflineDot.gif',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('OfflineDot', image);
        }
    );
    map.loadImage(
        '../../Images/OnlineDot.gif',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('OnlineDot', image);
        }
    );
    map.loadImage(
        '../../Images/RouteStop.png',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('RouteStop', image);
        }
    );
    map.loadImage(
        '../../Images/marker.png',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('marker', image);
        }
    );
    map.loadImage(
        '../../Images/Stop.png',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('Stop', image);
        }
    );
    map.loadImage(
        '../../Images/TruckImage.png',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('live', image);
        }
    );
    map.loadImage(
        '../../Images/StillTruck.png',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('still', image);
        }
    );
    map.loadImage(
        '../../Images/E.png',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('E', image);
        }
    );
    map.loadImage(
        '../../Images/N.png',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('N', image);
        }
    );
    map.loadImage(
        '../../Images/NE.png',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('NE', image);
        }
    );
    map.loadImage(
        '../../Images/NW.png',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('NW', image);
        }
    );
    map.loadImage(
        '../../Images/S.png',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('S', image);
        }
    );
    map.loadImage(
        '../../Images/SE.png',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('SE', image);
        }
    );
    map.loadImage(
        '../../Images/SW.png',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('SW', image);
        }
    );
    map.loadImage(
        '../../Images/W.png',
        function (error, image) {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('W', image);
        }
    );
    map.getCanvas().style.cursor = 'pointer';
}
function switchLayer(layerId)
{
    sourceslist = map.getStyle().sources;
   
    if (map.hasImage('OfflineDot')) {
        map.removeImage('OfflineDot');
    }
    if (map.hasImage('OnlineDot')) {
        map.removeImage('OnlineDot');
    }
    if (map.hasImage('RouteStop')) {
        map.removeImage('RouteStop');
    }
    if (map.hasImage('marker')) {
        map.removeImage('marker');
    }
    if (map.hasImage('Stop')) {
        map.removeImage('Stop');
    }
    if (map.hasImage('live')) {
        map.removeImage('live');
    }
    if (map.hasImage('still')) {
        map.removeImage('still');
    }
    if (map.hasImage('E')) {
        map.removeImage('E');
    }
    if (map.hasImage('N')) {
        map.removeImage('N');
    }
    if (map.hasImage('NE')) {
        map.removeImage('NE');
    }
    if (map.hasImage('NW')) {
        map.removeImage('NW');
    }
    if (map.hasImage('S')) {
        map.removeImage('S');
    }
    if (map.hasImage('SE')) {
        map.removeImage('SE');
    }
    if (map.hasImage('SW')) {
        map.removeImage('SW');
    }
    if (map.hasImage('W')) {
        map.removeImage('W');
    }
    OnLoadMaps();
    map.setStyle(layerId);
    for (let i = 0; i < Object.keys(sourceslist).length; i++) {
        setTimeout(function () {
            if (Object.keys(sourceslist)[i].match(/route_.*/)) {
                debugger;
                var source = Object.keys(sourceslist)[i];
                const splittedArray = source.split("_");
                var layerName = "route_layer_" + splittedArray[2] + "_" + splittedArray[3];
                var SourceName = "route_source_" + splittedArray[2] + "_" + splittedArray[3];
                if (map.getLayer(layerName)) {
                    map.removeLayer(layerName);
                }
                if (map.getSource(SourceName)) {
                    map.removeSource(SourceName);
                }
                var geojsonData = sourceslist[SourceName].data;
                if (geojsonData["features"].length > 0) {
                    color = geojsonData.features[0].color;
                }
                map.addSource(SourceName, {
                    'type': 'geojson',
                    'data': geojsonData
                });
                map.addLayer({
                    'id': layerName,
                    'type': 'line',
                    'source': SourceName,
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#0394fc',
                        'line-width': 8
                    }
                });
            }
        }, i * 500);
    }
    for (let i = 0; i < Object.keys(sourceslist).length; i++) {
        setTimeout(function () {
            if (Object.keys(sourceslist)[i].match(/points_.*/)) {
                var source = Object.keys(sourceslist)[i];
                const splittedArray = source.split("_");
                var layerName = "points_layer_" + splittedArray[2] + "_" + splittedArray[3];
                var SourceName = "points_source_" + splittedArray[2] + "_" + splittedArray[3];
                if (map.getLayer(layerName)) {
                    map.removeLayer(layerName);
                }
                if (map.getSource(SourceName)) {
                    map.removeSource(SourceName);
                }
                var geojsonData = sourceslist[SourceName].data;
                map.addSource(SourceName, {
                    'type': 'geojson',
                    'data': geojsonData
                });
                map.addLayer({
                    id: layerName,
                    type: 'symbol',
                    source: SourceName,
                    filter: ['!', ['has', 'point_count']],
                    layout: {
                        "icon-image": ["match", ["get", "direction"],
                            ["N"], "N",
                            ["S"], "S",
                            ["E"], "E",
                            ["W"], "W",
                            ["SW"], "SW",
                            ["SE"], "SE",
                            ["NW"], "NW",
                            ["NE"], "NE",
                            ["RouteStop"], "RouteStop",
                            ""],
                        'icon-size': 0.03,
                        "icon-allow-overlap": true
                    }
                });
                map.on('click', layerName, function (e) {
                    var features = map.queryRenderedFeatures(e.point, {
                        layers: [layerName]
                    });
                    var latClick = e.lngLat["lat"];
                    var lngClick = e.lngLat["lng"];
                    var c = latClick + "," + lngClick;
                    var direction = features[0].properties.direction;
                    var speed = features[0].properties.speed;
                    var idling = features[0].properties.idling;
                    var time = features[0].properties.time;
                    $.ajax({
                        url: "https://revgeocode.search.hereapi.com/v1/revgeocode",
                        dataType: "json",
                        data: {
                            at: c,
                            language: "English",
                            apiKey: "Yz1ARROaW8ea690aQ2_0iwYEIjbQFtqHCsbcGV39ugA",
                        },
                        success: function (data) {
                            addressPopup = data.items[0];
                            addressPopup = addressPopup["title"];
                            var html = '<b>Direction :</b> ' + direction + '<br/>'
                            html += '<b>Address :</b> ' + addressPopup + '<br/>';
                            if (idling != undefined && idling != null && idling != '') {
                                html += '<b>Total Stop Time :</b> ' + idling + ' <b>Minutes</b> <br/>';
                            }
                            html += '<b>Time :</b> ' + time + '<br/>';
                            html += '<b>Speed :</b> ' + speed + '<br/>';
                            new mapboxgl.Popup({ closeOnClick: true })
                                .setLngLat([e.lngLat.lng, e.lngLat.lat])
                                .setHTML(html)
                                .addTo(map);

                        },
                        error: function (msg) { alert(msg); }
                    });

                });
            }
        }, i * 1000);
    }
    for (let i = 0; i < Object.keys(sourceslist).length; i++) {
        setTimeout(function () {
            if (Object.keys(sourceslist)[i].match(/lyrTrucks.*/)) {
                GetLiveTruckSingle(Global_objectid, Global_date, Global_ctrlId, false);
            }
        }, i * 500);
    }
}
map.on('load', function () {
    OnLoadMaps();
});
const pulsingDotRed = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // When the layer is added to the map,
    // get the rendering context for the map canvas.
    onAdd: function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

    // Call once before every frame where the icon will be used.
    render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;

        // Draw the outer circle.
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
        context.fill();

        // Draw the inner circle.
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        return true;
    }
};
const pulsingDotGreen = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // When the layer is added to the map,
    // get the rendering context for the map canvas.
    onAdd: function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

    // Call once before every frame where the icon will be used.
    render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;

        // Draw the outer circle.
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = `rgba(24, 107, 49, ${1 - t})`;
        context.fill();

        // Draw the inner circle.
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(24, 107, 49, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        return true;
    }
};
const pulsingDotBlue = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // When the layer is added to the map,
    // get the rendering context for the map canvas.
    onAdd: function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

    // Call once before every frame where the icon will be used.
    render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;

        // Draw the outer circle.
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = `rgba(200, 217, 255, ${1 - t})`;
        context.fill();

        // Draw the inner circle.
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(33, 41, 255, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        return true;
    }
};
const pulsingDotYellow = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // When the layer is added to the map,
    // get the rendering context for the map canvas.
    onAdd: function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

    // Call once before every frame where the icon will be used.
    render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;

        // Draw the outer circle.
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = `rgba(255, 228, 166, ${1 - t})`;
        context.fill();

        // Draw the inner circle.
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 225, 33, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        return true;
    }
};
map.on('style.load', () => {
    if (map.hasImage('pulsing-dotRed'))
    {
        map.removeImage('pulsing-dotRed');
    }
    if (map.hasImage('pulsing-dotGreen'))
    {
        map.removeImage('pulsing-dotGreen');
    }
    if (map.hasImage('pulsing-dotBlue'))
    {
        map.removeImage('pulsing-dotBlue');
    }
    if (map.hasImage('pulsing-dotYellown'))
    {
        map.removeImage('pulsing-dotYellow');
    }
    map.addImage('pulsing-dotRed', pulsingDotRed, { pixelRatio: 2 });
    map.addImage('pulsing-dotGreen', pulsingDotGreen, { pixelRatio: 2 });
    map.addImage('pulsing-dotBlue', pulsingDotBlue, { pixelRatio: 2 });
    map.addImage('pulsing-dotYellow', pulsingDotYellow, { pixelRatio: 2 });
});
function PointClick(e) {

    var layername = e.features[0]["layer"]["id"];
    debugger;
    var features = map.queryRenderedFeatures(e.point, {
        layers: [layername]
        //layers: ["points_layer_" + VehicleId + "_" + CountNumber]
    });
    var latClick = e.lngLat["lat"];
    var lngClick = e.lngLat["lng"];
    var c = latClick + "," + lngClick;
    var direction = features[0].properties.direction;
    var speed = features[0].properties.speed;
    var idling = features[0].properties.idling;
    var time = features[0].properties.time;
    var fuel_level = features[0].properties.fuel_level;
    $.ajax({
        url: "https://revgeocode.search.hereapi.com/v1/revgeocode",
        dataType: "json",
        data: {
            at: c,
            language: "English",
            apiKey: "Yz1ARROaW8ea690aQ2_0iwYEIjbQFtqHCsbcGV39ugA",
        },
        success: function (data) {
            addressPopup = data.items[0];
            addressPopup = addressPopup["title"];
            var html = '<b>Address :</b> ' + addressPopup + '<br/>';
             html += '<b>Direction :</b> ' + direction + '<br/>'
            html += '<b>Fuel Level :</b> ' + fuel_level + '<br/>';
            if (idling != undefined && idling != null && idling != '') {
                html += '<b>Total Stop Time :</b> ' + idling + ' <b>Minutes</b> <br/>';
            }
            html += '<b>Time :</b> ' + time + '<br/>';
            html += '<b>Speed :</b> ' + speed + '<br/>';
            new mapboxgl.Popup({ closeOnClick: true })
                .setLngLat([e.lngLat.lng, e.lngLat.lat])
                .setHTML(html)
                .addTo(map);

        },
        error: function (msg) { alert(msg); }
    });

}
function AddTelemeteryLayers(VehicleId, RouteData, PointData, CountNumber) {
   
    if (map.getLayer("route_layer_" + VehicleId + "_" + CountNumber)) {
        map.removeLayer("route_layer_" + VehicleId + "_" + CountNumber);
    }
    if (map.getSource("route_source_" + VehicleId + "_" + CountNumber)) {
        map.removeSource("route_source_" + VehicleId + "_" + CountNumber);
    }
    if (map.getLayer("points_layer_" + VehicleId + "_" + CountNumber)) {
        map.off('click', 'points_layer_' + VehicleId + "_" + CountNumber, PointClick);
        map.removeLayer("points_layer_" + VehicleId + "_" + CountNumber);
        }
    if (map.getSource("points_source_" + VehicleId + "_" + CountNumber)) {
        map.removeSource("points_source_" + VehicleId + "_" + CountNumber);
    }
    map.addSource("route_source_" + VehicleId + "_" + CountNumber, {
        'type': 'geojson',
        'data': RouteData
    });
    map.addLayer({
        'id': "route_layer_" + VehicleId + "_" + CountNumber,
        'type': 'line',
        'source': "route_source_" + VehicleId + "_" + CountNumber,
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#0394fc',
            'line-width': 8
        }
    });

    map.addSource("points_source_" + VehicleId + "_" + CountNumber, {
        'type': 'geojson',
        'data': PointData
    });
    map.addLayer({
        id: "points_layer_" + VehicleId + "_" + CountNumber,
        type: 'symbol',
        source: "points_source_" + VehicleId + "_" + CountNumber,
        filter: ['!', ['has', 'point_count']],
        layout: {
            "icon-image": ["match", ["get", "direction"],
                ["N"], "N",
                ["S"], "S",
                ["E"], "E",
                ["W"], "W",
                ["SW"], "SW",
                ["SE"], "SE",
                ["NW"], "NW",
                ["NE"], "NE",
                ["RouteStop"], "RouteStop",
                ""],
            'icon-size': 0.03,
            "icon-allow-overlap": true
        }
    });
    map.on('click', 'points_layer_' + VehicleId + "_" + CountNumber, PointClick);
    //map.on('click', "points_layer_" + VehicleId + "_" + CountNumber,);
   
}
function GetRoute(FromDate, name, objectId, id, api_key)
{
    var TimeSerial = ["1", "2", "3", "4", "5", "6", "7", "8"];
    var ArrFrom = [FromDate + "T00:00:00Z", FromDate + "T03:00:00Z", FromDate + "T06:00:00Z", FromDate + "T09:00:00Z", FromDate + "T12:00:00Z", FromDate + "T15:00:00Z", FromDate + "T18:00:00Z", FromDate + "T21:00:00Z"];
    var ArrTo = [FromDate + "T03:00:00Z", FromDate + "T06:00:00Z", FromDate + "T09:00:00Z", FromDate + "T12:00:00Z", FromDate + "T15:00:00Z", FromDate + "T18:00:00Z", FromDate + "T21:00:00Z", FromDate + "T23:59:59Z"];
    var IsChecked = $("#" + id).is(':checked');
    if (IsChecked == false) {
        $("#" + id).prop("checked", false);
        for (var i = 0; i < TimeSerial.length; i++) {

            if (map.getLayer("route_layer_" + objectId + "_" + TimeSerial[i])) {
                map.removeLayer("route_layer_" + objectId + "_" + TimeSerial[i]);
            }
            if (map.getSource("route_source_" + objectId + "_" + TimeSerial[i])) {
                map.removeSource("route_source_" + objectId + "_" + TimeSerial[i]);
            }
            if (map.getLayer("points_layer_" + objectId + "_" + TimeSerial[i])) {
                map.off('click', 'points_layer_' + objectId + "_" + TimeSerial[i], PointClick);
                map.removeLayer("points_layer_" + objectId + "_" + TimeSerial[i]);
            }
            if (map.getSource("points_source_" + objectId + "_" + TimeSerial[i])) {
                map.removeSource("points_source_" + objectId + "_" + TimeSerial[i]);
            }

        }
        return;
    }
    else {

        var CountSerial1 = 0;
        var CountSerial2 = 0;
        var CountSerial3 = 0;
        var CountSerial4 = 0;
        var CountSerial5 = 0;
        var CountSerial6 = 0;
        var CountSerial7 = 0;
        var CountSerial8 = 0;
        var loaderId = showLoader("Loading Data..", "warning");
        var Serial1 = $.ajax({
            type: "GET",
            url: "/Map/GetRouteSplited",
            data: {
                FromDate: ArrFrom[0],
                ToDate: ArrTo[0],
                VehicleId: objectId,
                name: name,
                api_key: api_key
            },
            success: function (res) {
                CountSerial1 = parseInt(res.Count);
                var RouteData = JSON.parse(res.JSONRoute);
                const PointData = JSON.parse(res.JSONPoints);
                AddTelemeteryLayers(objectId, RouteData, PointData, '1');

            },
            error: function (err) {
                swal(err.statusText, "Error", "error");
                jQuery('#loaderDiv').fadeOut(0);
            }
        });
        //Serial2
        var Serial2 = $.ajax({
            type: "GET",
            url: "/Map/GetRouteSplited",
            data: {
                FromDate: ArrFrom[1],
                ToDate: ArrTo[1],
                VehicleId: objectId,
                name: name,
                api_key: api_key
            },
            success: function (res) {
                CountSerial2 = parseInt(res.Count);
                var RouteData = JSON.parse(res.JSONRoute);
                const PointData = JSON.parse(res.JSONPoints);
                AddTelemeteryLayers(objectId, RouteData, PointData, '2');

            },
            error: function (err) {
                swal(err.statusText, "Error", "error");
                jQuery('#loaderDiv').fadeOut(0);
            }
        });
        //Serial3
        var Serial3 = $.ajax({
            type: "GET",
            url: "/Map/GetRouteSplited",
            data: {
                FromDate: ArrFrom[2],
                ToDate: ArrTo[2],
                VehicleId: objectId,
                name: name,
                api_key: api_key
            },
            success: function (res) {
                CountSerial3 = parseInt(res.Count);
                var RouteData = JSON.parse(res.JSONRoute);
                const PointData = JSON.parse(res.JSONPoints);
                AddTelemeteryLayers(objectId, RouteData, PointData, '3');
            },
            error: function (err) {
                swal(err.statusText, "Error", "error");
                jQuery('#loaderDiv').fadeOut(0);
            }
        });
        //Serial4
        var Serial4 = $.ajax({
            type: "GET",
            url: "/Map/GetRouteSplited",
            data: {
                FromDate: ArrFrom[3],
                ToDate: ArrTo[3],
                VehicleId: objectId,
                name: name,
                api_key: api_key
            },
            success: function (res) {

                CountSerial4 = parseInt(res.Count);
                var RouteData = JSON.parse(res.JSONRoute);
                const PointData = JSON.parse(res.JSONPoints);
                AddTelemeteryLayers(objectId, RouteData, PointData, '4');


            },
            error: function (err) {
                swal(err.statusText, "Error", "error");
                jQuery('#loaderDiv').fadeOut(0);
            }
        });
        //Serial5
        var Serial5 = $.ajax({
            type: "GET",
            url: "/Map/GetRouteSplited",
            data: {
                FromDate: ArrFrom[4],
                ToDate: ArrTo[4],
                VehicleId: objectId,
                name: name,
                api_key: api_key
            },
            success: function (res) {

                CountSerial5 = parseInt(res.Count);
                var RouteData = JSON.parse(res.JSONRoute);
                const PointData = JSON.parse(res.JSONPoints);
                AddTelemeteryLayers(objectId, RouteData, PointData, '5');
            },
            error: function (err) {
                swal(err.statusText, "Error", "error");
                jQuery('#loaderDiv').fadeOut(0);
            }
        });
        //Serial6
        var Serial6 = $.ajax({
            type: "GET",
            url: "/Map/GetRouteSplited",
            data: {
                FromDate: ArrFrom[5],
                ToDate: ArrTo[5],
                VehicleId: objectId,
                name: name,
                api_key: api_key
            },
            success: function (res) {

                CountSerial6 = parseInt(res.Count);
                var RouteData = JSON.parse(res.JSONRoute);
                const PointData = JSON.parse(res.JSONPoints);
                AddTelemeteryLayers(objectId, RouteData, PointData, '6');
            },
            error: function (err) {
                swal(err.statusText, "Error", "error");
                jQuery('#loaderDiv').fadeOut(0);
            }
        });
        //Serial7
        var Serial7 = $.ajax({
            type: "GET",
            url: "/Map/GetRouteSplited",
            data: {
                FromDate: ArrFrom[6],
                ToDate: ArrTo[6],
                VehicleId: objectId,
                name: name,
                api_key: api_key
            },
            success: function (res) {
                CountSerial7 = parseInt(res.Count);
                var RouteData = JSON.parse(res.JSONRoute);
                const PointData = JSON.parse(res.JSONPoints);
                AddTelemeteryLayers(objectId, RouteData, PointData, '7');

            },
            error: function (err) {
                swal(err.statusText, "Error", "error");
                jQuery('#loaderDiv').fadeOut(0);
            }
        });
        //Serial8
        var Serial8 = $.ajax({
            type: "GET",
            url: "/Map/GetRouteSplited",
            data: {
                FromDate: ArrFrom[7],
                ToDate: ArrTo[7],
                VehicleId: objectId,
                name: name,
                api_key: api_key
            },
            success: function (res) {

                CountSerial8 = parseInt(res.Count);
                var RouteData = JSON.parse(res.JSONRoute);
                const PointData = JSON.parse(res.JSONPoints);
                AddTelemeteryLayers(objectId, RouteData, PointData, '8');
            },
            error: function (err) {
                swal(err.statusText, "Error", "error");
                jQuery('#loaderDiv').fadeOut(0);
            }
        });
        $.when(Serial1, Serial2, Serial3, Serial4, Serial5, Serial6, Serial7, Serial8).always(function () {
            var Total = parseInt(CountSerial1) + parseInt(CountSerial2) + parseInt(CountSerial3) + parseInt(CountSerial4) + parseInt(CountSerial5) + parseInt(CountSerial6) + parseInt(CountSerial7) + parseInt(CountSerial8);
            if (Total == 0) {
                swal("No Record Found", "For " + name + " in Date " + FromDate, "warning");
            }
            hideLoader(loaderId);
        });
    }
}
$('#txtDateFilter').change(function () {
    sourceslist = map.getStyle().sources;
    for (let i = 0; i < Object.keys(sourceslist).length; i++) {
        if (Object.keys(sourceslist)[i].match(/route_.*/)) {
            debugger;
            var source = Object.keys(sourceslist)[i];
            const splittedArray = source.split("_");
            var layerName = "route_layer_" + splittedArray[2] + "_" + splittedArray[3];
            var SourceName = "route_source_" + splittedArray[2] + "_" + splittedArray[3];
            if (map.getLayer(layerName)) {
                map.removeLayer(layerName);
            }
            if (map.getSource(SourceName)) {
                map.removeSource(SourceName);
            }
        }
    }
    for (let i = 0; i < Object.keys(sourceslist).length; i++) {
        if (Object.keys(sourceslist)[i].match(/points_.*/)) {
            var source = Object.keys(sourceslist)[i];
            const splittedArray = source.split("_");
            var layerName = "points_layer_" + splittedArray[2] + "_" + splittedArray[3];
            var SourceName = "points_source_" + splittedArray[2] + "_" + splittedArray[3];
            if (map.getLayer(layerName)) {
                map.removeLayer(layerName);
            }
            if (map.getSource(SourceName)) {
                map.removeSource(SourceName);
            }
        }
    }
    for (let i = 0; i < Object.keys(sourceslist).length; i++) {
        if (Object.keys(sourceslist)[i].match(/lyrTrucks.*/)) {
            debugger;
            var source = Object.keys(sourceslist)[i];
            if (map.getLayer(source)) {
                map.removeLayer(source);
            }
            if (map.getSource(source)) {
                map.removeSource(source);
            }
        }
    }
    var date = $('#txtDateFilter').val();
    BuildlegendsForParcels(date);
});
function BuildlegendsForParcels(date)
{
    var x = document.getElementById("legend");
    x.style.display = "none";
    document.getElementById("legend").innerHTML = "";
    if (true) {
        $.ajax({
            type: "POST",
            url: "/Map/getVehiclesForLegends",
            data: {
              
            },
            success: function (res) {
                var dataVehicles = JSON.parse(res["JSONVehicles"]);
                VehiclesData = dataVehicles
                for (var k = 0; k < dataVehicles.length; k++) {
                    x.style.display = "block";
                    var vehicle_name = dataVehicles[k]["name"];
                    var shiffty_object_id = dataVehicles[k]["vehicle_id"];
                    var api_key = dataVehicles[k]["api_key"];
                    if (vehicle_name != '')
                    {
                        var item = document.createElement('div');
                        item.setAttribute("class", "clearfix");
                        var key = document.createElement('span');
                        key.className = 'legend-key';
                        key.style.backgroundColor = '#0394fc';
                        key.style.opacity = 1;
                        var params = "'" + date + "','" + vehicle_name + "','" + shiffty_object_id + "',this.id,'" + api_key+"'";
                        var liveParams = "'" + shiffty_object_id + "','" + date + "',this.id,true,'" + api_key +"'";
                        var html_switch = '&nbsp;&nbsp;<label class="switch"  data-toggle="tooltip" data-placement="top" title="Telemetery" ><input class="chkRoutes" value="' + vehicle_name + '" name ="' + vehicle_name + '"   id="' + shiffty_object_id + '"  type="checkbox"  onchange="GetRoute(' + params + ')"><span class="slider round"></span></label>';
                        var html_Classification = '';
                        if (date == OnLoadDate)
                        {
                            html_Classification += '&nbsp;&nbsp;<img  data-toggle="tooltip" data-placement="top" title="Truck Location" src = "../../Images/LiveLocation.png" height = "20" width = "20"  style="cursor:pointer" id="imgBtnLiveLocation' + vehicle_name + '" onclick=GetLiveTruckSingle(' + liveParams + ') />';
                        }
                        vehicle_name = vehicle_name + '<span style="float: right;">' + html_switch + html_Classification  + '</span>';
                        var value = document.createElement('span');
                        value.innerHTML = vehicle_name;
                        item.appendChild(key);
                        item.appendChild(value);
                        legend.appendChild(item);
                    }
                }
                
            },
            error: function (err) {
                autoLoader(err.statusText, "error", "Error !");
            }
        });
    }

}
var GlobalLiveLocation = [];
function GetLiveTruckSingle(objectid, date, ctrlId, btnClick, api_key_param) {
    sourceslist = map.getStyle().sources;
    Global_objectid = objectid;
    Global_serial_number = objectid;
    Global_date = date;
    Global_ctrlId = ctrlId;
    for (let i = 0; i < Object.keys(sourceslist).length; i++) {
        if (Object.keys(sourceslist)[i].match(/lyrTrucks.*/)) {
            debugger;
            var source = Object.keys(sourceslist)[i];
            if (map.getLayer(source)) {
                map.removeLayer(source);
            }
            if (map.getSource(source)) {
                map.removeSource(source);
            }
        }
    }
    if (eventSource != undefined) {
        eventSource.close();
    }
    if (btnClick == true)
    {
        var image = document.getElementById(ctrlId);
        var imageCurrent = '';
        var url = '';
        const myArray = image.src.split("/");
        for (var i = 0; i < myArray.length - 1; i++) {
            url += myArray[i] + '/';
        }
        for (var k = 0; k < VehiclesData.length; k++) {
            var ctId = "imgBtnLiveLocation" + VehiclesData[k]["name"];
            var id = document.getElementById(ctId);
            if (id != null) {
                id.src = url + "LiveLocation.png";
            }
        }
        if (myArray.length > 0) {
            imageCurrent = myArray[myArray.length - 1];
        }
        if (imageCurrent == "LiveLocation.png") {
            image.src = url + "StopLiveLocation.png";
        }
        else {
            image.src = url + "LiveLocation.png";
            return;
        }
    }
    GlobalshiftyId = objectid;
    const apikey = api_key_param;//"Zlj5pAw8n4De5Edfzsb5EzEiyrpzoIJv";

    const API_url = "https://gps-api.shiftyy.com/object-coordinates-stream?version=2&object_id=" + objectid + "&api_key=" + apikey;

    eventSource = new EventSource(API_url);
    eventSource.onopen = () => {
    }
    eventSource.onmessage = (event) => {
        console.log(event.data);
        const message = JSON.parse(event.data);
        GlobalLat = message.position.latitude;
        GlobalLng = message.position.longitude;
        var obj = {
            ["id"]: message.object_id,
            ["ignition_status"]: message.ignition_status,
            ["latitude"]: message.position.latitude,
            ["longitude"]: message.position.longitude,
            ["movement"]: message.inputs.device_inputs.movement

        }
        const pos = GlobalLiveLocation.findIndex(el => el.id === message.object_id);
        if (pos >= 0)
        {
            GlobalLiveLocation.splice(pos, 1);
        }
        GlobalLiveLocation.push(obj);
        if (message.position.longitude != null) {
            if (message.ignition_status == "OFF")
            {
                addLayerLiveNewGreenBlink(message.object_id, message.position.latitude, message.position.longitude, 'pulsing-dotBlue')

            }
            if (message.inputs.device_inputs.movement == "STILL")
            {
                addLayerLiveNewGreenBlink(message.object_id, message.position.latitude, message.position.longitude, 'pulsing-dotYellow')

            }
            if (message.inputs.device_inputs.movement == "MOVING")
            {
                addLayerLiveNewGreenBlink(message.object_id, message.position.latitude, message.position.longitude, 'pulsing-dotGreen')

            }
        }
        //else {
        //    var chk = GlobalLiveLocation.filter(function (obj) {
        //        return obj.id == id;
        //    });
        //    if (chk.length > 0) {
        //        var id = chk[0].id;
        //        var latitude = chk[0].latitude;
        //        var longitude = chk[0].longitude;
        //        addLayerLiveNewGreenBlink(id, latitude, longitude, 'pulsing-dotRed');
        //    }
        //}
    }
    eventSource.onerror = (error) => {
        var urlFetch = error.srcElement.url;
        const myArray = urlFetch.split("object_id=");
        var tempString = myArray[1];
        const myArrayURL = tempString.split("&api_key=");
        var id = myArrayURL[0];
        var chk = GlobalLiveLocation.filter(function (obj) {
            return obj.id == id;
        });
        if (chk.length > 0) {
            var id = chk[0].id;
            var latitude = chk[0].latitude;
            var longitude = chk[0].longitude;
            addLayerLiveNewGreenBlink(id, latitude, longitude, 'pulsing-dotBlue');
        }
        else
        {
            addLayerLiveNewGreenBlink(id, 32.95595, -96.876995, 'pulsing-dotBlue');
        }
      
    }

}
function addLayerLiveNewGreenBlink(object, lat, lng, iconName)
{
    const popupAddress = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
    function mouseenterLive(e) {
        
            map.getCanvas().style.cursor = 'pointer';
            var cLat = e.lngLat["lat"];
            var cLng = e.lngLat["lng"];
            $.ajax({
                method: "GET",
                url: "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + cLat + "&lon=" + cLng,
                dataType: "json",
                beforeSend: function (xhr) {
                    // map.spin(true);
                }
            }).done(function (data) {
                debugger;
                var address = data.address["road"] + "," + data.address["county"] + "," + data.address["state"] + "," + data.address["postcode"] + "," + data.address["country"];
                var htmlPopup = '<b>Address :</b> ' + address + '<br/>';
                popupAddress.setLngLat([cLng, cLat]).setHTML(htmlPopup).addTo(map);
            });
        }
    function mouseleaveLive(e) {
        map.getCanvas().style.cursor = '';
        popupAddress.remove();
    }
    if (map.getSource("lyrTrucks" + object))
    {
        map.off('mouseenter', 'lyrTrucks' + object, mouseenterLive);
        map.off('mouseleave', 'lyrTrucks' + object, mouseleaveLive);
        map.removeLayer('lyrTrucks' + object);
        map.removeSource('lyrTrucks' + object);
    }
    map.addSource('lyrTrucks' + object, {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [
                            lng, lat
                        ]
                    },
                    'properties': {
                        'object': object
                    }
                }
            ]
        }
    });
    // Add a symbol layer
    map.addLayer({
        'id': 'lyrTrucks' + object,
        'type': 'symbol',
        'source': 'lyrTrucks' + object,
        'layout': {
            'icon-image': iconName//,
            //'icon-size': 0.07,
            //"icon-allow-overlap": true
        }
    });
   
    map.on('mouseenter', 'lyrTrucks' + object, mouseenterLive);
    map.on('mouseleave', 'lyrTrucks' + object, mouseleaveLive);
    //map.on('mouseenter', 'lyrTrucks' + object, function () {
    //    map.getCanvas().style.cursor = 'pointer';
    //});
    //map.on('mouseleave', 'lyrTrucks' + object, function () {
    //    map.getCanvas().style.cursor = '';
    //});
}
setTimeout(function () {
    GetLiveTruckSingle('c48d2a62-52b4-11eb-8dcd-6fd375e1d7de', '2022-4-21', 'imgBtnLiveLocationDAL1-137428-DX20741', true, "Zlj5pAw8n4De5Edfzsb5EzEiyrpzoIJv");
},5000);

