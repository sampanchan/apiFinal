"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Giphy = /*#__PURE__*/function () {
  function Giphy() {
    var _this = this;

    _classCallCheck(this, Giphy);

    _defineProperty(this, "API_KEY", '0yAOb5R2gRdxVHK27gk8zxOJzMmmxtOp');

    _defineProperty(this, "API_BASE_URL", 'https://api.giphy.com/v1/gifs/search');

    _defineProperty(this, "handleSearch", function (evt) {
      evt.preventDefault();
      console.log('searching....');
      var data = {
        q: evt.detail,
        // limit: 3,
        // offset: 5,
        rating: 'g',
        lang: 'en',
        api_key: _this.API_KEY
      };
      var headers = {
        Authorization: "Bearer ".concat(_this.API_KEY)
      };
      axios.get(_this.API_BASE_URL, {
        params: data,
        headers: headers
      }).then(_this.processResults);
    });

    console.log('Giphy::constructor()');
    this.setUpListener();
  }

  _createClass(Giphy, [{
    key: "setUpListener",
    value: function setUpListener() {
      // const form = document.querySelector('form[name="place_search"]')
      // form.addEventListener('submit', this.handleSearch)
      document.addEventListener('giphy-search', this.handleSearch);
    }
  }, {
    key: "processResults",
    value: function processResults(response) {
      console.log(response);

      var giphyResults = function giphyResults(data) {
        var giphyResults = new CustomEvent('giphy-results', {
          detail: data.data
        });
        document.dispatchEvent(giphyResults); // for (let i=0; i < 3; i++){
        //         // console.log('loop', i)
        //     //   newGifImage.src= data.data[i].images.fixed_height.url
        //   }
      };

      giphyResults(response.data);
    }
  }]);

  return Giphy;
}();

new Giphy();
//# sourceMappingURL=giphy.js.map
