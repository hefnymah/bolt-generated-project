import { Router } from 'express';
import { z } from 'zod';
import { logger } from '../utils/logger';
import { emissionsContainer } from '../services/database';

const router = Router();

const EmissionsQuerySchema = z.object({
  vehicleId: z.string().optional(),
  startDate: z.string(),
  endDate: z.string()
});

router.get('/', async (req, res) => {
  try {
    const query = EmissionsQuerySchema.parse(req.query);
    
    let querySpec = {
      query: 'SELECT * FROM c WHERE c._ts >= @startDate AND c._ts <= @endDate',
      parameters: [
        { name: '@startDate', value: new Date(query.startDate).getTime() },
        { name: '@endDate', value: new Date(query.endDate).getTime() }
      ]
    };

    if (query.vehicleId) {
      querySpec.query += ' AND c.vehicleId = @vehicleId';
      querySpec.parameters.push({ name: '@vehicleId', value: query.vehicleId });
    }

    const { resources } = await emissionsContainer.items.query(querySpec).fetchAll();
    res.json(resources);
  } catch (error) {
    logger.error('Failed to get emissions data:', error);
    res.status(500).json({ error: 'Failed to get emissions data' });
  }
});

export const emissionsRoutes = router;
