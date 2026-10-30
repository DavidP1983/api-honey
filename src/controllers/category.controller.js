import { fetchCategories } from '../services/category.service.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await fetchCategories();

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            code: 'CATEGORIES_FETCH_FAILED',
            message: 'Failed to fetch categories',
        });
    }
};
