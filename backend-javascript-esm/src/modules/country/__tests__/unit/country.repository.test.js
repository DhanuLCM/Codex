import Repository from '../../repositories/country.repository.js';
import { ITEMS_MOCK_DATA } from '../../../../data/mocks/country.mock-data.js';

describe('CountryRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new Repository(false);
    repository.repository.items = JSON.parse(JSON.stringify(ITEMS_MOCK_DATA));
  });

  describe('getItemById', () => {
    test('returns a country by ID', async () => {
      const expected = ITEMS_MOCK_DATA.find(item => item.id === 1);
      const item = await repository.getItemById(1);
      expect(item).toEqual(expected);
    });

    test('returns null if country not found', async () => {
      const item = await repository.getItemById(999);
      expect(item).toBeNull();
    });
  });

  describe('updateItem', () => {
    test('updates an existing country', async () => {
      const itemId = 1;
      const updatedData = { name: 'Updated Country' };
      const expected = { ...ITEMS_MOCK_DATA.find(i => i.id === itemId), ...updatedData };
      const updatedItem = await repository.updateItem(itemId, updatedData);
      const item = await repository.getItemById(itemId);
      expect(updatedItem).toMatchObject(expected);
      expect(item.name).toBe('Updated Country');
    });

    test('returns null if country not found', async () => {
      const result = await repository.updateItem(999, { name: 'none' });
      expect(result).toBeNull();
    });
  });

  describe('deleteItem', () => {
    test('returns null if country not found', async () => {
      const result = await repository.deleteItem(999);
      expect(result).toBeNull();
    });
  });
});
