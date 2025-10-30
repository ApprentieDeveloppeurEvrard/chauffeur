import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { driversService, messagesApi } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import SimpleHeader from '../component/common/SimpleHeader';
import { MapPin, Phone, Mail, Star, Award, Calendar, Car, Shield, Briefcase, CheckCircle } from 'lucide-react';

export default function DriverProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contacting, setContacting] = useState(false);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        setLoading(true);
        const response = await driversService.getById(id);
        
        if (response.data) {
          console.log('Données du chauffeur:', response.data);
          console.log('workExperience:', response.data.workExperience);
          setDriver(response.data);
          setError(null);
        } else {
          setError('Chauffeur non trouvé');
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError('Chauffeur non trouvé');
      } finally {
        setLoading(false);
      }
    };

    fetchDriver();
  }, [id]);

  const handleContact = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      setContacting(true);
      const response = await messagesApi.createOrGetConversation(
        driver.userId._id || driver.userId,
        { type: 'driver_inquiry', driverId: driver._id }
      );
      navigate(`/messages?conversation=${response.data.conversation._id}`);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création de la conversation');
    } finally {
      setContacting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !driver) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">Chauffeur non trouvé</h2>
          <Link to="/" className="text-orange-500 hover:text-orange-600">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Carte principale du profil */}
        <div className="bg-white border border-gray-200 overflow-hidden mb-8">
          {/* En-tête avec photo et infos principales */}
          <div className="p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Photo de profil */}
              <div className="flex-shrink-0">
                <div className="relative">
                  {(() => {
                    console.log('Photo URL:', driver.profilePhotoUrl);
                    console.log('FirstName:', driver.firstName);
                    console.log('LastName:', driver.lastName);
                    return driver.profilePhotoUrl ? (
                      <img 
                        src={driver.profilePhotoUrl} 
                        alt={`${driver.firstName} ${driver.lastName}`}
                        className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-gray-200"
                      />
                    ) : (
                      <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-white flex items-center justify-center border-2 border-orange-500">
                        <span className="text-orange-500 text-7xl lg:text-8xl font-semibold">
                          {driver.firstName?.charAt(0)}{driver.lastName?.charAt(0)}
                        </span>
                      </div>
                    );
                  })()}
                  {driver.isAvailable && (
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Informations principales */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl lg:text-3xl text-gray-900 mb-2">
                      {driver.firstName} {driver.lastName}
                    </h1>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.floor(driver.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-lg text-gray-900">
                        {driver.rating ? driver.rating.toFixed(1) : '5.0'}
                      </span>
                      <span className="text-gray-500">
                        ({driver.totalRides || 0} courses)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {driver.isAvailable && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          <CheckCircle className="w-4 h-4" />
                          Disponible
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        <Shield className="w-4 h-4" />
                        Permis {driver.licenseType || 'B'}
                      </span>
                      {driver.experience && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          <Award className="w-4 h-4" />
                          {driver.experience}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bouton de contact */}
                  <button
                    onClick={handleContact}
                    disabled={contacting}
                    className="w-full lg:w-auto px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    {contacting ? 'Connexion...' : 'Contacter'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {driver.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Téléphone</p>
                    <p className="text-sm text-gray-900">{driver.phone}</p>
                  </div>
                </div>
              )}
              {driver.workZone && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Zone de travail</p>
                    <p className="text-sm text-gray-900">{driver.workZone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Informations sur le véhicule */}
            {driver.vehicleType && (
              <div className="bg-white border border-gray-200 p-6 lg:p-8">
                <h2 className="text-xl text-gray-900 mb-6 flex items-center gap-2">
                  <Car className="w-6 h-6 text-orange-500" />
                  Véhicule
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Type</p>
                    <p className="text-gray-900">{driver.vehicleType}</p>
                  </div>
                  {driver.vehicleBrand && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Marque</p>
                      <p className="text-gray-900">{driver.vehicleBrand}</p>
                    </div>
                  )}
                  {driver.vehicleYear && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Année</p>
                      <p className="text-gray-900">{driver.vehicleYear}</p>
                    </div>
                  )}
                  {driver.vehicleSeats && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Places</p>
                      <p className="text-gray-900">{driver.vehicleSeats} places</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Spécialités */}
            {driver.specialties && driver.specialties.length > 0 && (
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg text-gray-900 mb-4">Spécialités</h3>
                <div className="flex flex-wrap gap-2">
                  {driver.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Statistiques */}
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-lg text-gray-900 mb-4">Statistiques</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Courses effectuées</span>
                  <span className="text-2xl text-orange-500">{driver.totalRides || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Note moyenne</span>
                  <span className="text-2xl text-orange-500">{driver.rating ? driver.rating.toFixed(1) : '5.0'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Taux d'acceptation</span>
                  <span className="text-2xl text-orange-500">98%</span>
                </div>
              </div>
            </div>

            {/* Langues */}
            {driver.languages && driver.languages.length > 0 && (
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg text-gray-900 mb-4">Langues parlées</h3>
                <div className="space-y-2">
                  {driver.languages.map((language, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{language}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Expériences professionnelles - En bas */}
        <div className="bg-white border border-gray-200 p-6 lg:p-8 mt-8">
          <h2 className="text-xl text-gray-900 mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-orange-500" />
            Expériences professionnelles
          </h2>
          {driver.workExperience && driver.workExperience.length > 0 ? (
            <div className="space-y-6">
              {driver.workExperience.map((exp, index) => (
                <div key={index} className="relative pl-8 pb-6 border-l-2 border-orange-200 last:pb-0">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-500 rounded-full"></div>
                  <h3 className="text-lg text-gray-900 mb-1">{exp.position || exp.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <span>{exp.company}</span>
                    {exp.duration && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {exp.duration}
                        </span>
                      </>
                    )}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Aucune expérience professionnelle renseignée</p>
          )}
        </div>
      </main>
    </div>
  );
}
