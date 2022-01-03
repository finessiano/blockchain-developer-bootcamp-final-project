### Access Control Design Patterns

I use access control design pattern in my contract by inheriting from another contract that restricts access to 
sensitive functions when `onlyoWner` is used in the function header. The purpose of this is to make sure that 
only the owner of the contract (the oracle contract in production) can call the `reportResult` function. 

### Inheritance and Interfaces

My contract intherits from OpenZeppelin's `Ownable.sol` to implement access control 
the right way. I used this library because it is a well-known, batlle-tested solution.



