class Giphy{

    API_KEY = '0yAOb5R2gRdxVHK27gk8zxOJzMmmxtOp'
    API_BASE_URL = 'https://api.giphy.com/v1/gifs/search'


    constructor(){
        console.log('Giphy::constructor()')
        this.setUpListener()
    }



    setUpListener(){
        // const form = document.querySelector('form[name="place_search"]')
        // form.addEventListener('submit', this.handleSearch)


        document.addEventListener('giphy-search', this.handleSearch)



    }


    handleSearch = (evt) => {
        evt.preventDefault()
        console.log('searching....')

        const data ={
    
            q: evt.detail,
            // limit: 3,
            // offset: 5,
            rating: 'g',
            lang: 'en',
            api_key: this.API_KEY
        }





        const headers = {
            Authorization: `Bearer ${this.API_KEY}`
        }

        axios.get(this.API_BASE_URL, { params: data, headers: headers }).then(this.processResults)
    }

    

    processResults(response){
        console.log(response)
        var giphyResults = function giphyResults(data) {

            const giphyResults = new CustomEvent('giphy-results', {detail: data.data})
            document.dispatchEvent(giphyResults)

            // for (let i=0; i < 3; i++){
            //         // console.log('loop', i)

            //     //   newGifImage.src= data.data[i].images.fixed_height.url
                  
            //   }
          
          }; 
          giphyResults(response.data)
    }

}

new Giphy()