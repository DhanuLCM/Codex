import Service from '../../services/continent.service.js';
import { ITEM_CONSTANTS } from '../../constants/continent.constant.js';

describe('ContinentService', () => {
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
    await expect(service.createItem({ name: 'Europe' }))
      .rejects.toThrow(ITEM_CONSTANTS.ALREADY_EXISTS);
  });

  test('createItem creates a valid item', async () => {
    const data = { name: 'America' };
    const created = { id: 10, name: 'America' };
    repository.existsByName.mockResolvedValue(false);
    repository.createItem.mockResolvedValue(created);

    const result = await service.createItem(data);
    expect(result).toEqual(created);
  });

  test('getItemById throws when not found', async () => {
    repository.getItemById.mockResolvedValue(null);
    await expect(service.getItemById(999))
      .rejects.toThrow(ITEM_CONSTANTS.NOT_FOUND);
  });

  test('getItemById returns a continent', async () => {
    const item = { id: 1000, name: 'Africa' };
    repository.getItemById.mockResolvedValue(item);
    await expect(service.getItemById(1000)).resolves.toEqual(item);
  });

  test('updateItem updates a continent', async () => {
    const updated = { id: 1000, name: 'Updated' };
    repository.updateItem.mockResolvedValue(updated);
    await expect(service.updateItem(1000, { name: 'Updated' })).resolves.toEqual(updated);
  });

  test('updateItem throws when not found', async () => {
    repository.updateItem.mockResolvedValue(null);
    await expect(service.updateItem(999, { name: 'none' }))
      .rejects.toThrow(ITEM_CONSTANTS.NOT_FOUND);
  });

  test('deleteItem removes a continent', async () => {
    const deleted = { id: 1004, name: 'Europe' };
    repository.deleteItem.mockResolvedValue(deleted);
    const result = await service.deleteItem(1004);
    expect(result).toEqual(deleted);
  });

  test('deleteItem throws when not found', async () => {
    repository.deleteItem.mockResolvedValue(null);
    await expect(service.deleteItem(999))
      .rejects.toThrow(ITEM_CONSTANTS.NOT_FOUND);
  });
});
