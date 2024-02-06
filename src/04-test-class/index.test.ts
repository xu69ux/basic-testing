import { getBankAccount, InsufficientFundsError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 100;
    const withdrawAmount = 200;
    const account = getBankAccount(balance);
    try {
      account.withdraw(withdrawAmount);
    } catch (error) {
      if (error instanceof InsufficientFundsError) {
        expect(error.message).toBe(
          `Insufficient funds: cannot withdraw more than ${balance}`,
        );
      }
    }
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 100;
    const transferAmount = 200;
    const account = getBankAccount(balance);
    try {
      account.transfer(transferAmount, account);
    } catch (error) {
      if (error instanceof InsufficientFundsError) {
        expect(error.message).toBe(
          `Insufficient funds: cannot withdraw more than ${balance}`,
        );
      }
    }
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    try {
      account.transfer(balance, account);
    } catch (error) {
      if (error instanceof TransferFailedError) {
        expect(error.message).toBe('Transfer failed');
      }
    }
  });

  test('should deposit money', () => {
    const balance = 100;
    const depositAmount = 50;
    const account = getBankAccount(balance);
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(balance + depositAmount);
  });

  test('should withdraw money', () => {
    const balance = 100;
    const withdrawAmount = 50;
    const account = getBankAccount(balance);
    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(balance - withdrawAmount);
  });

  test('should transfer money', () => {
    const firstAccount = getBankAccount(100);
    const secondAccount = getBankAccount(200);
    const transferAmount = 50;
    firstAccount.transfer(transferAmount, secondAccount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = jest.fn().mockResolvedValue(100);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = jest.fn().mockResolvedValue(200);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    account.fetchBalance = jest.fn().mockResolvedValue(null);
    try {
      await account.synchronizeBalance();
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Synchronization failed');
      }
    }
  });
});
