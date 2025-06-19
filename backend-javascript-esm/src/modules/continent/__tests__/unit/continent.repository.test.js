import Repository from '../../repositories/continent.repository.js';
import { ITEMS_MOCK_DATA } from '../../../../data/mocks/continent.mock-data.js';

describe('ContinentRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new Repository(false);
    repository.repository.items = JSON.parse(JSON.stringify(ITEMS_MOCK_DATA));
  });

  describe('getItemById', () => {
    test('returns a continent by ID', async () => {
      const expected = ITEMS_MOCK_DATA.find(item => item.id === 1000);
      const item = await repository.getItemById(1000);
      expect(item).toEqual(expected);
    });

    test('returns null if continent not found', async () => {
      const item = await repository.getItemById(9999);
      expect(item).toBeNull();
    });
  });

  describe('updateItem', () => {
    test('updates an existing continent', async () => {
      const itemId = 1000;
      const updatedData = { name: 'Updated Continent' };
      const expected = { ...ITEMS_MOCK_DATA.find(i => i.id === itemId), ...updatedData };
      const updatedItem = await repository.updateItem(itemId, updatedData);
      const item = await repository.getItemById(itemId);
      expect(updatedItem).toMatchObject(expected);
      expect(item.name).toBe('Updated Continent');
    });

    test('returns null if continent not found', async () => {
      const result = await repository.updateItem(9999, { name: 'none' });
      expect(result).toBeNull();
    });
  });

  describe('deleteItem', () => {
    test('returns null if continent not found', async () => {
      const result = await repository.deleteItem(9999);
      expect(result).toBeNull();
    });
  });
});
