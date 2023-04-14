class ProductManager {
  #id;
  #products;

  constructor() {
    this.#id = 0;
    this.#products = [];
  }

  getProducts() {
    return this.#products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const hasNullParameter =
      (title && description && price && thumbnail && code && stock) ?? false;

    if (!hasNullParameter) {
      console.log("Error: debe completar todos los campos");
    } else {
      if (this.#products.some((product) => product.code === code)) {
        console.log("Error: el campo code esta repetido");
      } else {
        const product = {
          id: this.#id++,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };

        this.#products.push(product);
      }
    }
  }

  getProductById(id) {
    const product = this.#products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Not found");
    }
  }
}

// Testeos
const productManager = new ProductManager();

console.log(productManager.getProducts());

// con un campo nulo
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",

  "Sin imagen",
  "abc123",
  25
);

// ingresado correctamente
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

// repito el codigo del prod para que no me ingrese nada
productManager.addProduct(
  "otro producto prueba",
  "Este es otro producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

// ingreso otro prod
productManager.addProduct(
  "otro producto prueba",
  "Este es otro producto prueba",
  200,
  "Sin imagen",
  "abc124",
  25
);

// obtengo productos
console.log(productManager.getProducts());

// obtengo por id
productManager.getProductById(0);
