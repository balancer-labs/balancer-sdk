use dotenv::dotenv;
use std::env;
use std::str::FromStr;
use web3::contract::{Contract, Options};
use web3::types::{Address, H256};

const VAULT_CONTRACT_ADDRESS: &'static str = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";

#[allow(dead_code)]
pub fn get_contract(
  web3: &web3::Web3<web3::transports::Http>,
  vault_address: Address,
) -> Contract<web3::transports::Http> {
  return Contract::from_json(
    web3.eth(),
    vault_address,
    include_bytes!("../abis/vault.json"),
  )
  .unwrap();
}

/**
 * Service to interact with Balancer Vault
 */
pub struct VaultService {
  pub web3: web3::Web3<web3::transports::Http>,
  pub address: Address,
  pub contract: Contract<web3::transports::Http>,
}
impl VaultService {
  pub fn new(web3: web3::Web3<web3::transports::Http>) -> VaultService {
    let web3c = web3.clone();
    let vault_address = Address::from_str(&VAULT_CONTRACT_ADDRESS.to_string()).unwrap();
    let contract = get_contract(&web3c, vault_address);

    VaultService {
      web3: web3c,
      address: vault_address,
      contract,
    }
  }

  pub async fn weth(&self) -> Address {
    let address: &Address = &self
      .contract
      .query("WETH", (), None, Options::default(), None)
      .await
      .unwrap();

    return address.clone();
  }

  /**
   * Returns the Vault's Authorizer (Balancer governance contract).
   */
  pub async fn get_authorizer(&self) -> Address {
    let address: &Address = &self
      .contract
      .query("getAuthorizer", (), None, Options::default(), None)
      .await
      .unwrap();

    return address.clone();
  }

  /**
   * TODO: NOT WORKING - Either fix or remove
   * Sets a new Authorizer for the Vault.
   * The caller must be allowed by the current Authorizer to do this.
   */
  pub async fn set_authorizer(&self, authorizer: Address) -> H256 {
    dotenv().ok();

    let wallet_address = &env::var("WALLET_ADDRESS").expect("Env key not present");
    let from = Address::from_str(wallet_address).unwrap();

    let binanry_data = &self
      .contract
      .call("setAuthorizer", authorizer, from, Options::default())
      .await
      .unwrap();

    return binanry_data.clone();
  }

  /**
   * TODO: FIX
   * This is NOT WORKING -- there is something wrong with
   * the arguments being passed
   */
  pub async fn get_pool(&self, id: String) -> Address {
    let pool_address: &Address = &self
      .contract
      .query("getPool", id.to_string(), None, Options::default(), None)
      .await
      .unwrap();

    return pool_address.clone();
  }
}
