"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GoogleMapApi = /*#__PURE__*/function () {
  // init(){
  //     console.log('google map init')
  //     // const form = document.querySelector('form[name="place_search"]')
  //     // form.addEventListener('submit', this.handlePlaceSearch)
  // }
  function GoogleMapApi() {
    var _this = this;

    _classCallCheck(this, GoogleMapApi);

    _defineProperty(this, "API_KEY", 'AIzaSyBN8YgsGRhmpj0vSQlLl5EViZa3MGbrjr8');

    _defineProperty(this, "marker", []);

    _defineProperty(this, "handleMapCenterRequest", function (evt) {
      console.log(evt);

      var mapCenter = _this.map.getCenter();

      console.log('please be center');
      var responseInfo = {
        center: mapCenter
      };
      console.log(responseInfo);
      var responseEvent = new CustomEvent('get-map-center-response', {
        detail: responseInfo
      });
      document.dispatchEvent(responseEvent);
    });

    _defineProperty(this, "handlePlaceSearch", function (evt) {
      evt.preventDefault();
      console.log('handle place search ok');
      var placeName = document.querySelector('#place').value;
      var placeRequest = {
        location: _this.map.getCenter(),
        radius: 50,
        query: placeName,
        fields: ['formatted_phone_number']
      };
      _this.service = new google.maps.places.PlacesService(_this.map);

      _this.service.textSearch(placeRequest, _this.handlePlaceResults);
    });

    _defineProperty(this, "handlePlaceResults", function (results, status) {
      console.log('handle result search ok');

      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('got results', results);

        _this.clearMarkers();

        results.forEach(function (result) {
          _this.createMarker({
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
            title: result.name
          });
        });

        for (var i = 0; i < results.length; i++) {
          var business = results[i];
          var lat = business.geometry.location.lat();
          var lng = business.geometry.location.lng();
          var position = {
            lat: lat,
            lng: lng
          };
          var name = business.name;
          var address = business.formatted_address; // const hours = business.opening_hours.isOpen(name); // hours?
          // phone#
          // const number = business.getPhoneNumber();

          var number = business.formatted_phone_number;
          var icon = business.icon;
          var image = business.photos[0].getUrl();
          var rating = business.rating;
          var url = business.photos[0].html_attributions; // list item

          var businessItemEl = document.createElement('div');
          businessItemEl.setAttribute('class', 'business-item');
          listContainer.appendChild(businessItemEl);
          console.log('businessitemcreated'); // Name

          var nameEl = document.createElement('h2'); // businessItemEl.setAttribute('class', 'name-item');

          businessItemEl.appendChild(nameEl);
          nameEl.textContent = name; // address

          var addressEl = document.createElement('p'); // listContainer.setAttribute('class', 'address-p');

          listContainer.appendChild(addressEl);
          addressEl.textContent = address; //image works

          var imageEl = document.createElement('img');
          businessItemEl.appendChild(imageEl);
          imageEl.setAttribute('src', image); //rating

          var ratingEl = document.createElement('p');
          businessItemEl.appendChild(ratingEl);
          ratingEl.textContent = rating + "/5";

          _this.createMarker({
            lat: business.geometry.location.lat(),
            lng: business.geometry.location.lng(),
            map: _this.map,
            title: 'the circus',
            windowContent: "<div><img src=".concat(business.icon, " atl=\"\" width=\"20px\" height=\"20px\"></div>\n                    <div>\n                    <h3>").concat(business.name, "</h3>\n                    <p>").concat(business.formatted_address, "</p>\n                    \n                    <img src=").concat(business.photos[0].getUrl(), " atl=\" width=\"50px\" height=\"50px\">\n                    <p> rating: ").concat(business.rating, "/5</p>\n                    </div> ")
          }); // const marker = new google.maps.Marker({
          //     position: position,
          //     map: this.map,
          //     title: 'the circus',
          //     // label: 'the creative circus',
          //     // draggable: true,
          // });
          // const infoWindowContent = `<div><img src=${business.icon} atl="" width="20px" height="20px"></div>
          //                             <div>
          //                             <h3>${business.name}</h3>
          //                             <p>${business.formatted_address}</p>
          //                             <img src=${business.photos[0].getUrl()} atl=" width="50px" height="50px">
          //                             <p> rating: ${business.rating}/5</p>
          //                             </div> `
          // const infoWindow = new google.maps.InfoWindow({
          //  content: infoWindowContent,
          // })
          // marker.addListener('click', () => {
          //     infoWindow.open(this.map, marker)
          //    })

        }
      }
    });

    _defineProperty(this, "handleMarker", function (evt) {
      var markerInfo = evt.detail;

      _this.createMarker(markerInfo);
    });

    _defineProperty(this, "handleMarkers", function (evt) {
      console.log(evt.detail);
    });

    console.log('google map loaded');
    this.setupListener();
  }

  _createClass(GoogleMapApi, [{
    key: "setupListener",
    value: function setupListener() {
      document.addEventListener('get-map-center', this.handleMapCenterRequest);
      document.addEventListener('business-search', this.handleMarkers);
      document.addEventListener('add-marker', this.handleMarker);
    }
  }, {
    key: "createMarker",
    value: function createMarker(options) {
      var _this2 = this;

      var marker = new google.maps.Marker({
        position: {
          lat: options.lat,
          lng: options.lng
        },
        map: this.map,
        title: options.title,
        icon: options.icon
      });
      var infoWindowContent = options.windowContent;

      if (!this.infoWindow) {
        this.infoWindow = new google.maps.InfoWindow();
      } // const infoWindow = new google.maps.InfoWindow({
      //  content: infoWindowContent,
      // })


      marker.addListener('click', function () {
        // infoWindow.open(this.map, marker)
        _this2.infoWindow.setContent(infoWindowContent);

        _this2.infoWindow.open(_this2.map, marker);

        var reviewEvent = new CustomEvent('review-search', {
          detail: options.businessId
        });
        document.dispatchEvent(reviewEvent);
      });
      this.marker.push(marker);
    }
  }, {
    key: "clearMarkers",
    value: function clearMarkers() {
      this.marker.forEach(function (marker) {
        marker.setMap(null);
      });
      this.marker = [];
    }
  }, {
    key: "ready",
    value: function ready() {
      console.log('map is ready');
      var theCircus = {
        lat: 33.81328,
        lng: -84.36175
      };
      var mapOptions = {
        center: theCircus,
        zoom: 15
      };
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var image = "/dist/img/tent.png";
      this.createMarker({
        lat: theCircus.lat,
        lng: theCircus.lng,
        title: ' The circus',
        icon: image,
        windowContent: "<div><h2>Join the Circus!!</h2><p> A place where you leave your worries behind and make new stress factors</p></div>"
      });
      var mapReadyEvent = new CustomEvent('map-ready');
      document.dispatchEvent(mapReadyEvent);
    }
  }]);

  return GoogleMapApi;
}();

window.gMap = new GoogleMapApi(); // window.gMap.init();
//# sourceMappingURL=maps.js.map
