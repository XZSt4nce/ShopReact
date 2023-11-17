eth.accounts.forEach(acc => {
    personal.unlockAccount(acc, "123", 0);
})
miner.setEtherbase(eth.accounts[0]);
miner.start();