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



        //clear markers
        const clearMarkers = new CustomEvent('clear-markers')
        document.dispatchEvent(clearMarkers)

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
           const photoEl = document.createElement('img');
           businessItemEl.appendChild(photoEl);
           photoEl.setAttribute('src', photo);

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
           ratingEl.textContent = rating + '????';

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

            let gifContainerParagraph = document.querySelector('p.gifs-go-here');
            gifContainerParagraph.innerHTML= ''

              for (let i=0; i < 3; i++){
                    // console.log('loop', i)

                let newGifImage = document.createElement('img')
                newGifImage.src= results[i].images.fixed_height.url
                
                newGifImage.classList.add('gif')
                
                gifContainerParagraph.appendChild(newGifImage) 
                  
              }

              
       }

       handleYelpReviewResults = (evt) =>{
           const reviews = evt.detail.results;
           console.log('got reviews', reviews);
        
        
            const apiContainer = document.querySelector('.api-container');


           

            const reviewContainer = document.querySelector('.review-container');
            reviewContainer.innerHTML= ''
           

            

           for (let i = 0; i < reviews.length; i++ ){

                console.log('got a name')
                
                const review = reviews[i]
                const name = review.user.name
                const userImage = review.user.image_url
                const rating = review.rating
                const text = review.text
                const url = review.url

                const reviewEl = document.createElement('div');
                reviewEl.setAttribute('class', 'review');
                reviewContainer.appendChild(reviewEl);

                const titleEl = document.createElement('p')
                titleEl.setAttribute('class', 'tags');
                titleEl.innerHTML="Review"
                reviewContainer.appendChild(titleEl);

                const reviewHeader = document.createElement('div');
                reviewHeader.setAttribute('class', 'review-header');

                



                //name
                const nameEl = document.createElement('h2');
                nameEl.setAttribute('class', 'name');
                reviewHeader.appendChild(nameEl)
                reviewEl.appendChild(reviewHeader);
                nameEl.textContent = name; 

                //image
                const imageEl = document.createElement('img');
                imageEl.setAttribute('src', userImage);
                reviewHeader.appendChild(imageEl)
                reviewEl.appendChild(reviewHeader);

                // rating
                const ratingEl = document.createElement('p');
                ratingEl.setAttribute('class', 'rating');
                reviewEl.appendChild(ratingEl);
                ratingEl.textContent = rating + '/5????';

                //comment
                const textEl = document.createElement('p')
                textEl.setAttribute('class', 'text');
                reviewEl.appendChild(textEl);
                textEl.textContent = (text)

                //url

                const urlP = document.createElement('p')
                urlP.setAttribute('class', 'url-p')


                const urlEl = document.createElement('a');
                urlEl.setAttribute('href', url)
                urlEl.setAttribute('target', '_blank');

                urlP.appendChild(urlEl)
                reviewEl.appendChild(urlP);

                urlEl.textContent = (url)



           } 


       }
       
}





new Main()