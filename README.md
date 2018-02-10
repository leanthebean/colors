# ERC-721 Token Tutorial - Color Tokens!

### Set Up 
First, make sure you have nodejs v8, git, and metamask installed    
- Node.js v8 (and npm) from https://nodejs.org/ (check your version by typing “node -v” in your terminal, if it’s below 7.6, please upgrade)
- Git from https://git-scm.com/ 
- Metamask from https://metamask.io/ 

Next up, start installing some global dependencies. We'll need testrpc and truffle for this tutorial   
- `npm install -g ethereumjs-testrpc`
- `npm install -g truffle`

Next is to clone/download this repository and install all the node dependencies
1. `git clone git@github.com:leanthebean/colors.git`
2. `cd colors`
3. `npm install`

### Using Truffle + OpenZeppelin to write out our ERC-721 contract to mint Colors 
We're going to inherit the implemented ERC-721 contract from OpenZeppelin      
https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/token/ERC721/ERC721Token.sol

As well as their Ownable implementation    
https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/ownership/Ownable.sol

We already have access to these when we did `npm install` as OpenZeppelin was already a dependency in package.json

In the colors directory, type  
4. `truffle init` 

Notice that truffle now added 3 directories: `contracts`, `migrations`, and `test`

Open up your favorite IDE (I use VisualStudio with a Solidity plugin) and go into the contracts directory. Let's begin! 

5. Create a new file called `ColorsERC721.sol` in the `contracts` directory    
6. Create a new file called `ColorsERC721Test.js` in the `test` directory 
7. Create a new file called `2_migrate_contract.js` in the `migrations` directory 

8. Follow the vide/workshop steps to implement and test your contract, and once you do, the UI included in this tutorial should work with your contract :) 

Workshop slides: https://docs.google.com/presentation/d/11ebTVQnl_0K9I2WWaUjtV5YPdH9yCOga5kqhZdSI308/edit?ts=5a83a50e#slide=id.g30fce2c670_0_0 

Video of the workshop
https://www.facebook.com/ETHDenver/videos/164729944178073/

Happy hacking! 
