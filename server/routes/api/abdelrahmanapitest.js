const express = require('express');
const router = express.Router();
const { Web3 } = require('web3');
const axios = require('axios');
const { EthMainnet } = require('../../config/constant');

const web3 = new Web3(EthMainnet);
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

// Fetch ABI from Etherscan
async function fetchContractInformation(contractAddress) {
  try {
    const response = await axios.get('https://api.etherscan.io/api', {
      params: {
        module: 'contract',
        action: 'getabi',
        address: contractAddress,
        apikey: ETHERSCAN_API_KEY
      }
    });

    if (response.data.status === '1') return JSON.parse(response.data.result);
    return null;
  } catch (error) {
    console.error('Error fetching ABI:', error.message);
    return null;
  }
}

// Fetch contract info (API + console log)
router.get('/info/:contractAddress', async (req, res) => {
  try {
    const { contractAddress } = req.params;

    if (!web3.utils.isAddress(contractAddress)) {
      return res.status(400).json({ error: 'Invalid contract address' });
    }

    // Fetch ABI
    const abi = await fetchContractInformation(contractAddress);

    // Get contract balance
    const balanceWei = await web3.eth.getBalance(contractAddress);
    const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

    const result = {
      success: true,
      contractAddress,
      balance: {
        wei: balanceWei.toString(),
        ether: balanceEth.toString()
      },
      abi: abi || 'ABI not verified on Etherscan'
    };

    console.log('\n===========================================');
    console.log('Contract Info:');
    console.log('Address:', result.contractAddress);
    console.log('Balance (wei):', result.balance.wei);
    console.log('Balance (ether):', result.balance.ether);
    console.log('ABI:', abi ? 'Fetched successfully' : 'ABI not verified');
    console.log('===========================================\n');

    res.json(result);
  } catch (error) {
    console.error('Failed to fetch contract info:', error.message);
    res
      .status(500)
      .json({ error: 'Failed to fetch contract info', message: error.message });
  }
});

module.exports = router;
