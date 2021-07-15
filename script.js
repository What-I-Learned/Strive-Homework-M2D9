
function addBadges(){
    let musicCards = document.querySelectorAll(".music-card")
    for(let card of musicCards){
        let badge = document.createElement("div")
        badge.classList.add("genre-badge")
        badge.innerText = card.querySelector(".genre").innerText
        card.append(badge)
    }
    
}

addBadges()
