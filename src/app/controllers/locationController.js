import { LocationService } from "../services/locationService.js";

export class LocationController {
    async search(req, res) {
        try {
            const { q = '' } = req.query;

            // Basic validation
            if (q.length < 2) {
                return res.status(400).json({ error: 'Search term must be at least 2 characters' });
            }
            // USA country id: 233
            const result = await LocationService.searchCities(q, { countryId: 233, limit: 10 });

            res.json(result);
        } catch (error) {
            console.error('Location search error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

// Instantiate and export default for easy import
export default new LocationController();