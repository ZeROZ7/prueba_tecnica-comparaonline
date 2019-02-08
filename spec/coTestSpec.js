const expect = require('chai').expect;

const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;

describe("Co Test", function() {

  it("Prueba general - paso de 1 dia", function() {
    const coTest = 
    	  new CarInsurance([ 
    	  new Product('Medium Coverage', 10, 20),
     	  new Product('Full Coverage', 2, 0),
     	  new Product('Low Coverage', 5, 7),
     	  new Product('Mega Coverage', 0, 80),
     	  new Product('Mega Coverage', -1, 80),
	      new Product('Special Full Coverage', 15, 20),
	      new Product('Special Full Coverage', 10, 10),
	      new Product('Special Full Coverage', 3, 10),
	      new Product('Special Full Coverage', 2, 10),
	      new Product('Super Sale', 3, 6)
    	]);

    const dia_esperado 	  = [9,1,4,-1,-2,14,9,2,1,2];
    const precio_esperado = [19,1,6,80,80,21,12,13,13,4];

    var products = coTest.updatePrice();

    products.forEach( (product, i) => {
      expect(product.sellIn).equal(dia_esperado[i]);
      expect(product.price).equal(precio_esperado[i]);
    });
  });

  it("Contador Dias es < 1", function(){
    const coTest = 
    	  new CarInsurance([ 
    	  new Product('Medium Coverage', 0, 20),
     	  new Product('Full Coverage', 0, 0),
     	  new Product('Low Coverage', 0, 7),
     	  new Product('Mega Coverage', 0, 80),
	      new Product('Special Full Coverage', 0, 20),
	      new Product('Super Sale', 0, 6)
    	]);

    const dia_esperado = [-1,-1,-1,-1,-1,-1];
    const precio_esperado = [18,1,5,80,0,4];

    var products = coTest.updatePrice();

    products.forEach( (product, i) => {
      expect(product.sellIn).equal(dia_esperado[i]);
      expect(product.price).equal(precio_esperado[i]);
    });
  });

  it("Precio siempre >= 0", function(){
    const coTest = 
    	  new CarInsurance([ 
    	  new Product('Medium Coverage', 0, 0),
     	  new Product('Full Coverage', 0, 0),
     	  new Product('Low Coverage', 0, -1),
     	  new Product('Mega Coverage', 0, 80),
	      new Product('Special Full Coverage', 0, 0),
	      new Product('Super Sale', 0, 0)
    	]);

    const dia_esperado = [-1,-1,-1,-1,-1,-1];
    const precio_esperado = [0,1,0,80,0,0];

    var products = coTest.updatePrice();

    products.forEach( (product, i) => {
      expect(product.sellIn).equal(dia_esperado[i]);
      expect(product.price).equal(precio_esperado[i]);
    });
  });

  it("Precio siempre <= 50", function(){
    const coTest = 
    	  new CarInsurance([ 
    	  new Product('Medium Coverage', 0, 60),
     	  new Product('Full Coverage', 0, 50),
     	  new Product('Low Coverage', 0, 50),
     	  new Product('Mega Coverage', 0, 80),
	      new Product('Special Full Coverage', 9, 49),
	      new Product('Special Full Coverage', 4, 49),
	      new Product('Special Full Coverage', 0, 50),
	      new Product('Special Full Coverage', 15, 50),
	      new Product('Super Sale', 10, 60)
    	]);

    const dia_esperado = [-1,-1,-1,-1,8,3,-1,14,9];
    const precio_esperado = [50,50,48,80,50,50,0,50,50];

    var products = coTest.updatePrice();

    products.forEach( (product, i) => {
      expect(product.sellIn).equal(dia_esperado[i]);
      expect(product.price).equal(precio_esperado[i]);
    });
  });

  it("Mega no baja precio", function(){
    const coTest = 
    	  new CarInsurance([ 
     	  new Product('Mega Coverage', 0, 80),
     	  new Product('Mega Coverage', -2, 80),
     	  new Product('Mega Coverage', 10, 80),
     	  new Product('Mega Coverage', 20, 80),
    	]);

    const dia_esperado = [-1,-3,9,19];
    const precio_esperado = [80,80,80,80];

    var products = coTest.updatePrice();

    products.forEach( (product, i) => {
      expect(product.sellIn).equal(dia_esperado[i]);
      expect(product.price).equal(precio_esperado[i]);
    });
  });

  it("Special entre 10 y 5 dias", function(){
    const coTest = 
    	  new CarInsurance([ 
	      new Product('Special Full Coverage', 15, 10),
		  new Product('Special Full Coverage', 10, 10),
		  new Product('Special Full Coverage', 6, 10),		  
    	]);

    const dia_esperado = [14,9,5];
    const precio_esperado = [11,12,12];

    var products = coTest.updatePrice();

    products.forEach( (product, i) => {
      expect(product.sellIn).equal(dia_esperado[i]);
      expect(product.price).equal(precio_esperado[i]);
    });
  });

  it("Special entre 5 y 0 dias", function(){
    const coTest = 
    	  new CarInsurance([ 
	      new Product('Special Full Coverage', 5, 10),
		  new Product('Special Full Coverage', 3, 10),
		  new Product('Special Full Coverage', 0, 10),
    	]);

    const dia_esperado = [4,2,-1];
    const precio_esperado = [13,13,0];

    var products = coTest.updatePrice();

    products.forEach( (product, i) => {
      expect(product.sellIn).equal(dia_esperado[i]);
      expect(product.price).equal(precio_esperado[i]);
    });
  });

  it("Super resta doble a precio", function(){
    const coTest = 
    	  new CarInsurance([ 
	      new Product('Super Sale', 15, 2),
		  new Product('Super Sale', -5, 18),
		  new Product('Super Sale', 30, 0),
    	]);

    const dia_esperado = [14,-6,29];
    const precio_esperado = [0,16,0];

    var products = coTest.updatePrice();

    products.forEach( (product, i) => {
      expect(product.sellIn).equal(dia_esperado[i]);
      expect(product.price).equal(precio_esperado[i]);
    });
  });

});
