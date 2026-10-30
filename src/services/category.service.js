import { getCategories } from '../repositories/category.repository.js';

export const fetchCategories = async () => {
    return getCategories();
};
