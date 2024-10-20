// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 100;
  const depositSum = 10;
  const withdrawSum = 50;
  const bankAccount = getBankAccount(initialBalance);
  const anotherAccount = getBankAccount(10);

  // const newFetchedBalance = 5000;

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(initialBalance + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      bankAccount.transfer(initialBalance + 10, anotherAccount),
    ).toThrow(new InsufficientFundsError(initialBalance));
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(initialBalance / 2, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const balance = bankAccount.getBalance();
    bankAccount.deposit(depositSum);
    expect(bankAccount.getBalance()).toBe(balance + depositSum);
  });

  test('should withdraw money', () => {
    const balance = bankAccount.getBalance();
    bankAccount.withdraw(withdrawSum);
    expect(bankAccount.getBalance()).toBe(balance - withdrawSum);
  });

  test('should transfer money', () => {
    const balance = bankAccount.getBalance();
    bankAccount.transfer(withdrawSum, anotherAccount);
    expect(bankAccount.getBalance()).toBe(balance - withdrawSum);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(100);
    const balance = await bankAccount.fetchBalance();
    expect(balance).toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(100);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockReturnValue(Promise.resolve(null));

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
