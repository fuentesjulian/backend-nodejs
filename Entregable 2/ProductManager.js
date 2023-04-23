const fs = require("fs").promises;

class ProductManager {
  // ProductManager siempre devuelve un objeto
  // el objeto siempre tiene una propiedad que se llama error,
  // que sirve para checkear si hubo un erro en el proceso

  // el constructor recibe el path del archivo
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      // si puede leer, error es falso y devuelve los productos
      return { error: false, products };
    } catch (error) {
      // si hay un error, checkea si el file existe con codigo de error ENOENT
      // si el file no existe, devuelve un array vacio, con error false
      if (error.code === "ENOENT") return { error: false, products: [] };
      // si hay otro codigo de error, devuelve un error
      return { error: true };
    }
  }
  //
  async addProduct(product) {
    // primero checkeo que todas las keys necesarias existan
    const requiredKeys = [
      "title",
      "description",
      "price",
      "thumbnail",
      "code",
      "stock",
    ];

    const objectKeys = Object.keys(product);
    let hasRequiredKeys = true;
    requiredKeys.forEach((key) => {
      if (!objectKeys.includes(key)) return (hasRequiredKeys = false);
    });

    if (!hasRequiredKeys) return { error: true };
    // primero corro la query para obtener todos los productos
    const productQuery = await this.getProducts();
    // checkeo si hubo un error, si hay error, devuelvo error
    if (productQuery.error) return { error: true };
    // si no ahy error, obtengo los productos del query
    const products = productQuery.products;
    // creo el id, que es el ultimo id del array+1 si el array tiene elementos
    // si no tiene elementos, el id es 1
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    // le agrego la propiedad id al objeto product
    product = { ...product, id };
    // agrego el objeto product al array product
    products.push(product);
    // convierto en string de JSON
    const data = JSON.stringify(products, null, 2);
    try {
      // si puedo grabar no hay error, y devuelvo el producto agregado que ahora tiene el id
      await fs.writeFile(this.path, data);
      return { error: false, product };
    } catch (error) {
      // si no puedo grabar devuelvo error
      return { error: true };
    }
  }

  async getProductById(id) {
    // misma logica para obtener el array de productos
    const productQuery = await this.getProducts();
    if (productQuery.error) return { error: true };
    const products = productQuery.products;
    // busco el producto
    const product = products.find((prod) => prod.id === id) ?? false;
    // si existe el producto devuelvo el producto
    if (product) return { error: false, product };
    // si no lo encuentro devuelvo error
    return { error: true };
  }

  async updateProduct(id, productData) {
    // misma logica para obtener el array de productos
    const productQuery = await this.getProducts();
    if (productQuery.error) return { error: true };
    let products = productQuery.products;
    // con un map actualizo unicamente el producto que matchea con mi id
    products = products.map((prod) => {
      // si hace match devuelvo el producto actualizado
      if (prod.id === id) return { ...prod, ...productData };
      // si no hace match devuelvo el producto sin cambios
      return prod;
    });

    // misma logica para grabar que con addProduct
    const data = JSON.stringify(products, null, 2);
    try {
      await fs.writeFile(this.path, data);
      return { error: false, id };
    } catch (error) {
      return { error: true };
    }
  }

  async deleteProduct(id) {
    // misma logica para obtener el array de productos
    const productQuery = await this.getProducts();
    if (productQuery.error) return { error: true };
    let products = productQuery.products;
    // filtro el array de productos excluyendo el producto que tiene el id que le paso como parametro
    products = products.filter((prod) => prod.id != id);
    // misma logica para grabar que con addProduct
    const data = JSON.stringify(products, null, 2);
    try {
      await fs.writeFile(this.path, data);
      return { error: false, id };
    } catch (error) {
      return { error: true };
    }
  }
}

const test = async () => {
  const prodPath = "./products.txt";
  // borro el file para comenzar el testeo
  await fs.unlink(prodPath);
  // creo la clase
  const productManager = new ProductManager(prodPath);

  const testGetProducts = async () => {
    console.log("##########");
    console.log("Testeo de getProducts");
    const prodQuery = await productManager.getProducts();
    if (prodQuery.error) {
      console.log("Devolvio error");
    } else {
      const products = prodQuery.products;
      console.log(products);
    }
  };

  const testAddProdError = async () => {
    console.log("##########");
    console.log("Testeo de addProducts con keys faltantes");
    const prod = {
      title: "Solo pongo el titulo, faltan keys",
    };
    const result = await productManager.addProduct(prod);
    console.log(result);
  };

  const testAddProd = async () => {
    console.log("##########");
    console.log("Testeo de addProducts con todas las keys");
    const prod = {
      title: "Producto prueba",
      description: "Este es un producto de prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    };
    const result = await productManager.addProduct(prod);
    console.log(result);
  };

  const testUpdatedProd = async () => {
    console.log("##########");
    console.log("Testeo de updateProduct");
    const id = 3;
    const prodData = {
      title: "Nuevo titulo",
      description: "Nueva descripcion",
    };
    const result = await productManager.updateProduct(id, prodData);
    console.log(result);
  };

  const testDeleteProd = async () => {
    console.log("##########");
    console.log("Testeo de deleteProduct");
    const id = 2;
    const result = await productManager.deleteProduct(id);
    console.log(result);
  };

  console.log("COMIENZO DE TESTS");
  await testGetProducts();
  await testAddProdError();
  await testAddProd();
  await testAddProd();
  await testAddProd();
  await testAddProd();
  await testUpdatedProd();
  await testDeleteProd();
  await testGetProducts();
  console.log("FIN DE TESTS");
};

test();
