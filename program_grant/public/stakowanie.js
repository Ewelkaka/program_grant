const { Connection, PublicKey, LAMPORTS_PER_SOL, Keypair, StakeProgram, Authorized, Lockup, sendAndConfirmTransaction } = require("@solana/web3.js");
const fs = require('fs');

async function main() {
    console.log("🚀 Startujemy...");
    
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    
    // Ładowanie klucza
    const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('/home/ewelinalesiak7/.config/solana/id.json')));
    const payer = Keypair.fromSecretKey(secretKey);
    console.log(`👤 Twój portfel: ${payer.publicKey.toBase58()}`);

    const stakeAccount = Keypair.generate();
    const rent = await connection.getMinimumBalanceForRentExemption(StakeProgram.space);
    const amount = 0.5 * LAMPORTS_PER_SOL; // Zmniejszamy do 0.5 SOL dla pewności

    console.log("🛠 Budowanie transakcji...");
    const transaction = StakeProgram.createAccount({
        fromPubkey: payer.publicKey,
        stakePubkey: stakeAccount.publicKey,
        authorized: new Authorized(payer.publicKey, payer.publicKey),
        lockup: new Lockup(0, 0, payer.publicKey),
        lamports: amount + rent
    });

    console.log("📡 Wysyłanie do sieci (to może potrwać 20 sekund)...");
    const signature = await sendAndConfirmTransaction(connection, transaction, [payer, stakeAccount]);
    
    console.log(`✅ SUKCES!`);
    console.log(`🔗 TX: ${signature}`);
    console.log(`📍 Nowe konto stakingowe: ${stakeAccount.publicKey.toBase58()}`);
}

// WYWOŁANIE FUNKCJI Z OBSŁUGĄ BŁĘDÓW
main().catch(err => {
    console.error("❌ KRYTYCZNY BŁĄD:");
    console.error(err);
});

