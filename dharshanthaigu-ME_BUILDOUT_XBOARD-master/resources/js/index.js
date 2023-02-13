let ID = () => Math.random().toString(36).substr(2, 9);

let createAccordion= (title,id)=>{
  return `
  <div class="accordion-item" id="${id}">
    <h2 class="accordion-header" id="heading${id}">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
        ${title}
      </button>
    </h2>
    <div id="collapse${id}" class="accordion-collapse collapse show" aria-labelledby="heading${id}" data-bs-parent="#accordionId">
    </div>
  </div> 
  `   

}

let createCarouselOuter = (id,innerid) =>{
    return`
    <div id="carouselExampleControls${id}" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner" id="${innerid}"></div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>
    `;
}

let createCarouselInner = (id,active) =>{
    return ` 
    <div class="carousel-item ${active ? "active": ""}" id="${id}"></div>

    `
}

let createCard = (item)=>{
    return`
    <div class="card d-block">
    <img src="${item["enclosure"]["link"]}" alt="Card Image" class ="card-img-top img-fluid carousel-img "  >
    
    <div class="card-body">
        <h5 class=card-title>${item["title"]}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${item["author"]}</h6>
        <p class="card-currentdate text-secondary">${item["pubDate"]}</p>
        <p class="card-Description">${item["description"]}</p>
        <a href="${item["link"]}" class="streched-link" target="_blank"></a>
    </div>
    </div>
    `
    
}


let addContent = async () =>{
  for (let i=0;i < magazines.length;i++){
    let url = magazines[i];
    let response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`);
    let content = await response.json();

    let accordionId = ID();
    let accordion = createAccordion(content["feed"]["title"], accordionId);
    console.log("Accordian :" , accordion);
    document.getElementById('accordionId').innerHTML += accordion;

    if(i == 0){
      document.getElementById(`collapse${accordionId}`).classList.add("show") ; 
    }


    
    let carouselId =ID();
    let carouselInnerId = ID();
    let carousel = createCarouselOuter(carouselId,carouselInnerId);
    console.log("test")
    console.log("carousel :" , carousel);
    document.getElementById(`collapse${accordionId}`).innerHTML = carousel;  

    let items = content["items"]
    for(let item in items){
      let card = createCard(items[item])

      let innerCarouselCardId = ID();
      let innerCarouselCard = createCarouselInner(innerCarouselCardId, item == 0);
      console.log("innercourselcard :" , innerCarouselCard)
      document.getElementById(`${carouselInnerId}`).innerHTML += innerCarouselCard;
      document.getElementById(`${innerCarouselCardId}`).innerHTML += card;
    }
  }
};
addContent();



