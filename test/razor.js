const web3 = require("web3");

const Razor = artifacts.require("Razor");

contract("Razor", (accounts) => {
  let instance;

  before(async () => {
    instance = await Razor.deployed();
  });

  it("should mint 1000 NFT for owner account", async () => {
    const nftBalance = await instance.balanceOf(accounts[0], 0);

    assert.equal(nftBalance.toNumber(), 1000);
  });

  it("should get 1 NFT the second account", async () => {
    await instance.faucetNFT({ from: accounts[1] });

    const nftBalance = await instance.balanceOf(accounts[1], 0);

    assert.equal(nftBalance.toNumber(), 1);
  });

  it("should get error if account mint RZR without any RAZOR nft", async () => {
    try {
      await instance.mintRZR({ from: accounts[2] });
      assert.fail("should fail");
    } catch (error) {
      assert.equal(error.reason, "Nothing to claim");
    }
  });

  it("should calcReward view function returns 0 for account without any RAZOR NFT", async () => {
    const rewards = await instance.calcReward(accounts[2]);

    assert.equal(rewards.toNumber(), 0);
  });

  it("should calcReward view function returns higher than 0 for account with some RAZOR NFT", async () => {
    const rewards = await instance.calcReward(accounts[1]);

    assert.isAbove(rewards.toNumber(), 0);
  });

  it("should mint RZR account with Razor NFT", async () => {
    await instance.mintRZR({ from: accounts[1] });

    const rzrBalance = await instance.balanceOf(accounts[1], 1);

    assert.isAbove(rzrBalance.toNumber(), 0);
  });

  it("should belong to user the account 2 for having RAZOR", async () => {
    const hasUserRole = await instance.hasRole(
      web3.utils.keccak256("USER_ROLE"),
      accounts[1]
    );

    assert.isTrue(hasUserRole);
  });

  it("should belong to group the account 2 for having RZR", async () => {
    const hasUserRole = await instance.hasRole(
      web3.utils.keccak256("USER_ROLE"),
      accounts[1]
    );

    assert.isTrue(hasUserRole);
  });

  it("should not belong to user the account 3 for not having RAZOR", async () => {
    const hasUserRole = await instance.hasRole(
      web3.utils.keccak256("USER_ROLE"),
      accounts[2]
    );

    assert.isFalse(hasUserRole);
  });

  it("should not belong to group the account 3 for not having RZR", async () => {
    const hasUserRole = await instance.hasRole(
      web3.utils.keccak256("USER_ROLE"),
      accounts[2]
    );

    assert.isFalse(hasUserRole);
  });
});
