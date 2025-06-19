import Service from '../../services/country.service.js';
import { ITEM_CONSTANTS } from '../../constants/country.constant.js';

describe('CountryService', () => {
  let service;
  let repository;

  beforeEach(() => {
    repository = {
      getItemById: jest.fn(),
      createItem: jest.fn(),
      updateItem: jest.fn(),
      deleteItem: jest.fn(),
      existsByName: jest.fn(),
      getItems: jest.fn(),
    };
    service = new Service(repository);
  });

  test('createItem throws when name already exists', async () => {
    repository.existsByName.mockResolvedValue(true);
    await expect(service.createItem({ name: 'France' }))
      .rejects.toThrow(ITEM_CONSTANTS.ALREADY_EXISTS);
  });

  test('createItem creates a valid item', async () => {
    const data = { name: 'Germany' };
    const created = { id: 3, name: 'Germany' };
    repository.existsByName.mockResolvedValue(false);
    repository.createItem.mockResolvedValue(created);

    const result = await service.createItem(data);
    expect(result).toEqual(created);
  });

  test('getItemById throws when not found', async () => {
    repository.getItemById.mockResolvedValue(null);
    await expect(service.getItemById(999)).rejects.toThrow(ITEM_CONSTANTS.NOT_FOUND);
  });

  test('getItemById returns a country', async () => {
    const item = { id: 1, name: 'France' };
    repository.getItemById.mockResolvedValue(item);
    await expect(service.getItemById(1)).resolves.toEqual(item);
  });

  test('updateItem updates a country', async () => {
    const updated = { id: 1, name: 'Updated' };
    repository.updateItem.mockResolvedValue(updated);
    await expect(service.updateItem(1, { name: 'Updated' })).resolves.toEqual(updated);
  });

  test('updateItem throws when not found', async () => {
    repository.updateItem.mockResolvedValue(null);
    await expect(service.updateItem(999, { name: 'none' }))
      .rejects.toThrow(ITEM_CONSTANTS.NOT_FOUND);
  });

  test('deleteItem removes a country', async () => {
    const deleted = { id: 2, name: 'Spain' };
    repository.deleteItem.mockResolvedValue(deleted);
    const result = await service.deleteItem(2);
    expect(result).toEqual(deleted);
  });

  test('deleteItem throws when not found', async () => {
    repository.deleteItem.mockResolvedValue(null);
    await expect(service.deleteItem(999)).rejects.toThrow(ITEM_CONSTANTS.NOT_FOUND);
  });
});
