import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import NFTCard from './components/nftCards';

export default function Home() {
  // Define variables

  // Stateful variables
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [isFetchForCollection, setFetchForCollection] = useState(false);
  
  // Fetch Variables
  const baseUrl = `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTs/`;
  // console.log(baseUrl);
  const fetchURL = `${baseUrl}?owner=${wallet}`;
  // Define variable for the fetchNFT's request options
    const requestOptions = {
      method:'GET'
    };  

  // Define a function for fetching the NFT's from the Alchemy API
  const fetchNFTS = async() => {
    // Define a variable for storing the fetched NFT's
    let nfts;

    // Optional Debug
    console.log('Fetch NFTs');

    // Define conditional checks for validating that NFT collection is present
    if (!collection.length) {
      // Fetch NFTs through the API call
      nfts = await fetch(fetchURL, requestOptions).then(response => response.json());
    }
    else {
      // Fetch by collection
      const fetchURL = `${baseUrl}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(response => response.json());
    }

    //
    if(nfts) {
      console.log('Retrieved NFTs: ', nfts);
      setNFTs(nfts.ownedNfts);
    }
  }

  // Define a function for fetching nfts via collection
  const fetchNFTSByCollection = async() => {
    // Define variables
    const baseUrl = `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTsForCollection`;
    const fetchURL = `${baseUrl}?contractAddress=${collection}&withMetadata=${"true"}`;

    if (collection.length) {
     const nfts = await fetch(fetchURL, requestOptions).then(response => response.json());
      if (nfts) {
        console.log('NFTs in collection:', nfts)
        // Filter data to only show the nfts
        setNFTs(nfts.nfts);
      }
    }
  }

  return (
    <>
    {/* Head */}
      <Head>
        <title className={styles.title}>Digital Louvre</title>
        <meta name='keywords' content='nft'></meta>        
      </Head>
      <div className='container'>
        <h1 className={styles.h1}>Digital Louvre</h1>
        <div>
          {/* Input Fields */}
          <input disabled={fetchNFTSByCollection} type={'text'} placeholder={'Wallet Address'} onChange={(e => setWalletAddress(e.target.value))} value={wallet} className={styles.input}></input>
          <input type={'text'} placeholder={'Collection Address'} onChange={(e => setCollectionAddress(e.target.value))} value={collection} className={styles.input}></input>
          <label><input type={'checkbox'} onChange={(e => setFetchForCollection(e.target.checked))}></input>Searching Collection</label>
          <button className={styles.btn} onClick={() => {
            //
            if (isFetchForCollection) {
              fetchNFTSByCollection();
            }
            else {
              fetchNFTS();
            }
          }}>Search</button>
        </div>
        <div className={styles.cardcontainer}>
          {
            NFTs.length && NFTs.map(nft => {
              return (
                <NFTCard nft={nft} key={nft.title}></NFTCard>
              )
            })
          }
        </div>
      </div>  
    </>
  )
}
