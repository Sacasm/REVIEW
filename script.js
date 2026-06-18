// 1. GLOBAL STATE TRACKING MEMORY (Similar to global variables in C)
let currentScore = 0;
let activePromoCode = "";
const promoPool = ['SAVE10', 'DISCOUNT20', 'FREE50'];

// 2. DOM ELEMENT REFERENCE POINTER LOOKUPS (Memory references)
const promoScreenNode = document.getElementById("div-promo");
const successScreenNode = document.getElementById("div-success");
const displayElement = document.getElementById("promo-display");
const textInputNode = document.getElementById("user-input");
const scoreCounterNode = document.getElementById("score-counter");
const feedbackMessageNode = document.getElementById("feedback");

// 3. SUB-ROUTINE: GENERATING RANDOM PROMO CODES
function generateNewPromo() {
    // Generate a random integer index bounded safely by our tracking array pool length
    const randomIndex = Math.floor(Math.random() * promoPool.length);
    
    // Assign our chosen string array field to our global tracking state string holder
    activePromoCode = promoPool[randomIndex];

    // TODO 3 ANSWER: Dereference displayElement and modify its text content buffer
    displayElement.innerHTML = activePromoCode;
}

// 4. INTERRUPT HANDLER FUNCTION: VERIFY USER TEXT ENTRY
function verifyPromo() {
    // Extract real-time user string typing from input text block pointer node
    const clientString = textInputNode.value;

    let displayMessage = "";
    let colorFlag = "";

    // TODO 4 ANSWER: Check if user input string strictly matches our active coupon code state
    if (clientString === activePromoCode) {
        // Increment global score state
        currentScore++;
        displayMessage = "Code Verified! Price Dropped!";
        colorFlag = "green";
    } else {
        displayMessage = "Invalid Code Entry! Correct code: " + activePromoCode;
        colorFlag = "red";
    }

    // Roll tracking engine data immediately for next turn processing pass
    generateNewPromo();

    // TODO 5 ANSWER: Sync the text content of scoreCounterNode with our global numeric currentScore variable
    scoreCounterNode.innerHTML = currentScore;
    
    // Clear the input text buffer so the student doesn't have to delete characters manually
    textInputNode.value = "";

    // Sync visual message text and text font colors
    feedbackMessageNode.innerHTML = displayMessage;
    feedbackMessageNode.style.color = colorFlag;

    // TODO 6 ANSWER: Check if win bounds are met. If true, swap element layout flags.
    if (currentScore >= 3) {
        promoScreenNode.style.display = "none";  // Unlink game container from visual engine rendering
        successScreenNode.style.display = "block"; // Mount the success layout screen box
        feedbackMessageNode.innerHTML = "";       // Clear the text message track
    }
}

// 5. SYSTEM RESET FUNCTION ROUTINE
function resetSystem() {
    // Hard reset dynamic variable properties back to initial state zero points
    currentScore = 0;
    
    // Sync memory state changes instantly to screen nodes
    scoreCounterNode.innerHTML = currentScore;
    feedbackMessageNode.innerHTML = "";
    textInputNode.value = "";

    // TODO 7 ANSWER: Toggle element layout display states back to initial conditions
    successScreenNode.style.display = "none"; // Hide victory display screen
    promoScreenNode.style.display = "block";   // Re-render core matching engine layout box
    
    // Fire up initialization generation run sequence
    generateNewPromo();
}

// 6. INITIALIZATION EXECUTION PASS ON PAGE LAUNCH RUN
generateNewPromo();
