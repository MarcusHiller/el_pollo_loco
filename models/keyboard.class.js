/**
 * Tracks the current keyboard state for movement and actions.
 */
class Keyboard {

    /** @type {boolean} Left arrow or A key pressed */
    left = false;


    /** @type {boolean} Right arrow or D key pressed */
    right = false;


    /** @type {boolean} Spacebar pressed (jump/throw) */
    space = false;


    /** @type {boolean} Up arrow pressed */
    up = false;

    
    /** @type {boolean} 'D' key pressed (used for throwing) */
    d = false;
}