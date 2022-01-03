### Avoiding Comman Attacks

My contract is using a specific compiler pragma and using the `require` function for sanity checks before executing 
key lines of code. Implemented a pull method for users to claim their winnings and 
in order to avoid re-entrancy attacks, the user balances within the contract are first updated before funds are sent.
I have used `.call` instead of `.transfer` or `.send` as it is not recommended to use these in 2021.
