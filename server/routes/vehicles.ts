import { Router } from 'express';
import { z } from 'zod';
import { logger } from '../utils/logger';
import { vehiclesContainer } from '../services/database';

const router = Router();

const VehicleSchema = z.object({
  id: z.string(),
  plateNumber: z.string(),
  model: z.string(),
  status: z.enum(['active', 'inactive', 'maintenance']),
  lastUpdate: z.string()
});

router.get('/', async (req, res) => {
  try {
    const { resources } = await vehiclesContainer.items.readAll().fetchAll();
    res.json(resources);
  } catch (error) {
    logger.error('Failed to get vehicles:', error);
    res.status(500).json({ error: 'Failed to get vehicles' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { resource } = await vehiclesContainer.item(req.params.id).read();
    if (!resource) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json(resource);
  } catch (error) {
    logger.error(`Failed to get vehicle ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to get vehicle' });
  }
});

router.post('/', async (req, res) => {
  try {
    const vehicle = VehicleSchema.parse(req.body);
    const { resource } = await vehiclesContainer.items.create(vehicle);
    res.status(201).json(resource);
  } catch (error) {
    logger.error('Failed to create vehicle:', error);
    res.status(400).json({ error: 'Invalid vehicle data' });
  }
});

export const vehicleRoutes = router;
