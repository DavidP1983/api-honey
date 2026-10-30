import {
    getProductById,
    getProducts,
    getRelatedProducts,
} from '../repositories/product.repository.js';

const fetchProducts = async (page, limit) => {
    return getProducts(page, limit);
};

const fetchProductById = async (id) => {
    return getProductById(id);
};

const fetchRelatedProducts = async (id, limit = 3) => {
    return getRelatedProducts(id, limit);
};

export { fetchProductById, fetchProducts, fetchRelatedProducts };
