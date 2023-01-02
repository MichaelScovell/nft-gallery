import react from "react";
import styles from '../../styles/Card.module.css';

const NFTCard = ({nft}) => {
    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <img src={nft.media[0].gateway} alt={nft.title} />
            </div>
            <div className={styles.content}>
                <div className={styles.title}>
                    {/* Populating the nft's data */}
                    <h2>{nft.title}</h2>
                </div>
                <div className={styles.metadata}>
                    {/* Shortening the Token and contract address ID */}
                    <p>ID: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
                    <p>Contract Address: {`${nft.contract.address.substr(0, 4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
                    <div className={styles.meta}>
                        <p>Description: {nft.description?.substr(0, 300)}</p>
                    </div>

                </div>
            </div>
            <div>
                {/* Button Link */}
                <a className= {styles.actionbutton} target={"_blank"} rel="noreferrer" href={`https://etherscan.io/token/${nft.contract.address}`}>View on etherscan</a>                
            </div>
        </div>
    );
}
 
export default NFTCard;