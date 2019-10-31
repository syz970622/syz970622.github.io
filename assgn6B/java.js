// total number of items in cart
var totalInCart = 0;
// is num of item displayed
var qtyExist = false;

var selectedGlazing = null;
var selectedQuantity = 1;
var selectedFlavor = null;

var rolls = [];

function getSelectedButton(button){
    selectedGlazing = document.getElementById(button).innerHTML;
}

function getSelectedQty(selection){
    //selection option comes from https://stackoverflow.com/questions/8832375/how-to-get-selected-value-from-dropdown-list-in-javascript
    var selection = document.getElementById(selection);
    var selectedQty = Number(selection.options[selection.selectedIndex].value);
    selectedQuantity = selectedQty;
}

function getSelectedFlavor(selection){
    selectedFlavor = selection;
    console.log(selectedFlavor);
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

function roll(flavor, glazing, qty){
    this.flavor = flavor;
    this.glazing = glazing;
    this.qty = qty;
}

    //when clicked add to cart, record the user's choice
function recordChoice(){

    //after user made a selection on glazing
    if (selectedGlazing != null){
        var selectedRoll = new roll(selectedFlavor, selectedGlazing, selectedQuantity);
        console.log(selectedRoll);
        // if the session storage does not comtain the key 'cart' (ie cart is empty)
        //then create empty array for the rolls
        //checking if key exist comes from https://stackoverflow.com/questions/16010827/html5-localstorage-checking-if-a-key-exists
        if (sessionStorage.getItem("cart") === null){
            rolls = [];
        // if something already exist in cart
        //retrieve everything from the cart
        } else {
            rolls = JSON.parse(sessionStorage.getItem('cart'));
        }
        //push the current selected roll into the rolls array
        rolls.push(selectedRoll);
        //store the new rolls array into session storage
        sessionStorage.setItem('cart', JSON.stringify(rolls));
    }
}

function displayCart(){
    rolls = JSON.parse(sessionStorage.getItem('cart'));
    //if something in cart
    if (rolls.length != 0){
        //loop through number of items in array, then create html elements for each
            for (i = 0; i < rolls.length; i ++){
            var itemContainer = document.createElement("div");
            itemContainer.setAttribute("class","itemContainer");
            document.getElementById("containerLeft").appendChild(itemContainer);
    // pasting block of html into javascript comes from
    // https://stackoverflow.com/questions/16270761/how-to-insert-a-large-block-of-html-in-javascript
            itemContainer.innerHTML = `
                <div class="cont1">
                    <div class="selectedFlavor">BLACKBERRY</div>
                    <div id="glazingText" class="selectedGlazing">Sugar Milk</div>
                    <br>
                    <div id="edit">Edit</div>
                </div>
                <div class="cont2">$3</div>
                <div class="cont3">1</div>
                <div class="cont4">$3</div>
                <img class="cont5" src="delete.png">
            `;
            //update the glazing, flavor, qty of each product
            document.getElementsByClassName("selectedGlazing")[i].textContent = rolls[i].glazing;
            document.getElementsByClassName("selectedFlavor")[i].textContent = rolls[i].flavor;
            document.getElementsByClassName("cont3")[i].textContent = rolls[i].qty;
        }
    }

}


function clickedDelete(){
    //get all delete buttons
    var deleteButtons = document.getElementsByClassName("cont5");
    //loop through all buttons
    for (var i = 0; i < deleteButtons.length; i ++){
        var btn = deleteButtons[i];
        //detect clicked button
        btn.addEventListener('click', function(event){
            // https://www.w3schools.com/jsref/event_target.asp
            var selectedBtn = event.target
            // https://stackoverflow.com/questions/26829961/indexof-element-in-array
            var index = [].indexOf.call(deleteButtons, selectedBtn);
            //remove the entire div container of the item in cart
            selectedBtn.parentElement.remove();
            //get the current cart array
            var rolls = JSON.parse(sessionStorage.getItem('cart'));
            //splice into array to remove selected item
            rolls.splice(index, 1);
            //update sessionStorage
            sessionStorage.setItem('cart', JSON.stringify(rolls));

        });
    }

}