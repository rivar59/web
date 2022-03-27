var data = document.querySelector("#data");
var container = document.querySelector(".container");
var has_run = false;

data.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        search();
    }
});

function search(){
    if (has_run){
        destroy();
    }
    var url = 'https://api.unsplash.com/search/photos?query=' + data.value + '&per_page=30&client_id=MJewRNTxzE9dhcauMfuL4tnH08WekO3eCmLQAaYYPeU'
    console.log(url);
    fetch(url).then(function (response){
        return response.json();
    }).then( function (res){
        create_picture(res);
    });
    has_run = true;
}

function create_picture(res){
    res.results.forEach((item, i) => { 
        let card = document.createElement("div");
        card.className = "picture_data";

        let img = document.createElement("img");
        img.src = item.urls.regular;

        card.appendChild(img);
        container.appendChild(card);
    });
}

function destroy(){
    var child = container.lastElementChild; 
    while (child) {
        container.removeChild(child);
        child = container.lastElementChild;
        console.log("I need to destroy");
    }
}