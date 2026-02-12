const fs = require('fs');

const branding = {
    name: "Ewelina Emerald Coin",
    symbol: "EWE",
    image: "https://raw.githubusercontent.com/Ewelkaka/moj-projekt/main/logo.png",
    external_url: "https://github.com/Ewelkaka/moj-projekt",
    description: "Official Branding for Ewelina Emerald Coin"
};

console.log("--- AKTUALIZACJA BRANDINGU ---");
console.log("Nazwa:", branding.name);
console.log("Logo URL:", branding.image);

// Zapisywanie do pliku konfiguracyjnego dla dashboardu
fs.writeFileSync('./branding_config.json', JSON.stringify(branding, null, 2));
console.log("Plik branding_config.json został zaktualizowany.");
