import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  it('should default missing audit and payment method values when creating a payment', async () => {
    const create = jest.fn();
    const save = jest.fn().mockResolvedValue({ id: 1 });
    const repo = { create, save } as any;

    const service = new PaymentService(repo);

    await service.create({
      amount: 2000,
      otherAmount: 0,
      invoiceNumber: 'INV-1',
      comments: 'test',
      billingMonth: '2',
      billingYear: '2026',
      status: 'Paid',
      customerId: 1,
      subscriptionId: 1,
      isActive: true,
      isDeleted: false,
      paymentMethod: 'Cash',
    } as any);

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 2000,
        customer: { customerid: 1 },
        subscription: { subscriptionid: 1 },
        createdBy: 0,
        updatedBy: 0,
        PaymentMethod: 'Cash',
      }),
    );
    expect(save).toHaveBeenCalled();
  });
});
