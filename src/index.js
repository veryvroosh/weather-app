import "./View/styles.css";
import {initializeApp} from "./View/view.js";
import "./Controller/controller.js";

window.addEventListener('load',  async() => {
    await initializeApp()
})