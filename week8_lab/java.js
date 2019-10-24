

function elephant(name, age){
    this.name = name;
    this.age = age;
    this.type = "elephant";
    this.image = "elephant.png"
}

function chimp(name, age){
    this.name = name;
    this.age = age;
    this.type = "chimp";
    this.image = "chimp.png"
}

function lion(name, age){
    this.name = name;
    this.age = age;
    this.type = "lion";
    this.image = "lion.png"
}

var animals = [new elephant(), new chimp(), new lion()]

var names = ["Bob", "Lily", "Leo", "Kathy", "Grace", "Martin"]

function generateRandomIndex(maxIndex){
    return Math.floor(Math.random() * maxIndex);
}

function generateRandomName(){
        var randomNameIndex = generateRandomIndex(names.length);
        return names[randomNameIndex];
}

function generateRandomAge(){
        return generateRandomIndex(20);
}

function generateRandomAnimal(){
        var randomAnimalIndex = generateRandomIndex(animals.length);
        var randomAnimal = animals[randomAnimalIndex];
        if (randomAnimal instanceof elephant){
            return new elephant(generateRandomName(), generateRandomAge());
        }
        if (randomAnimal instanceof chimp){
            return new chimp(generateRandomName(), generateRandomAge());
        }
        if (randomAnimal instanceof lion){
            return new lion(generateRandomName(), generateRandomAge());
        }
}

//document.appendChild

var savedAnimals = [];
/*** Document Load ****/
function onLoad () {


  // get the savedAnimal in local storage if one exists
  // var animal = JSON.parse(localStorage.getItem("savedAnimals"));


  //check if the saved animal exists in local storage
  if (savedAnimals.length < 6)
  {
    //if there is no saved animal, the button should display the Save Animal text
    document.getElementById("button-storage").textContent = "Save Animal";

    //if there is no saved animal, we generate one
    animal = generateRandomAnimal();

  }
  else
  {
    //if there is a saved animal, the button should display Clear Animal text
    document.getElementById("button-storage").textContent = "Clear Animal";

    //change the boolean to note that this animal has been saved
  }

  // update the page based on the animal properties
  document.getElementById("animal-properties").textContent = animal.name + "  " + animal.age + "years old";
  document.getElementById("animal-img").setAttribute("src", animal.image);


  document.getElementById("button-storage").addEventListener("click", function() {
    //when we are clearing the animal
    if (savedAnimals.length > 5)
    {
      // clear the animal from the local storage
      localStorage.removeItem("savedAnimal");

      // if this button was clicked, hide button and show message to user
      document.getElementById("button-storage").style.display = "none";
      document.getElementById("button-action-text").textContent = "Cleared!";
      document.getElementById("button-action-text").style.display = "block";
    }
    //when we are saving the animal
    else
    {
      // save the animal to the local storage
      localStorage.setItem("savedAnimal", JSON.stringify(savedAnimals));
      savedAnimals.push(JSON.parse(localStorage.getItem("savedAnimal")));

      // if this button was clicked, hide button and show message to user
      document.getElementById("button-storage").style.display = "none";
      document.getElementById("button-action-text").textContent = "Saved!";
      document.getElementById("button-action-text").style.display = "block";
    }
  });

};