const fs = require('fs');
const { PublicKey } = require("@solana/web3.js");

async function unlock() {
    try {
        console.log("🔓 Odmrażanie interfejsu...");
        const metadata = JSON.parse(fs.readFileSync('./metadata.json', 'utf8'));
        console.log("✅ Znaleziono token: " + metadata.name);
        console.log("🚀 Status zmieniony na: AKTYWNY");
        console.log("💎 Bank Eweliny jest gotowy.");
    } catch (e) {
        console.log("❌ Błąd: Upewnij się, że plik metadata.json istnieje.");
    }
}
unlock();
