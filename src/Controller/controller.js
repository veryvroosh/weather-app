import {displayInfo, EagleToNormal, NormalToEagle, currentInfo} from "../View/view.js";

const searchInput = document.querySelector("#city-search");
const toggleButton = document.querySelector("#toggle-button");

searchInput.addEventListener('keydown', async(e) => {
    if(e.key === "Enter") {
        await displayInfo(searchInput.value);
        searchInput.value = "";
    }
})

let eagleState = false;
toggleButton.addEventListener('click', () => {
    if(eagleState === false) {
        NormalToEagle(currentInfo)
        toggleButton.classList.add("active");
    } else {
        EagleToNormal(currentInfo);
        toggleButton.classList.remove("active");
    }

    eagleState = !eagleState;
})