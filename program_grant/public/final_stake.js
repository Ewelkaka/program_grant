const { Connection, PublicKey, Keypair, StakeProgram, Authorized, Lockup, sendAndConfirmTransaction, LAMPORTS_PER_SOL } = require("@solana/web3.js");
const fs = require('fs');

async function main() {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('/home/ewelinalesiak7/.config/solana/id.json')));
    const payer = Keypair.fromSecretKey(secretKey);
    
    const stakeAccount = Keypair.generate();
    const voteAccount = new PublicKey("4Qu6A9M7y2W3SVFm9SFS8S7u7j8j5CgM7rXz9KGr7H55");

    console.log("1️⃣ KROK: Tworzenie i inicjalizacja konta...");
    try {
        const rent = await connection.getMinimumBalanceForRentExemption(StakeProgram.space);
        const createTx = StakeProgram.createAccount({
            fromPubkey: payer.publicKey,
            stakePubkey: stakeAccount.publicKey,
            authorized: new Authorized(payer.publicKey, payer.publicKey),
            lockup: new Lockup(0, 0, payer.publicKey),
            lamports: 0.5 * LAMPORTS_PER_SOL + rent
        });

        const sig1 = await sendAndConfirmTransaction(connection, createTx, [payer, stakeAccount]);
        console.log(`✅ Konto utworzone: ${stakeAccount.publicKey.toBase58()}`);
        console.log("⏳ Czekam 5 sekund na propagację w sieci...");
        await new Promise(r => setTimeout(r, 5000));

        console.log("2️⃣ KROK: Delegacja do walidatora...");
        const delegateTx = StakeProgram.delegate({
            stakePubkey: stakeAccount.publicKey,
            authorizedPubkey: payer.publicKey,
            votePubkey: voteAccount,
        });

        const sig2 = await sendAndConfirmTransaction(connection, delegateTx, [payer]);
        console.log(`✅ SUKCES TOTALNY! TX: ${sig2}`);
        console.log(`🚀 Środki pracują na koncie: ${stakeAccount.publicKey.toBase58()}`);

    } catch (e) {
        console.error("❌ Błąd procesu:");
        console.error(e.message);
    }
}

main();
