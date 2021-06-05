"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var YelpApi = /*#__PURE__*/function () {
  function YelpApi() {
    var _this = this;

    _classCallCheck(this, YelpApi);

    _defineProperty(this, "API_KEY", 'Tow02LN0q2c-t3X-Sq8qlJOMtFc7-tmsGglB_PJ927cw4FMErKxZI8EJN5FaAFuZGL5_6USYexsippLsH5f8NOurISqUA02NvVF_zWYeoocmtlhSUZsqy8d4esl9YHYx');

    _defineProperty(this, "API_BASE_URL", 'https://circuslabs.net/proxies/yelp-fusion-proxy/');

    _defineProperty(this, "handleSearch", function (evt) {
      evt.preventDefault();
      console.log('searching....', evt.detail);
      var searchInfo = evt.detail;
      var term = searchInfo.query;
      var data = {
        _ep: '/businesses/search',
        term: term,
        latitude: searchInfo.latitude,
        longitude: searchInfo.longitude
      };
      var headers = {
        Authorization: "Bearer ".concat(_this.API_KEY)
      };
      axios.get(_this.API_BASE_URL, {
        params: data,
        headers: headers
      }).then(_this.processResults);
    });

    _defineProperty(this, "processResults", function (data) {
      console.log(data);
      var results = data.data.businesses;
      console.log('we got data!', results);
      var resultsData = {
        results: results
      };
      var resultsEvent = new CustomEvent('business-search-results', {
        detail: resultsData
      });
      document.dispatchEvent(resultsEvent); // //parent container
      // const articleContainer = document.createElement('div');
      // articleContainer.setAttribute('class', 'business-Container');
      // const classResults = document.querySelector('.classResults')
      // classResults.appendChild( articleContainer);
      // //loop for businesses
      // for (let i = 0; i < results.length; i++ ){
      //     const business = results[i]
      //     const name = business.name
      //     const photo = business.image_url
      //     const price = business.price
      //     const rating = business.rating
      //     const transactionType = business.transactions
      //     // Business Item
      //     const businessItemEl = document.createElement('div');
      //     businessItemEl.setAttribute('class', 'business-item');
      //     articleContainer.appendChild(businessItemEl);
      //     //Name
      //     const nameEl = document.createElement('h2');
      //     businessItemEl.appendChild(nameEl);
      //     nameEl.textContent = name;
      //     //location 
      //     const location = business.location.display_address
      //     const locationEl =document.createElement('h3');
      //     businessItemEl.appendChild(locationEl);
      //     locationEl.textContent = location;
      //     //image 
      //     const photoEl = document.createElement('img');
      //     businessItemEl.appendChild(photoEl);
      //     photoEl.setAttribute('src', photo);
      //     //categories
      //     const category = business.categories
      //     const categoryEl = document.createElement('h4');
      //     businessItemEl.appendChild(categoryEl);
      //     categoryEl.textContent = category.map((cat) => cat.title).join('\n');
      //     businessItemEl.appendChild(categoryEl);
      //     //price
      //     const priceEL = document.createElement('p');
      //     priceEL.setAttribute('class', 'dollar-sign-price');
      //     businessItemEl.appendChild(priceEL);
      //     priceEL.textContent = price;
      //     //rating
      //     const ratingEl = document.createElement('p');
      //     ratingEl.setAttribute('class', 'rating');
      //     businessItemEl.appendChild(ratingEl);
      //     ratingEl.textContent = rating + '😉';
      //     //transaction
      //     const transactionEL = document.createElement('p');
      //     transactionEL.setAttribute('class', 'transaction_type');
      //     businessItemEl.appendChild(transactionEL);
      //     transactionEL.textContent = transactionType;
      // }
    });

    _defineProperty(this, "handleReviews", function (evt) {
      evt.preventDefault();
      var businessId = evt.detail;
      console.log('searching....', businessId);
      var data = {
        _ep: "/businesses/".concat(businessId, "/reviews")
      };
      var headers = {
        Authorization: "Bearer ".concat(_this.API_KEY)
      };
      axios.get(_this.API_BASE_URL, {
        params: data,
        headers: headers
      }).then(_this.processReviews);
    });

    _defineProperty(this, "processReviews", function (data) {
      // Reviews
      var reviews = data.data.reviews;
      console.log('we got reviews', reviews);
      var reviewsData = {
        results: reviews
      };
      var reviewEvent = new CustomEvent('yelp-review', {
        detail: reviewsData
      });
      document.dispatchEvent(reviewEvent);
    });

    console.log('yelp is ready');
    this.setUpListener();
  }

  _createClass(YelpApi, [{
    key: "setUpListener",
    value: function setUpListener() {
      // const form = document.querySelector('form[name="business_search"]')
      // form.addEventListener('submit', this.handleSearch)
      document.addEventListener('business-search', this.handleSearch);
      document.addEventListener('review-search', this.handleReviews);
    }
  }]);

  return YelpApi;
}();

new YelpApi();
//# sourceMappingURL=yelpReviews.js.map
