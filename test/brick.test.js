const BrickToken = artifacts.require("brickToken");



contract("brickToken", (accounts) => {
  let contractInstance;
  beforeEach(async () => {
    contractInstance = await BrickToken.new();
  });

  context("initial checks", async() => {
    it("should return correct token name and symbol", async() => {
      const name = await contractInstance.name();
      const symbol = await contractInstance.symbol();
      assert.equal(name, "Brick Token");
      assert.equal(symbol, "BRCK");
    })
    it("should return total supply", async() => {
      const supply = await contractInstance.totalSupply();
      assert.equal(supply,10000000000);
    })
    it("should return balance of admin", async() => {
      const balance = await contractInstance.balanceOf(accounts[0]);
      assert.equal(balance, 10000000000);
    })
  })

  context("transfer tests", async() => {
    it("should send 100 from admin to tom, then 10 from tom to jerry", async() => {
      const tom = accounts[2];
      const jerry = accounts[5];

      await contractInstance.transfer(tom, 100);
      var balance = await contractInstance.balanceOf(tom);
      assert.equal(balance, 100);
      balance = await contractInstance.balanceOf(accounts[0]);
      assert.equal(balance, 9999999900);


      await contractInstance.transfer(jerry, 10, { from: tom});
      balance = await contractInstance.balanceOf(tom);
      assert.equal(balance, 90, "Amount wasn't correctly taken from the sender");
      balance = await contractInstance.balanceOf(jerry);
      assert.equal(balance, 10, "Amount wasn't correctly sent to the receiver");
    })
  })


})
