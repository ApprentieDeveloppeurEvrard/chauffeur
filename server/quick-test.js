const axios = require('axios');

async function quickTest() {
  try {
    console.log('🔍 Test rapide des APIs chauffeur...');
    
    // Test de connexion
    const loginResponse = await axios.post('http://localhost:4000/api/auth/login', {
      email: 'chauffeur1@example.com',
      password: 'password123'
    });
    
    console.log('✅ Connexion OK');
    
    const headers = { 'Authorization': `Bearer ${loginResponse.data.token}` };

    // Test toutes les APIs en parallèle
    const [offers, applications, missions, notifications, stats] = await Promise.allSettled([
      axios.get('http://localhost:4000/api/offers', { headers }),
      axios.get('http://localhost:4000/api/applications/my', { headers }),
      axios.get('http://localhost:4000/api/missions/my', { headers }),
      axios.get('http://localhost:4000/api/notifications', { headers }),
      axios.get('http://localhost:4000/api/stats/driver', { headers })
    ]);

    console.log('📊 Résultats:');
    console.log('- Offres:', offers.status === 'fulfilled' ? '✅' : '❌', offers.reason?.response?.status);
    console.log('- Candidatures:', applications.status === 'fulfilled' ? '✅' : '❌', applications.reason?.response?.status);
    console.log('- Missions:', missions.status === 'fulfilled' ? '✅' : '❌', missions.reason?.response?.status);
    console.log('- Notifications:', notifications.status === 'fulfilled' ? '✅' : '❌', notifications.reason?.response?.status);
    console.log('- Stats:', stats.status === 'fulfilled' ? '✅' : '❌', stats.reason?.response?.status);

    if (offers.status === 'rejected') console.log('Erreur offres:', offers.reason.response?.data);
    if (applications.status === 'rejected') console.log('Erreur candidatures:', applications.reason.response?.data);
    if (missions.status === 'rejected') console.log('Erreur missions:', missions.reason.response?.data);
    if (notifications.status === 'rejected') console.log('Erreur notifications:', notifications.reason.response?.data);
    if (stats.status === 'rejected') console.log('Erreur stats:', stats.reason.response?.data);

  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
  }
}

quickTest();
