const mongoose = require('mongoose');
require('dotenv').config();

const Offer = require('../models/Offer');

async function updateOffers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connecté à MongoDB\n');

    // Récupérer toutes les offres
    const offers = await Offer.find();
    console.log(`📊 ${offers.length} offres trouvées\n`);

    let updated = 0;

    for (const offer of offers) {
      let needsUpdate = false;
      const updates = {};

      // Ajouter salary si manquant
      if (!offer.conditions || !offer.conditions.salary) {
        updates['conditions.salary'] = Math.floor(Math.random() * (500000 - 150000) + 150000);
        updates['conditions.salaryType'] = 'mensuel';
        needsUpdate = true;
      }

      // Ajouter workType si manquant
      if (!offer.conditions || !offer.conditions.workType) {
        const workTypes = ['temps_plein', 'temps_partiel', 'ponctuel'];
        updates['conditions.workType'] = workTypes[Math.floor(Math.random() * workTypes.length)];
        needsUpdate = true;
      }

      // Ajouter startDate si manquant
      if (!offer.conditions || !offer.conditions.startDate) {
        updates['conditions.startDate'] = new Date();
        needsUpdate = true;
      }

      // Ajouter company (nom de l'entreprise) si manquant
      if (!offer.company) {
        const companies = [
          'Entreprise Privée',
          'Société de Transport',
          'Hôtel 5 étoiles',
          'Multinationale',
          'Société de logistique',
          'École internationale',
          'Compagnie de taxi'
        ];
        updates.company = companies[Math.floor(Math.random() * companies.length)];
        needsUpdate = true;
      }

      // Ajouter contractType (CDI, CDD, etc.) si manquant
      if (!offer.contractType) {
        const contractTypes = ['CDI', 'CDD', 'Intérim', 'Freelance', 'Stage'];
        updates.contractType = contractTypes[Math.floor(Math.random() * contractTypes.length)];
        needsUpdate = true;
      }

      // Améliorer la localisation si incomplète
      if (offer.location && offer.location.city && !offer.location.address) {
        const zones = ['Cocody', 'Plateau', 'Yopougon', 'Abobo', 'Marcory', 'Adjamé', 'Treichville'];
        updates['location.address'] = zones[Math.floor(Math.random() * zones.length)];
        needsUpdate = true;
      }

      // Formater le salaire en fourchette si c'est un nombre unique
      if (offer.conditions && offer.conditions.salary && !offer.salaryRange) {
        const baseSalary = offer.conditions.salary;
        const minSalary = Math.floor(baseSalary * 0.9);
        const maxSalary = Math.floor(baseSalary * 1.1);
        updates.salaryRange = `${minSalary.toLocaleString()} - ${maxSalary.toLocaleString()} FCFA`;
        needsUpdate = true;
      }

      // Mettre à jour si nécessaire
      if (needsUpdate) {
        await Offer.findByIdAndUpdate(offer._id, { $set: updates });
        updated++;
        console.log(`✅ Offre mise à jour: ${offer.title}`);
        console.log(`   Salaire: ${updates['conditions.salary'] || offer.conditions?.salary || 'N/A'} FCFA`);
        console.log(`   Type: ${updates['conditions.workType'] || offer.conditions?.workType || 'N/A'}`);
        console.log(`   Entreprise: ${updates.company || offer.company || 'N/A'}\n`);
      }
    }

    console.log(`\n📊 Résumé:`);
    console.log(`   Total: ${offers.length} offres`);
    console.log(`   Mises à jour: ${updated} offres`);
    console.log(`   Déjà complètes: ${offers.length - updated} offres\n`);

    console.log('✅ Mise à jour terminée!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Connexion fermée');
  }
}

updateOffers();
