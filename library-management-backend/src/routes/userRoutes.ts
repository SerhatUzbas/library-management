import express from 'express';
import { UserRepository } from '../repositories/userRepository';
import { ApiResponse } from '../interfaces/ApiResponse';

const router = express.Router();
const userRepository = new UserRepository();


router.get('/', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const name = req.query.name as string | undefined;
    
    const result = await userRepository.findAll(page, limit, name);
    
    res.success('Users retrieved successfully', result);
  } catch (error) {
    res.error('Error fetching users', 500);
  }
});

router.get('/options', async (req, res) => {
  
  try {
    const users = await userRepository.findAll(1, 1000000);
    const options = users.users.map(user => ({
      label: user.name,
      value: String(user.id)
    }));
    res.success('Users retrieved successfully', options);
  } catch (error) {
    
    res.error('Failed to fetch usssssers', 500);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = await userRepository.findById(Number(req.params.id));
    if (!user) {
      return res.error('User not found', 404);
    }
    res.success('User retrieved successfully', user);
  } catch (error) {
    res.error('Error fetching user', 500);
  }
});

 router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const user = await userRepository.create({ name });
    res.success('User created successfully', user, 201);
  } catch (error) {
    res.error('Error creating user', 500);
  }
});

 router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const user = await userRepository.update(Number(req.params.id), { name });
    res.success('User updated successfully', user);
  } catch (error) {
    res.error('Error updating user', 500);
  }
});

 router.put('/:id/remove', async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = await userRepository.softDelete(userId);
    if (!user) {
      return res.error('User not found', 404);
    }
    res.success('User soft deleted successfully', user);
  } catch (error) {
    if (error instanceof Error && error.message === 'Cannot delete user with active borrows') {
      return res.error(error.message, 400);
    }
    res.error('Error soft deleting user', 500);
  }
});

 router.delete('/:id', async (req, res) => {
  try {
    await userRepository.delete(Number(req.params.id));
    res.success('User deleted successfully', null, 204);
  } catch (error) {
    if (error instanceof Error && error.message === 'Cannot delete user with active borrows') {
      return res.error(error.message, 400);
    }
    res.error('Error deleting user', 500);
  }
});




export default router; 