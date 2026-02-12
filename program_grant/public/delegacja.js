const { Connection, PublicKey, Keypair, StakeProgram, sendAndConfirmTransaction } = require("@solana/web3.js");
const fs = require('fs');

async function delegate() {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('/home/ewelinalesiak7/.config/solana/id.json')));
    const payer = Keypair.fromSecretKey(secretKey);

    // Twoje nowo utworzone konto stakingowe (z poprzedniego kroku)
    const stakeAccountPubKey = new PublicKey("5P9XcoSg5Qd78z54rgfc1CP7cdEDjGhYKzsC4nZyuDHD");
    
    // Oficjalny Vote Account walidatora P2P na Devnecie
    const voteAccountPubKey = new PublicKey("4Qu6A9M7y2W3SVFm9SFS8S7u7j8j5CgM7rXz9KGr7H55");

    console.log("🔗 Deleguję środki do walidatora...");

    try {
        const transaction = StakeProgram.delegate({
            stakePubkey: stakeAccountPubKey,
            authorizedPubkey: payer.publicKey,
            votePubkey: voteAccountPubKey,
        });

        const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);
        console.log(`✅ DELEGACJA ZAKOŃCZONA!`);
        console.log(`🔗 TX: ${signature}`);
        console.log("🚀 Twoje SOL zaczynają pracować. Projekt gotowy do raportu!");
    } catch (e) {
        console.error("❌ Błąd:", e.message);
    }
}

delegate();
