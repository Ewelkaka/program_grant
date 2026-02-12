const { Connection, PublicKey, Keypair } = require("@solana/web3.js");
const fs = require('fs');

// Ładowanie Twojego portfela (upewnij się, że ścieżka jest poprawna)
const secret = JSON.parse(fs.readFileSync('/home/ewelinalesiak7/.config/solana/id.json'));
const payer = Keypair.fromSecretKey(Uint8Array.from(secret));

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const MINT_ADDRESS = new PublicKey("4Fa7RAs3RnPtyBDWjPbNP8N162ip4Wp38rnxcJLoTsjQ");

async function prepareMetadata() {
    console.log("💎 INICJACJA BRANDINGU: Ewelina Emerald Coin");
    console.log("------------------------------------------");
    console.log(`Portfel właściciela: ${payer.publicKey.toBase58()}`);
    console.log(`Token do aktualizacji: ${MINT_ADDRESS.toBase58()}`);
    
    // Tu zdefiniujemy link do Twojego logo (może to być GitHub Raw)
    const metadataUri = "https://raw.githubusercontent.com/Ewelkaka/moj-projekt/main/metadata.json";
    
    console.log(`\nLink do metadanych ustawiony na: ${metadataUri}`);
    console.log("Status: Gotowy do wstrzyknięcia w Metaplex Program.");
}

prepareMetadata();
