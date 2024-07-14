// server.js

const express = require('express');
const {Web3} = require('web3');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Create a Web3 instance
const web3 = new Web3('https://rpc.coredao.org');

const MyToken = require('../build/contracts/MyToken.json');

app.get('/balance/:address', async (req, res) => {
    const { address } = req.params;
    try {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = MyToken.networks[networkId];
        if (deployedNetwork) {
            const token = new web3.eth.Contract(MyToken.abi, deployedNetwork.address);
            const balance = await token.methods.balanceOf(address).call();
            res.send({ balance });
        } else {
            res.status(404).send({ error: 'Contract not deployed on this network' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
