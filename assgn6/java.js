// total number of items in cart
var totalInCart = 0;
// is num of item displayed
var qtyExist = false;

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
function updateQty(selection){
    //selection option comes from https://stackoverflow.com/questions/8832375/how-to-get-selected-value-from-dropdown-list-in-javascript
    var selection = document.getElementById(selection);
    var selectedQty = Number(selection.options[selection.selectedIndex].value);
    document.getElementById("qtyText").textContent = "QTY:" + selectedQty;
}

// update total price
function updatePrice(selection){
    //selection option comes from https://stackoverflow.com/questions/8832375/how-to-get-selected-value-from-dropdown-list-in-javascript
    var selection = document.getElementById(selection);
    var selectedQty = Number(selection.options[selection.selectedIndex].value);
    var totalPrice = 3*selectedQty;
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
function getSelectedItem(selection){
    //selection option comes from https://stackoverflow.com/questions/8832375/how-to-get-selected-value-from-dropdown-list-in-javascript
    var selection = document.getElementById(selection);
    var selectedQty = Number(selection.options[selection.selectedIndex].value);
    totalInCart += selectedQty;
    if (!qtyExist){
        showCart();
    }
    updateCart();
 }

// update image displayed
function displayImg(image){
    document.getElementById("display").setAttribute("src", image +".png");
}
