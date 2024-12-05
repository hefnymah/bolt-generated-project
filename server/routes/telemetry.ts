import { Router } from 'express';
import { z } from 'zod';
import { logger } from '../utils/logger';
import { getVehicleTelemetry } from '../services/database';

const router = Router();

const DateRangeSchema = z.object({
  startDate: z.string(),
  endDate: z.string()
});

router.get('/:vehicleId', async (req, res) => {
  try {
    const { startDate, endDate } = DateRangeSchema.parse(req.query);
    const telemetry = await getVehicleTelemetry(req.params.vehicleId);
    res.json(telemetry);
  } catch (error) {
    logger.error(`Failed to get telemetry for vehicle ${req.params.vehicleId}:`, error);
    res.status(500).json({ error: 'Failed to get telemetry data' });
  }
});

export const telemetryRoutes = router;
