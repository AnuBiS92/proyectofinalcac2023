// Platos Cards -------------------------


class Plato {

    constructor(title, image, desc, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }
}

class Item {
    constructor(plato) {
        this.plato = plato;
    }

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
          <div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}" >
            <div class="product-item__content">
              <h2>${this.product.title}</h2>
              <h3>\$${this.product.price}</h3>
              <p>${this.product.description}</p>
              <button>Add to Cart</button>
            </div>
          </div>
        `;
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this));
        return prodEl;
    }
}


class PlatoList {
    platos = [
        new Plato(
            'Cordero Patagonico',
            'http://www.skorpios.cl/wp-content/uploads/El-cordero-patag%C3%B3nico-de-Skorpios.jpg',
            'plato típico de la región patagónica de Argentina que se prepara al asador y se sirve con guarniciones como papas y ensalada.',
            7000
        ),
        new Plato(
            'Bife de Costilla',
            'https://www.lamejorparrilla.com/wp-content/uploads/2011/02/1470069566_1461178446bife-de-costilla.png',
            'Exquisito Bife de Costilla, asado a las brazas con Papas al natutal como guarnicion',
            4500
        ),

        new Plato(
            'Bife estilo Campo',
            'https://www.lamejorparrilla.com/wp-content/uploads/2011/02/1470069659_1461178373bife-estilo-campo.png',
            'corte de carne de res que se cocina a la parrilla y se sazona con especias y hierbas frescas.',
            5000
        ),

        new Plato(
            'Achuras',
            'https://www.lamejorparrilla.com/wp-content/uploads/2011/02/1470069637_1461178564achuras.png',
            'Fina seleccion de las mejores achuras, mollejas chinchulines, riñones y morcillas',
            3500
        ),
        new Plato(
            'Entraña',
            'https://www.lamejorparrilla.com/wp-content/uploads/2017/11/don-julio-6.jpg',
            'Exquisita carne que se despega del costillar del asado. Es muy sabrosa y tierna, por lo general  se prefiere en entradas pero también va excelente como plato principal',
            5000
        ),

        new Plato(
            'Brochette de lomo',
            'https://i1.wp.com/lacabrera.com.ar/wp-content/uploads/2015/09/brochette-de-lomo-cebolla-y-panceta.jpg',
            'Un sabor delicioso y una buena opción para comer carne y vegetales.',
            5000
        ),
        new Plato(
            'Chivito',
            'https://www.lamejorparrilla.com/wp-content/uploads/2011/02/1470069323_1461178513chivito.png',
            'Prueba el mejor cabrio asado por expertos',
            6500
        ),

        new Plato(
            'Tabla de Chorizos',
            'https://www.lamejorparrilla.com/wp-content/uploads/2017/11/don-julio-3.jpg',
            'Deléitate con nuestra variedad de chorizos asados a la perfección. Acompañados de salsa, pan y opción de ensalada o papas fritas. ¡Una experiencia parrillera única!',
            6500
        ),
        new Plato(
            'Provoleta',
            'https://i1.wp.com/lacabrera.com.ar/wp-content/uploads/2015/09/PROVOLETA.jpg',
            'Sale antes o durante el asado, según los tiempos del parrillero. Es muy común que se la condimente con especias que le dan un excelente aroma y la convierten en tentadoras para cualquier comensal.',
            3500
        ),

        new Plato(
            'Empanadas',
            'https://i1.wp.com/lacabrera.com.ar/wp-content/uploads/2010/01/LC_Web_Headers_sept-04.jpg',
            'Sabrosas y calentitas, no te las podés perder. Son una excelente elección como entrada para que abra el apetito mientras esperamos lo que viene.',
            3500
        ),

        new Plato(
            'Ensaladas varias',
            'https://i1.wp.com/lacabrera.com.ar/wp-content/uploads/2015/09/ensalada-varias.jpg',
            'Para acompañar los platos que más te gustan te damos la oportunidad de combinarlas con tus verduras y gustos preferidos.',
            2500
        ),

        new Plato(
            'Verduras Asadas',
            'https://www.lamejorparrilla.com/wp-content/uploads/2017/11/don-julio-5.jpg',
            'Seleccion de las mejores Verduras de estacion asadas a su mejor punto. un deleite',
            2500
        )
    ];

    constructor() { }

    render() {
        const itemList = document.createElement('div');
        itemList.className = 'sliderWidth';
        for (const item of this.platos) {
            itemList.innerHTML += `
            <div class="item">
            <div class="card">
              <div class="cardImage"
                style="background:url('${item.imageUrl}');background-size: cover; background-repeat: no-repeat;background-position-x: center;">
              </div>
              <div class="cardText">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
              </div>
              <div class="cardPrecio">
                  <div class="value">\$${item.price}</div>
              </div> 
            </div> 
            </div>`;
        }
        return itemList;
    }

}


class App {
    static init() {
        const renderHook = document.querySelector('.sliderContainer');
        const platoList = new PlatoList();
        const platoListDiv= platoList.render();

        renderHook.append(platoListDiv);
    }
}

App.init();

// Platos Slider -------------------------

const leftBtn = document.querySelector('.btnLeft');

// querySelector('.btnLeft');
const rightBtn = document.querySelector('.btnRight');

let count = 0;
let inc = 0;
let margin = 0;
let slider = document.getElementsByClassName("sliderWidth")[0];
let itemDisplay = 0;
let item = document.getElementsByClassName("item");
let platoWindow = document.querySelector('.plato').clientWidth;


if (platoWindow >= 1300) {
    itemDisplay = document.getElementsByClassName("sliderContainer")[0].getAttribute('item-display-xl');
    margin = itemDisplay * 4;
};


if (platoWindow >= 1042 && platoWindow < 1300) {
    itemDisplay = document.getElementsByClassName("sliderContainer")[0].getAttribute('item-display-l');
    margin = itemDisplay * 5;
};


if (platoWindow >= 814 && platoWindow < 1042) {
    itemDisplay = document.getElementsByClassName("sliderContainer")[0].getAttribute('item-display-m');
    margin = itemDisplay * 6.8;
};

if (platoWindow >= 516 && platoWindow < 814) {
    itemDisplay = document.getElementsByClassName("sliderContainer")[0].getAttribute('item-display-s');
    margin = itemDisplay * 10;
};

if (platoWindow < 516) {
    itemDisplay = document.getElementsByClassName("sliderContainer")[0].getAttribute('item-display-xs');
    margin = itemDisplay * 20;

};

let itemLeft = item.length % itemDisplay;
let itemSlide = Math.floor(item.length / itemDisplay) - 1;


console.log(platoWindow + 'platoWindow');
console.log(itemDisplay + 'itemDisplay');
console.log(itemLeft + 'itemLeft');
console.log(itemSlide + 'itemSlide');
console.log(margin + 'margin');
console.log(inc + 'inc');
console.log(count + 'count');



for (const i of item) {
    i.style.width = (platoWindow / itemDisplay) - margin + "px";

}

leftBtn.addEventListener("click", () => {

    console.log(itemDisplay + 'itemDisplay');
    console.log(itemLeft + 'itemLeft');
    console.log(itemSlide + 'itemSlide');
    console.log(margin + 'margin');
    console.log(platoWindow + 'platoWindow');
    console.log(inc + 'inc');
    console.log(count + 'count');

    if (inc !== 0) {
        if (inc === itemLeft) {
            inc -= itemLeft;
            count += (platoWindow / itemDisplay) * itemLeft;
        } else {
            inc--;
            count += platoWindow;
        }
    }

    slider.style.left = count + "px";


})

rightBtn.addEventListener("click", () => {

    console.log(itemDisplay + 'itemDisplay');
    console.log(itemLeft + 'itemLeft');
    console.log(itemSlide + 'itemSlide');
    console.log(margin + 'margin');
    console.log(platoWindow + 'platoWindow');
    console.log(inc + 'inc');
    console.log(count + 'count');

    if (inc !== itemSlide + itemLeft) {
        if (inc === itemSlide) {
            inc += itemLeft;
            count -= (platoWindow / itemDisplay) * itemLeft;
        } else {
            inc++;
            count -= platoWindow;
        }
    }
    slider.style.left = count + "px";



})