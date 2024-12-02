import express from 'express';
import { CategoryRepository } from '../repositories/categoryRepository';

const router = express.Router();
const categoryRepository = new CategoryRepository();

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoryRepository.createCategory({ name });
    res.success('Category created successfully', category, 201);
  } catch (error) {
    res.error('Failed to create category');
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await categoryRepository.getAllCategories();
    res.success('Categories retrieved successfully', categories);
  } catch (error) {
    res.error('Failed to fetch categories');
  }
});

router.get('/options', async (req, res) => {
  try {
    const categories = await categoryRepository.getAllCategories();
    const options = categories.map(category => ({
      label: category.name,
      value: String(category.id)
    }));
    res.success('Categories retrieved successfully', options);
  } catch (error) {
    res.error('Failed to fetch categories');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await categoryRepository.getCategoryById(parseInt(req.params.id));
    if (!category) {
      return res.error('Category not found', 404);
    }
    res.success('Category retrieved successfully', category);
  } catch (error) {
    res.error('Failed to fetch category');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await categoryRepository.updateCategory(categoryId, req.body);
    if (!category) {
      return res.error('Category not found', 404);
    }
    res.success('Category updated successfully', category);
  } catch (error) {
    res.error('Failed to update category');
  }
});

router.put('/:id/remove', async (req, res) => {
  try {
    const categoryId = Number(req.params.id);
    const category = await categoryRepository.softDelete(categoryId);
    if (!category) {
      return res.error('Category not found', 404);
    }
    res.success('Category soft deleted successfully', category);
  } catch (error) {
    res.error('Error soft deleting category', 500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    await categoryRepository.deleteCategory(categoryId);
    res.success('Category deleted successfully', null, 204);
  } catch (error) {
    res.error('Failed to delete category');
  }
});

export default router; 