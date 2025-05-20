
/* First exercise */

/* function Book (title, author, pages, isRead) {

    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
      }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.bookInfo = function info () {
        return this.title+" "+this.author+" "+this.pages+" "+this.isRead;
    }


};

const theHobbit = new Book('The hobbit', "J.R.R. Tolkien", 295, false)



console.log (theHobbit.bookInfo()); */




/* Second exercise */


/* function Player(name, marker) {
    
    this.name = name;
    this.marker = marker;

    this.sayName = function() {
      console.log(this.name)
    };
  }
  
  const player1 = new Player('steve', 'X');
  const player2 = new Player('also steve', 'O');

  player1.sayName(); // logs 'steve'
  player2.sayName(); // logs 'also steve'


Object.getPrototypeOf(player1) === Player.prototype; // returns true
Object.getPrototypeOf(player2) === Player.prototype; // returns true */


/* Third exercise */

/* 
let animals = {};

 console.log(animals);

console.log(Object.getPrototypeOf(animals));

console.log(animals.__proto__)  */


/* function Animals (name) {
  this.name = name;
}

rabbit = new Animals('rabbit');

console.log(Animals.prototype)

let rabbitProto = Object.getPrototypeOf(rabbit);

console.log (rabbitProto);

console.log(Object.prototype)

console.log(Object.getPrototypeOf(Animals));


 */






/* CASO 1 DE OBJETOS */

/* (1) Un objeto creado asi: */
let myObj = {};
/* console.log(typeof(myObj)); */

/* (2) Tiene como constructor la funcion Object, es lo mismo que hacer*/
let myObj2 = new Object();
/* console.log(typeof(myObj2)); */ /* Vemos que tambien es un objeto al igual que en myObj = {} */
console.log(myObj.constructor) /* Aca podemos ver que el constructor de myObj es la funcion Object */
console.log(myObj2.constructor) /* Aca podemos ver que el constructor de myObj es la funcion Object */

/* (3) Para acceder a la propiedad prototype del constructor Object (que esa propiedad es un objeto) 
dependiendo de si lo hacemos desde un objeto o desde su constructor, myObj hereda de su prototype
todas sus propiedades y metodos*/
console.log(Object.getPrototypeOf(myObj2) === Object.prototype);



/* CASO 2 DE OBJETOS */

/* (1) Si nosotros definimos un constructor */

function Moneda (nombre, material) {
  this.nombre = nombre;
  this.material = material;
}

/* Vemos que tiene una propiedad prototype que es un objeto, 
en este caso esta vacio: {} */
console.log(Moneda.prototype);

/* Si agrego un metodo a la propiedad prototype (que es un objeto) del constructor Moneda */
Moneda.prototype.sayHola = function () {
  console.log("Hola soy el peso fuerte");
}
/* Ahora me devuelve:
{ sayHola: [Function (anonymous)] } en lugar de {} */
console.log(Moneda.prototype);

/* (2) Creo un objeto de nuestro constructor Moneda */

let pesoArgy = new Moneda ("Peso", "Oro");

/* El metodo sayHola en Moneda puede ser utilizado 
por cualquiera de los objetos que haya usado ese constructor para ser creado,
en este caso por el objeto pesoArgy */
pesoArgy.sayHola();

/* (3) Al igual que antes, si queremos acceder a Moneda.prototype desde el objeto pesoArgy
hacemos lo siguiente */
console.log(Object.getPrototypeOf(pesoArgy) === Moneda.prototype);

/*(4) Pero ahora podemos ver que el constructor Moneda
 tambien hereda de otro prototype a diferencia del primer ejemplo, del constructor original Object */
console.log(Object.getPrototypeOf(Moneda.prototype) === Object.prototype);


/*

Caso 1


Object {

  protoype : root Object prototype;

}


      myObj = new Object()    {
      myObj = {}
                                            Para acceder a Object.protoype desde myObj
          this.name = name;                 -> Object.getPrototypeOf(myObj) ->
          this.age = age;                   es lo mismo Object.getPrototypeOf(myObj) === Object.prototype
          ... etc

      }


Caso 2 


Object {

  protoype : root Object prototype;

}
          Moneda (nombre, material) {                           Para acceder a Object.prototype desde el constructor moneda -> 
                                                                Object.getPrototypeOf(Moneda.prototype) ->
            this.nombre = nombre;                               Object.getPrototypeOf(Moneda.prototype) === Object.protoype
            this.material = material;
            prototype = { sayHola: [Function (anonymous)] }
          
          
          }


              pesoArgy = {
                                                        Para acceder a Moneda.prototype desde el objeto pesoArgy ->
                nombre = Peso;                          Object.getPrototypeOf(pesoArgy) -> es lo mismo que ->
                material = Oro;                         Object.getPrototypeOf(pesoArgy) === Moneda.prototype
                                                        Tiene acceso a la funcion sayHola ya que la hereda de su prototipo
              }








 */
