App = {
  web3Provider: null,
  contracts: {},
  currentColor: null,

  init: function() {
    App.generateNewColor()
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('ColorsERC721.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var TutorialTokenArtifact = data;
      App.contracts.TutorialToken = TruffleContract(TutorialTokenArtifact);

      // Set the provider for our contract.
      App.contracts.TutorialToken.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getColorForUser();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#mintColors', App.mintColors);
    $(document).on('click', '#color', App.generateNewColor);
  },

  generateNewColor: function(event) { 
    document.getElementById('color').setAttribute('style', 'background-color: ' + App.getRandomColor())
  },

  mintColors: function(event) {
    event.preventDefault();

    var colorContractInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      App.contracts.TutorialToken.deployed().then(function(instance) {
        colorContractInstance = instance;
        return colorContractInstance.mint(parseInt(App.currentColor, 16), {from: account, value: new web3.BigNumber(web3.toWei(.001, "ether"))});
      }).then(function(result) {
        App.addColorBlock(new web3.BigNumber(parseInt(App.currentColor, 16)))
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getColorForUser: function() {
    var colorContractInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.TutorialToken.deployed().then(function(instance) {
        colorContractInstance = instance;
        return colorContractInstance.tokensOf(account)
      }).then((result) => { 
        result.forEach((bigIntColor) => { 
          App.addColorBlock(bigIntColor)
        })
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  addColorBlock: function (bigIntColor) { 
    let mainelement = document.createElement('div')
    let textElement = document.createElement('p')
    mainelement.setAttribute('style', 'display:inline-block;')
    let element = document.createElement('div')
    let colorString = "#" + "0".repeat(Math.max(0, 6 - bigIntColor.toNumber().toString(16).length)) + bigIntColor.toNumber().toString(16)
    textElement.innerText = colorString;
    element.setAttribute('style', 'background-color:' + colorString)
    element.setAttribute('class', "color-blocks")
    mainelement.appendChild(element)
    mainelement.appendChild(textElement)
    document.querySelector('#owner-colors').appendChild(mainelement)
  },

  getRandomColor: function() {
    var letters = '0123456789ABCDEF';
    let color = "";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    App.currentColor = color;
    return "#" + color;
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
