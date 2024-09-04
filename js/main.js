let links = document.querySelectorAll('.nav-link');
let layout=document.querySelector('.layout');
let closeBtn = document.querySelector('.close-btn');
let imageContainer = document.querySelector('.image-container');
let innerImg = document.querySelector('.inner-img');
let indexOfClickedImg = 0;
let rightBtn = document.querySelector('.right-btn');
let leftBtn = document.querySelector('.left-btn')

let listOfData=[]
async function getData(query){
    try
    {
        var data =await fetch(`https://api.themoviedb.org/3/trending/${query}/day?api_key=106d5b2d79cc67abb3a61a370d865234`,{method:'GET'});
        if(!data.ok){
            throw new Error(`Error: ${data.status}`);
        }
        var allData= await data.json();
        listOfData=allData.results;
        
        displayData()
    }catch(error){
        console.log('there was an issue with the request',error.message)
    }
    
   
}
getData('movie')

let displayData = ()=>{
    var baseUrl='https://image.tmdb.org/t/p/original'
    var allImages = ``
    for(let i =0; i<listOfData.length; i++){
        let imagePath = listOfData[i].poster_path ? listOfData[i].poster_path : listOfData[i].profile_path;
       allImages+=`<div class="col-md-3">
            <div class="rounded div-image">
              <img src='${baseUrl+imagePath}' class="w-100 rounded" alt="image trend" data-index='${i}'>
            </div>
          </div>`
        
    }
    document.getElementById('demo').innerHTML=allImages;
}
document.getElementById('demo').addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
        let clickedImage = e.target;
        let imageSrc = clickedImage.getAttribute('src');
        let dataIndex = clickedImage.getAttribute('data-index');

        if (imageSrc != null && dataIndex != null) {
            innerImg.setAttribute('src', imageSrc);
            layout.classList.remove('d-none');
            layout.classList.add('d-flex');
            
            let clickedItem = listOfData[dataIndex];
            if (clickedItem) {
                document.getElementById('title').innerText = clickedItem.title || clickedItem.name || 'Title Not Available';
                document.getElementById('type').innerText = clickedItem.media_type || 'Type Not Available';
                document.getElementById('over-view').innerText = clickedItem.overview || 'Overview Not Available';
                document.getElementById('rate').innerText = clickedItem.vote_average || 'Rating Not Available';
            }
        }
    }
});


for(let i=0; i<links.length; i++){
    links[i].addEventListener('click',function(e){
        var currentQuery = e.target.text;
        getData(currentQuery)
    })
}
closeBtn.addEventListener('click',function(e){
    layout.classList.remove('d-flex');
    layout.classList.add('d-none')
})
rightBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    let currentImageSrc = innerImg.getAttribute('src');
    indexOfClickedImg = listOfData.findIndex(item => {
        let imagePath = item.poster_path ? item.poster_path : item.profile_path;
        return `https://image.tmdb.org/t/p/original${imagePath}` === currentImageSrc;
    });
    indexOfClickedImg++;
    if (indexOfClickedImg >= listOfData.length) {
        indexOfClickedImg = 0;
    }
    let nextDetails = listOfData[indexOfClickedImg];
    if (nextDetails) {
        let imagePath = nextDetails.poster_path ? nextDetails.poster_path : nextDetails.profile_path;
        innerImg.setAttribute('src', `https://image.tmdb.org/t/p/original${imagePath}`);
    
        document.getElementById('title').innerText = nextDetails.title || nextDetails.name || 'Title Not Available';
        document.getElementById('type').innerText = nextDetails.media_type || 'Type Not Available';
        document.getElementById('over-view').innerText = nextDetails.overview || 'Overview Not Available';
        document.getElementById('rate').innerText = nextDetails.vote_average || 'Rating Not Available';
    } else {
        console.log('No more data available');
    }
});

leftBtn.addEventListener('click',function(e){
    e.stopPropagation();
    let currentImageSrc = innerImg.getAttribute('src');
    indexOfClickedImg=listOfData.findIndex(item=>{
        let imagePath = item.poster_path ? item.poster_path : item.profile_path;
        return `https://image.tmdb.org/t/p/original${imagePath}` === currentImageSrc;
    });
    indexOfClickedImg--;
    if(indexOfClickedImg < 0 ){
        indexOfClickedImg = listOfData.length-1;
    }
    let previousDetails = listOfData[indexOfClickedImg];
    if(previousDetails)
    {
        let imagePath = previousDetails.poster_path ? previousDetails.poster_path : previousDetails.profile_path;
        innerImg.setAttribute('src', `https://image.tmdb.org/t/p/original${imagePath}`);
    
        document.getElementById('title').innerText = previousDetails.title || previousDetails.name || 'Title Not Available';
        document.getElementById('type').innerText = previousDetails.media_type || 'Type Not Available';
        document.getElementById('over-view').innerText = previousDetails.overview || 'Overview Not Available';
        document.getElementById('rate').innerText = previousDetails.vote_average || 'Rating Not Available';
    }
});