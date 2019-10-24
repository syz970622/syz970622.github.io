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


function onload(){
    var animal = generateRandomAnimal();
    document.getElementById("animal-properties").textContent = animal.name + "  " + animal.age + "years old";
    document.getElementById("animal-img").setAttribute("src", animal.image)
}