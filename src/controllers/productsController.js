const {loadProducts, storeProduct} = require('../data/dbmodule')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const products = loadProducts();
		return res.render('products', {
			products,
			toThousand
		})
	},

	detail: (req, res) => {
		const products = loadProducts();
		let product = products.find(product => product.id === +req.params.id);
		return res.render('detail', {
			product,
			toThousand
		})
	},

	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	store: (req, res) => {
		const {name, price, discount, description, category} = req.body;
		const products = loadProducts();

		const newProduct = {
			id : products[products.length - 1].id + 1,
			name : name.trim(),
			price : +price,
			description : description.trim(),
			discount : +discount,
			category,
			image: 'default-image.png',
		}
		let productsModify = [...products, newProduct];
		storeProduct(productsModify);

		return res.redirect('/products')
	},
	edit: (req, res) => {
	const products = loadProducts();
		const productToEdit = loadProducts().find(product => product.id === +req.params.id);
		return res.render('product-edit-form', {
			productToEdit,
			products
		})
	},
	update: (req, res) => {
		const products = loadProducts();
		const {name, price, discount, description, category} = req.body;
		let productsModify = loadProducts().map(product => {
			if(product.id === +req.params.id){
				return{
					id : product.id,
					name : name.trim(),
					price : +price,
					description : description.trim(),
					discount : +discount,
					category,
					image: product.image,
				}
			}
			return product;
		});
		storeProduct(productsModify);
		return res.redirect('/products/detail/' + req.params.id);
	},
	destroy : (req, res) => {
		let productsModify = loadProducts().filter(product => product.id !==+req.params.id)
		storeProduct(productsModify);
		return res.redirect('/products');
	}
};

module.exports = controller;