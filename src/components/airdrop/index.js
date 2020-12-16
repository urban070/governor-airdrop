import React, { Component } from "react";
import Web3 from "web3";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { ConnectButton } from "./elements";

import "./style.scss";

class Airdrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSmall: null,
      isMedium: null,
      isLarge: null,
      isConnected: false,
      isDropdownOpen: false,
      account: null,
      day: 0,
      percentage: 0,
      unclaimed: 0,
      burned: 0,
      reward: 0,
      claimable: 0,
	  isAirdropClaimed: false,
	  isEligible: false,
	  isAirdropLive: false,
	  countdownString: "0:0:0"
    };
	this.GDAOABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
	this.GDAOAddress = '0x515d7E9D75E2b76DB60F8a051Cd890eBa23286Bc';
	this.GDAOContract = null;
	this.airdropContract = null;
    this.merkle = {
      contractAddress: "0x7ea0f8bb2f01c197985c285e193dd5b8a69836c0",
	  contractABI: [{"inputs":[{"internalType":"address","name":"token_","type":"address"},{"internalType":"bytes32","name":"merkleRoot_","type":"bytes32"},{"internalType":"address","name":"rewardsAddress_","type":"address"},{"internalType":"address","name":"burnAddress_","type":"address"},{"internalType":"uint256","name":"startTime_","type":"uint256"},{"internalType":"uint256","name":"endTime_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"inputs":[],"name":"burnAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes32[]","name":"merkleProof","type":"bytes32[]"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"collectDust","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"collectUnclaimed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_deployer","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"isClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}],
	  startTimestamp: 1608076800,
      merkleRoot: "0xe9565857a5cc3822085e502f294a16b3c76cce866c333fb2174efc935c833c72",
	  tokenTotal: "0x01072309c1bb6c05f73400",
	  claims:{
	  }
    };
  }

  getWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable().then((accounts) => {
          this.connectMainnet(accounts);
        });
      } catch (err) {
        console.log(err);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      this.web3 = new Web3(Web3.currentProvider);
      try {
        await this.web3.eth.getAccounts().then((accounts) => {
          this.connectMainnet(accounts);
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
  };

  connectMainnet = async (accounts) => {
    await this.web3?.eth?.getChainId().then((x) => {
      if (x == 1) {
        this.setState({ account: accounts[0].toString(), isConnected: true });
		
	    this.GDAOContract = new this.web3.eth.Contract(this.GDAOABI, this.GDAOAddress);
	    this.airdropContract = new this.web3.eth.Contract(this.merkle.contractABI, this.merkle.contractAddress);
	  
	    this.getAirdropStats();
	    var self = this;
	    this.statsInterval = setInterval(function() {
	      self.getAirdropStats();
	    }, 10000);
      } else {
        this.setState({ account: null });
        toast.error("You need to be on the Ethereum Mainnet");
      }
    });
  };
  
  getAirdropStats = () => {
	if(this.merkle.claims[this.web3.utils.toChecksumAddress(this.state.account)] != null) {
	  this.setState({ isEligible: true });
	}
	  
	let currentTimestamp = Math.round(Date.now() / 1000);
	let daysPassed = Math.round((currentTimestamp - this.merkle.startTimestamp) / 60 / 60 / 24);
	let rewardMultiplier = 0.1;
	
	if(daysPassed > 90) {
		rewardMultiplier = 1;
	} else if(daysPassed < 0) {
		rewardMultiplier = 0;
	} else {
		rewardMultiplier += daysPassed*0.01;
	}
	
	let percentageToday = rewardMultiplier * 100;
	
	this.setState({ percentage: percentageToday, day: daysPassed });
    
	if(this.airdropContract != null && this.GDAOContract != null) {
	  this.GDAOContract.methods.balanceOf(this.merkle.contractAddress).call().then(result => {
	    this.setState({ unclaimed: parseFloat(this.web3.utils.fromWei(result, 'ether')) });
	  });
	  this.airdropContract.methods.burnAddress().call().then(burnAddress => {
	    this.GDAOContract.methods.balanceOf(burnAddress).call().then(result => {
		  let rewardResult = parseFloat(this.state.unclaimed) + parseFloat(this.web3.utils.fromWei(result, 'ether'));
	      this.setState({ burned: parseFloat(this.web3.utils.fromWei(result, 'ether')), reward: rewardResult });
	    });
	  });
	  if(this.state.isEligible) {
	    this.airdropContract.methods.isClaimed(this.merkle.claims[this.web3.utils.toChecksumAddress(this.state.account)].index).call().then(isClaimed => {
	      this.setState({ isAirdropClaimed: isClaimed, claimable: Math.round(this.web3.utils.fromWei(this.merkle.claims[this.web3.utils.toChecksumAddress(this.state.account)].amount, 'ether')*rewardMultiplier) });
	    });
	  }
	  
	  
	}
  }
  
  claimAirdrop = () => {
	if(this.web3 != null && this.airdropContract != null) {
      this.airdropContract.methods.claim(this.merkle.claims[this.web3.utils.toChecksumAddress(this.state.account)].index, this.state.account, this.merkle.claims[this.web3.utils.toChecksumAddress(this.state.account)].amount, this.merkle.claims[this.web3.utils.toChecksumAddress(this.state.account)].proof).send({
	    from: this.state.account
	  }).on('error', function (error) {
        toast.error("Transaction was not successful");
	  }).on('transactionHash', function (transactionHash) {
        toast.info("Your transaction has been recorded. Click here to review your tx.", {onClick: function(){ window.open('https://etherscan.io/tx/'+transactionHash, '_blank'); }});
	  }).on('confirmation', function (confirmationNumber, receipt) {
        toast.success("You have successfully claimed your airdrop");
	  });
	}
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize.bind(this));
    this.onResize();
    this.onAccountChange();
    this.onNetworkChange();
	
	let now = new Date().getTime();
	let startCountdown = this.merkle.startTimestamp * 1000;
	let self = this;
	if(startCountdown > now) {
	  let countdownInterval = setInterval(function() {
		let now = new Date().getTime();
		let distance = startCountdown - now;

		let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);
		hours = (hours < 10) ? "0"+hours : hours;
		minutes = (minutes < 10) ? "0"+minutes : minutes;
		seconds = (seconds < 10) ? "0"+seconds : seconds; 
		
		let calculatedCountdownString = hours + ":" + minutes + ":" + seconds;
		//document.getElementById("countdownToStart").innerHTML = calculatedCountdownString;
		self.setState({ countdownString: calculatedCountdownString });

		if (distance < 0) {
		  self.setState({ isAirdropLive: true });
		  clearInterval(countdownInterval);
		}
	  }, 1000);
	} else {
	  this.setState({ isAirdropLive: true });
	}
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize());
  }

  onResize = () => {
    this.setState({
      isLarge: window.innerWidth >= 992,
      isMedium: window.innerWidth >= 768 && window.innerWidth < 992,
      isSmall: window.innerWidth < 768,
    });
  };

  onAccountChange() {
    window?.ethereum?.on("accountsChanged", (accounts) => {
      if (
        accounts.length > 0 &&
        this.state.account !== accounts[0].toString()
      ) {
        this.setState({ account: accounts[0].toString() });
      } else {
        this.setState({ account: null });
      }
    });
  }

  onNetworkChange() {
    window?.ethereum?.on("chainChanged", (chainId) => window.location.reload());
  }

  setConnection = () => {
	if (this.state.isConnected && this.web3.utils.isAddress(this.state.account) ) {
	  this.setState((prevState) => ({ isDropdownOpen: !prevState.isDropdownOpen }));
	} else {
      this.getWeb3();
	}
  };

  setDisconnection = () => {
    this.web3 = null;
    this.setState({ account: null, isConnected: false, isDropdownOpen: false });
	this.GDAOContract = null;
	this.airdropContract = null;
	this.statsInterval != null ? clearInterval(this.statsInterval) : this.statsInterval = null;
  };

  render() {
    return (
      <div className="max-width-container">
        <div className="airdrop-container">
          <div className="airdrop-title">
            {this.state.isLarge ? (
              <>
                <div className="title-text">GDAO Airdrop</div>
                <ConnectButton
				  account={this.state.account}
				  isDropdownOpen={this.state.isDropdownOpen}
				  setConnection={this.setConnection}
				  setDisconnection={this.setDisconnection}
                />
              </>
            ) : (
              <>
                <ConnectButton
				  account={this.state.account}
				  isDropdownOpen={this.state.isDropdownOpen}
				  setConnection={this.setConnection}
				  setDisconnection={this.setDisconnection}
                />
                <div className="title-text">GDAO Airdrop</div>
              </>
            )}
          </div>
          <div className="airdrop-subtitle">
            <span>Airdrop Day: </span>
            {this.state.day}
          </div>
          <div className="airdrop-subtitle">
            <span>Claimable GDAO: </span>
            {this.state.percentage}%
          </div>
          <div className="airdrop-details">
            <div className="upper">
              <div className="details-item">
                <div className="title">Unclaimed GDAO</div>
                <div className="value">
                  {this.state.unclaimed.toLocaleString()}
                </div>
              </div>
              <div className="details-item">
                <div className="title">Burned GDAO</div>
                <div className="value">
                  {this.state.burned.toLocaleString()}
                </div>
              </div>
              <div className="details-item">
                <div className="title">Reward Pool</div>
                <div className="value">
                  {this.state.reward.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="lower">
              {this.state.isAirdropLive ? (
			    this.state.isConnected ? (
			      this.state.isEligible ? (
                    this.state.isAirdropClaimed ? (
                      <>
                        <div className="claim-item">
                          <div className="title">You have already claimed your airdrop</div>
                        </div>
                      </>
				    ) : (
                      <>
                        <div className="claim-item">
                          <div className="title">Claimable GDAO</div>
                          <div className="value">
                            {this.state.claimable.toLocaleString()}
                          </div>
                        </div>
                        <button className="claim-btn" onClick={this.claimAirdrop}>Claim Airdrop</button>
                      </>
		  		    )
			  	  ) : (
                    <>
                      <div className="claim-item">
                        <div className="title">You are not eligible for this airdrop</div>
                      </div>
                    </>
				  )
                ) : (
                  <div className="claim-disconnected">
                    <span>Wallet not connected</span>
                    <br />
                    Please, connect wallet to continue...
                  </div>
                )
			  ) : (
                <>
                  <div className="claim-item">
                    <div className="title">The airdrop starts in</div>
                    <div className="title" id="countdownToStart">{this.state.countdownString}</div>
                  </div>
                </>
			  )}
            </div>
          </div>
        </div>
        <div className="gdao-texture-bg" />
        <div className="gdao-phoenix-bg" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Airdrop);