"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// console.log(` 
// Change this message, and make sure it changes in the browser 
// to verify that you're working in the right files.`)
var Main = /*#__PURE__*/function () {
  function Main() {
    var _this = this;

    _classCallCheck(this, Main);

    _defineProperty(this, "handleMapCenterResponse", function (evt) {
      var responseInfo = evt.detail;
      console.log(evt);
      _this.mapCenter = responseInfo.center;
    });

    _defineProperty(this, "handleSearch", function (evt) {
      evt.preventDefault();
      console.log(evt.detail);
      var query = evt.target.querySelector('input[name="place"]').value;
      console.log('query', query, _this.mapCenter);
      var searchInfo = {
        query: query,
        latitude: _this.mapCenter.lat(),
        longitude: _this.mapCenter.lng()
      };
      var searchEvent = new CustomEvent('business-search', {
        detail: searchInfo
      });
      document.dispatchEvent(searchEvent);
      var giphyEvent = new CustomEvent('giphy-search', {
        detail: query
      });
      document.dispatchEvent(giphyEvent); //clear markers

      var clearMarkers = new CustomEvent('clear-markers');
      document.dispatchEvent(clearMarkers);
    });

    _defineProperty(this, "handleResults", function (evt) {
      var results = evt.detail.results;
      console.log(results); //parent container

      var articleContainer = document.createElement('div');
      articleContainer.setAttribute('class', 'business-Container');
      var classResults = document.querySelector('.classResults');
      classResults.appendChild(articleContainer); //loop for businesses

      for (var i = 0; i < results.length; i++) {
        var business = results[i];
        var name = business.name;
        var photo = business.image_url;
        var price = business.price;
        var rating = business.rating;
        var transactionType = business.transactions;
        var id = business.id; //    // Business Item

        var businessItemEl = document.createElement('div');
        businessItemEl.setAttribute('class', 'business-item'); //    //Name

        var nameEl = document.createElement('h2');
        businessItemEl.appendChild(nameEl);
        nameEl.textContent = name; //location 

        var location = business.location.display_address;
        var locationEl = document.createElement('h3');
        businessItemEl.appendChild(locationEl);
        locationEl.textContent = location; //image 

        var photoEl = document.createElement('img');
        businessItemEl.appendChild(photoEl);
        photoEl.setAttribute('src', photo); //categories

        var category = business.categories;
        var categoryEl = document.createElement('h4');
        businessItemEl.appendChild(categoryEl);
        categoryEl.textContent = category.map(function (cat) {
          return cat.title;
        }).join('\n');
        businessItemEl.appendChild(categoryEl); //price

        var priceEL = document.createElement('p');
        priceEL.setAttribute('class', 'dollar-sign-price');
        businessItemEl.appendChild(priceEL);
        priceEL.textContent = price; //rating

        var ratingEl = document.createElement('p');
        ratingEl.setAttribute('class', 'rating');
        businessItemEl.appendChild(ratingEl);
        ratingEl.textContent = rating + '????'; //transaction

        var transactionEL = document.createElement('p');
        transactionEL.setAttribute('class', 'transaction_type');
        businessItemEl.appendChild(transactionEL);
        transactionEL.textContent = transactionType;
        var markerInfo = {
          lat: business.coordinates.latitude,
          lng: business.coordinates.longitude,
          title: business.name,
          windowContent: businessItemEl.innerHTML,
          businessId: id // windowContent: `<h2>${business.name}</h2><h2>${business.image_url}</h2>`

        };
        var searchEvent = new CustomEvent('add-marker', {
          detail: markerInfo
        });
        document.dispatchEvent(searchEvent); //Giphy
      }
    });

    _defineProperty(this, "handleGifResults", function (evt) {
      var results = evt.detail;
      var gifContainerParagraph = document.querySelector('p.gifs-go-here');
      gifContainerParagraph.innerHTML = '';

      for (var i = 0; i < 3; i++) {
        // console.log('loop', i)
        var newGifImage = document.createElement('img');
        newGifImage.src = results[i].images.fixed_height.url;
        newGifImage.classList.add('gif');
        gifContainerParagraph.appendChild(newGifImage);
      }
    });

    _defineProperty(this, "handleYelpReviewResults", function (evt) {
      var reviews = evt.detail.results;
      console.log('got reviews', reviews);
      var apiContainer = document.querySelector('.api-container');
      var reviewContainer = document.querySelector('.review-container');
      reviewContainer.innerHTML = '';

      for (var i = 0; i < reviews.length; i++) {
        console.log('got a name');
        var review = reviews[i];
        var name = review.user.name;
        var userImage = review.user.image_url;
        var rating = review.rating;
        var text = review.text;
        var url = review.url;
        var reviewEl = document.createElement('div');
        reviewEl.setAttribute('class', 'review');
        reviewContainer.appendChild(reviewEl);
        var titleEl = document.createElement('p');
        titleEl.setAttribute('class', 'tags');
        titleEl.innerHTML = "Review";
        reviewContainer.appendChild(titleEl);
        var reviewHeader = document.createElement('div');
        reviewHeader.setAttribute('class', 'review-header'); //name

        var nameEl = document.createElement('h2');
        nameEl.setAttribute('class', 'name');
        reviewHeader.appendChild(nameEl);
        reviewEl.appendChild(reviewHeader);
        nameEl.textContent = name; //image

        var imageEl = document.createElement('img');
        imageEl.setAttribute('src', userImage);
        reviewHeader.appendChild(imageEl);
        reviewEl.appendChild(reviewHeader); // rating

        var ratingEl = document.createElement('p');
        ratingEl.setAttribute('class', 'rating');
        reviewEl.appendChild(ratingEl);
        ratingEl.textContent = rating + '/5????'; //comment

        var textEl = document.createElement('p');
        textEl.setAttribute('class', 'text');
        reviewEl.appendChild(textEl);
        textEl.textContent = text; //url

        var urlP = document.createElement('p');
        urlP.setAttribute('class', 'url-p');
        var urlEl = document.createElement('a');
        urlEl.setAttribute('href', url);
        urlEl.setAttribute('target', '_blank');
        urlP.appendChild(urlEl);
        reviewEl.appendChild(urlP);
        urlEl.textContent = url;
      }
    });

    this.setUpListener(); // this.getMapCenter()
  }

  _createClass(Main, [{
    key: "getMapCenter",
    value: function getMapCenter() {
      var getMapCenter = new CustomEvent('get-map-center');
      document.dispatchEvent(getMapCenter);
    }
  }, {
    key: "setUpListener",
    value: function setUpListener() {
      var form = document.querySelector('form[name="place_search"]');
      form.addEventListener('submit', this.handleSearch);
      document.addEventListener('get-map-center-response', this.handleMapCenterResponse);
      document.addEventListener('map-ready', this.getMapCenter);
      document.addEventListener('business-search-results', this.handleResults);
      document.addEventListener('giphy-results', this.handleGifResults);
      document.addEventListener('yelp-review', this.handleYelpReviewResults);
    }
  }]);

  return Main;
}();

new Main();
//# sourceMappingURL=main.js.map
