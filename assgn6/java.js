var totalInCart = 0;

var qtyExist = false;

// function button(glazing, buttonId){
//     this.id = buttonId;
//     this.glazing = glazing;
// }

// button.prototype.selectGlazing = function(){
//     document.getElementById(this.buttonId).style.color = "grey";
// }

function selectButton(button){
    // var buttons = [new button("None", "0"),
    //                 new button("Sugar Milk", "1"),
    //                 new button("Vanilla Milk", "2"),
    //                 new button("Chocolate", "3")]

    // for (i = 0; i < 4; i++){
    //     buttons[i].prototype.selectGlazing();
    // }
    for (i = 0; i < 4; i++){
        document.getElementById(i).style.backgroundColor = "white";
    }
    document.getElementById(button).style.backgroundColor = "#DBDBDB";
    document.getElementById("glazingText").textContent = "GLAZING: " + document.getElementById(button).innerHTML;
}

function updateQty(selection){
    var selection = document.getElementById(selection);
    var selectedQty = Number(selection.options[selection.selectedIndex].value);
    document.getElementById("qtyText").textContent = "QTY:" + selectedQty;
}

function updatePrice(selection){
    var selection = document.getElementById(selection);
    var selectedQty = Number(selection.options[selection.selectedIndex].value);
    var totalPrice = 3*selectedQty;
    document.getElementById("productPrice").textContent = "$" + totalPrice;
}

function showCart(){
    qtyExist = true;
    // comes from https://www.w3schools.com/jsref/met_node_appendchild.asp
    var node = document.createElement("LI");
    var textnode = document.createTextNode(totalInCart);
    node.setAttribute("id", "cartQty");
    node.appendChild(textnode);
    document.getElementById("headerOl").appendChild(node);
    console.log(textnode);
}

function updateCart(){
    document.getElementById("cartQty").textContent = totalInCart;
}

function getSelectedItem(selection){
    // comes from https://stackoverflow.com/questions/8832375/how-to-get-selected-value-from-dropdown-list-in-javascript
    var selection = document.getElementById(selection);
    var selectedQty = Number(selection.options[selection.selectedIndex].value);
    totalInCart += selectedQty;
    if (!qtyExist){
        showCart();
    }
    updateCart();
 }


