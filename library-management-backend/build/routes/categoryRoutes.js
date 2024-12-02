"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryRepository_1 = require("../repositories/categoryRepository");
const router = express_1.default.Router();
const categoryRepository = new categoryRepository_1.CategoryRepository();
// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await categoryRepository.getAllCategories();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});
// Get category by ID
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const category = await categoryRepository.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
});
// Create new category
router.post('/', async (req, res) => {
    try {
        const categoryData = req.body;
        const newCategory = await categoryRepository.createCategory(categoryData);
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
});
// Update category
router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const categoryData = req.body;
        const updatedCategory = await categoryRepository.updateCategory(id, categoryData);
        res.json(updatedCategory);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
});
// Delete category
router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await categoryRepository.deleteCategory(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
});
exports.default = router;
