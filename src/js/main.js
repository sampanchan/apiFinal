// console.log(` 
// Change this message, and make sure it changes in the browser 
// to verify that you're working in the right files.`)

class Main{
    constructor () {
        
        this.setUpListener()
        // this.getMapCenter()
        
    }
    getMapCenter(){
        const getMapCenter = new CustomEvent('get-map-center')
        document.dispatchEvent(getMapCenter)
    }
    setUpListener(){
        const form = document.querySelector('form[name="place_search"]')
        form.addEventListener('submit', this.handleSearch)
        

        document.addEventListener('get-map-center-response', this.handleMapCenterResponse)
        document.addEventListener('map-ready', this.getMapCenter)
        document.addEventListener('business-search-results', this.handleResults)
        document.addEventListener('giphy-results', this.handleGifResults)

        document.addEventListener('yelp-review', this.handleYelpReviewResults)

    }

    handleMapCenterResponse = (evt) =>{
        const responseInfo = evt.detail
        console.log(evt)
        this.mapCenter = responseInfo.center
    }

    handleSearch = (evt) => {
        evt.preventDefault()
        console.log(evt.detail)
        const query = evt.target.querySelector('input[name="place"]').value
        console.log('query', query, this.mapCenter)

        const searchInfo = { 
            query: query, 
            latitude: this.mapCenter.lat(),
            longitude: this.mapCenter.lng(),
        }
        const searchEvent = new CustomEvent('business-search', { detail: searchInfo })
        document.dispatchEvent(searchEvent)

        const giphyEvent = new CustomEvent('giphy-search', { detail: query })
        document.dispatchEvent(giphyEvent)

    }

    handleResults = (evt) => {
       const results = evt.detail.results
       console.log(results)
       //parent container

       const articleContainer = document.createElement('div');
       articleContainer.setAttribute('class', 'business-Container');
       const classResults = document.querySelector('.classResults')
       classResults.appendChild( articleContainer);

       //loop for businesses
      
       for (let i = 0; i < results.length; i++ ){


           const business = results[i]
           const name = business.name
           const photo = business.image_url
           const price = business.price
           const rating = business.rating
           const transactionType = business.transactions
           const id = business.id


        

        //    //fire request 
        //    // get- reviews look at line 43/44 fire custome event 
        //    // new listener and handle 

        

            
          
           

        //    // Business Item
           const businessItemEl = document.createElement('div');
           businessItemEl.setAttribute('class', 'business-item');
           

        //    //Name
           const nameEl = document.createElement('h2');
           businessItemEl.appendChild(nameEl);
           nameEl.textContent = name;

           //location 
           const location = business.location.display_address
           const locationEl =document.createElement('h3');
           businessItemEl.appendChild(locationEl);
           locationEl.textContent = location;

           //image 
        //    const photoEl = document.createElement('img');
        //    businessItemEl.appendChild(photoEl);
        //    photoEl.setAttribute('src', photo);

           //categories
           const category = business.categories
           const categoryEl = document.createElement('h4');
           businessItemEl.appendChild(categoryEl);
           categoryEl.textContent = category.map((cat) => cat.title).join('\n');
           businessItemEl.appendChild(categoryEl);

           //price
           const priceEL = document.createElement('p');
           priceEL.setAttribute('class', 'dollar-sign-price');
           businessItemEl.appendChild(priceEL);
           priceEL.textContent = price;

           //rating
           const ratingEl = document.createElement('p');
           ratingEl.setAttribute('class', 'rating');
           businessItemEl.appendChild(ratingEl);
           ratingEl.textContent = rating + '😉';

           //transaction
           const transactionEL = document.createElement('p');
           transactionEL.setAttribute('class', 'transaction_type');
           businessItemEl.appendChild(transactionEL);
           transactionEL.textContent = transactionType;

        

           const markerInfo = { 
            lat: business.coordinates.latitude,
            lng: business.coordinates.longitude,
            title: business.name,
            windowContent: businessItemEl.innerHTML,
            businessId: id
            // windowContent: `<h2>${business.name}</h2><h2>${business.image_url}</h2>`
            }

            const searchEvent = new CustomEvent('add-marker', { detail: markerInfo })
            document.dispatchEvent(searchEvent)



            //Giphy

           
                       

       }
    }
       handleGifResults = (evt) =>{
            const results = evt.detail

              for (let i=0; i < 3; i++){
                    // console.log('loop', i)

                let newGifImage = document.createElement('img')
                newGifImage.src= results[i].images.fixed_height.url
                
                newGifImage.classList.add('gif')
                let gifContainerParagraph = document.querySelector('p.gifs-go-here')
                gifContainerParagraph.appendChild(newGifImage) 
                  
              }
       }

       handleYelpReviewResults = (evt) =>{
           const reviews = evt.detail
           console.log('got reviews', reviews)


           //dom manipluation 


       }
       
}





new Main()