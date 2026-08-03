import { PermissionService } from './permission.service';

describe('PermissionService', () => {
  it('should default audit values when creating a permission without them', async () => {
    const create = jest.fn();
    const save = jest.fn().mockResolvedValue({ permissionid: 1 });
    const repo = { create, save } as any;

    const service = new PermissionService(repo);

    await service.create({
      name: 'view_users',
      isActive: true,
      isDeleted: false,
    } as any);

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'view_users',
        isActive: true,
        isDeleted: false,
        createdBy: 0,
        updatedBy: 0,
      }),
    );

    const createdPayload = create.mock.calls[0][0];
    expect(createdPayload.createdAt).toBeInstanceOf(Date);
    expect(createdPayload.updatedAt).toBeInstanceOf(Date);
    expect(createdPayload.createdAt.toString()).not.toBe('Invalid Date');
    expect(createdPayload.updatedAt.toString()).not.toBe('Invalid Date');
    expect(save).toHaveBeenCalled();
  });
});
