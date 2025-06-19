import Repository from '../../repositories/city.repository.js';
import { ITEMS_MOCK_DATA } from '../../../../data/mocks/city.mock-data.js';

describe('CityRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new Repository(false);
    repository.repository.items = JSON.parse(JSON.stringify(ITEMS_MOCK_DATA));
  });

  describe('getItemById', () => {
    test('returns a city by ID', async () => {
      const expected = ITEMS_MOCK_DATA.find(item => item.id === 1);
      const item = await repository.getItemById(1);
      expect(item).toEqual(expected);
    });

    test('returns null if city not found', async () => {
      const item = await repository.getItemById(999);
      expect(item).toBeNull();
    });
  });

  describe('updateItem', () => {
    test('updates an existing city', async () => {
      const itemId = 1;
      const updatedData = { name: 'Updated City' };
      const expected = { ...ITEMS_MOCK_DATA.find(i => i.id === itemId), ...updatedData };
      const updatedItem = await repository.updateItem(itemId, updatedData);
      const item = await repository.getItemById(itemId);
      expect(updatedItem).toMatchObject(expected);
      expect(item.name).toBe('Updated City');
    });

    test('returns null if city not found', async () => {
      const result = await repository.updateItem(999, { name: 'none' });
      expect(result).toBeNull();
    });
  });

  describe('deleteItem', () => {
    test('returns null if city not found', async () => {
      const result = await repository.deleteItem(999);
      expect(result).toBeNull();
    });
  });
});
