import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import Escrow from './Escrow';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    const value = ethers.BigNumber.from(document.getElementById('ether').value);
    const WeiToEther = ethers.utils.formatEther(value)
    const escrowContract = await deploy(signer, arbiter, beneficiary, WeiToEther);


    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: value.toString(),
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className =
            'complete';
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        await approve(escrowContract, signer);
      },
    };

    setEscrows([...escrows, escrow]);
  }

  return (
    <>
      <br /><br />
    

        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Deploy New Contract</h2>
                <p>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Arbiter Address</label>
                    <input type="text" class="form-control form-control-lg" id="arbiter" placeholder="0xf39Fd6e........" />

                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Beneficiary Address</label>
                    <input type="text" class="form-control form-control-lg" id="beneficiary" placeholder="0xf39Fd6e........" />

                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Deposit Amount </label>
                    <input type="text" class="form-control form-control-lg" id="ether" placeholder="1" />
                    <small id="emailHelp" class="form-text text-muted">(in Ether)</small>
                  </div>

                  <button
                    type='button'
                    className="btn btn-primary"
                    id="deploy"
                    onClick={(e) => {
                      e.preventDefault();

                      newContract();
                    }}
                  >
                    Deploy
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Deployed Contract</h2>
                <p className="card-text">

                  <div id="container">
                    {escrows.map((escrow) => {
                      return <Escrow key={escrow.address} {...escrow} />;
                    })}
                  </div>

                </p>
              </div>
            </div>
          </div>
        </div>
      

    </>
  );
}

export default App;
