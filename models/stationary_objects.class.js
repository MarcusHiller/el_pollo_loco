/**
 * Class to bundle static UI elements like status bars and buttons.
 */
class FixedObjects {

    /**
    * Creates a new container for fixed screen objects.
    * 
    * @param {*} statusBar - The status bar component (health, coins, etc.).
    * @param {*} button - The button component or array of buttons.
    */
    constructor(statusBar, button) {
        this.statusBar = statusBar;
        this.button = button;
    }
}