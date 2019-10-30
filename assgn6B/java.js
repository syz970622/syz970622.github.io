// total number of items in cart
var totalInCart = 0;
// is num of item displayed
var qtyExist = false;

var selectedGlazing = null;
var selectedQuantity = 1;

function getSelectedButton(button){
    selectedGlazing = document.getElementById(button).innerHTML;
}

function getSelectedQty(selection){
    //selection option comes from https://stackoverflow.com/questions/8832375/how-to-get-selected-value-from-dropdown-list-in-javascript
    var selection = document.getElementById(selection);
    var selectedQty = Number(selection.options[selection.selectedIndex].value);
    selectedQuantity = selectedQty;
}

// highlight selected button
function selectButton(button){
    // reset button color to white
    for (i = 0; i < 4; i++){
        document.getElementById(i).style.backgroundColor = "white";
    }
    // set selected button to grey
    document.getElementById(button).style.backgroundColor = "#DBDBDB";
    // update glazing text
    document.getElementById("glazingText").textContent = "GLAZING: " + document.getElementById(button).innerHTML;
}

// update quantity text
function updateQty(){
    document.getElementById("qtyText").textContent = "QTY:" + selectedQuantity;
}


// update total price
function updatePrice(){
    var totalPrice = 3*selectedQuantity;
    document.getElementById("productPrice").textContent = "$" + totalPrice;
}

// start to display num of items
function showCart(){
    qtyExist = true;
    //createTextNode comes from https://www.w3schools.com/jsref/met_node_appendchild.asp
    var node = document.createElement("LI");
    var textnode = document.createTextNode(totalInCart);
    node.setAttribute("id", "cartQty");
    node.appendChild(textnode);
    document.getElementById("headerOl").appendChild(node);
}

// update num of items
function updateCart(){
    document.getElementById("cartQty").textContent = totalInCart;
}

// get selected value from drop down menu
function getSelectedItem(){
    totalInCart += selectedQuantity;
    if (!qtyExist){
        showCart();
    }
    updateCart();
 }

// update image displayed
function displayImg(image){
    document.getElementById("display").setAttribute("src", image +".png");
}

function roll(glazing, qty){
    this.glazing = glazing;
    this.qty = qty;
}

function recordChoice(){
    //when clicked add to cart

    //after user made a selection on glazing
    if (selectedGlazing != null){
        var selectedRoll = new roll(selectedGlazing, selectedQuantity);
        // if the session storage does not comtain the key 'cart' (ie cart is empty)
        //then create empty array for the rolls
        //checking if key exist comes from https://stackoverflow.com/questions/16010827/html5-localstorage-checking-if-a-key-exists
        if (sessionStorage.getItem("cart") === null){
            var rolls = [];
        // if something already exist in cart
        //retrieve everything from the cart
        } else {
            var rolls = JSON.parse(sessionStorage.getItem('cart'));
        }
        //push the current selected roll into the rolls array
        rolls.push(selectedRoll);
        //store the new rolls array into session storage
        sessionStorage.setItem('cart', JSON.stringify(rolls));
        console.log(JSON.parse(sessionStorage.getItem('cart')));
    }
}

function displayCart(){
    var itemContainer = document.createElement("div");

}