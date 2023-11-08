IF NOT EXIST "/geth" (
	geth --datadir "" init genesis.json
)
geth --datadir "" --preload "preload.js" --http --http.api="eth,admin,debug,net,personal,miner,web3,txpool" --http.corsdomain "*" --port 3030 --networkid 8545 --allow-insecure-unlock console