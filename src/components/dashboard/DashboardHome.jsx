"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getAllAnnouncements } from '@/api/announcements';
import { getAllEvents } from '@/api/events';
import { getQrCode } from '@/api/users';
import useAuthStore from '@/stores/authStore';

export default function DashboardHome() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const { user: storeUser } = useAuthStore();
  const [qrData, setQrData] = useState({ loading: false, qrcode: null, error: null });

  useEffect(() => {
    let mounted = true;
    const fetchAnnouncements = async () => {
      try {
        setIsLoadingAnnouncements(true);
        const resp = await getAllAnnouncements();
        const sorted = (resp.announcements || []).sort((a, b) => new Date(b.published_at) - new Date(a.published_at)).slice(0, 5);
        if (mounted) setAnnouncements(sorted);
      } catch (err) {
        console.error(err);
        if (mounted) setAnnouncements([]);
      } finally {
        if (mounted) setIsLoadingAnnouncements(false);
      }
    };

    fetchAnnouncements();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetchEvents = async () => {
      try {
        setIsLoadingEvents(true);
        const resp = await getAllEvents();
        const now = new Date();
        const future = (resp.events || [])
          .filter(e => e.date_start && new Date(e.date_start) > now)
          .sort((a, b) => new Date(a.date_start) - new Date(b.date_start))
          .slice(0, 6)
          .map(ev => ({
            id: ev.event_id,
            title: ev.title,
            subtitle: ev.subtitle || '',
            date: ev.date_start ? new Date(ev.date_start).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
            time: ev.time_start || '',
            location: ev.location || 'À définir',
            image: ev.image || null,
            icon: ev.eventType === 'workshop' ? '🎓' : ev.eventType === 'conference' ? '🎤' : ev.eventType === 'hackathon' ? '💻' : '📅'
          }));
        if (mounted) setUpcomingEvents(future);
      } catch (err) {
        console.error(err);
        if (mounted) setUpcomingEvents([]);
      } finally {
        if (mounted) setIsLoadingEvents(false);
      }
    };

    fetchEvents();
    return () => { mounted = false; };
  }, []);

  const overviewStats = [
    { label: 'Événements participés', value: 18, color: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
    { label: 'Événements à venir', value: upcomingEvents.length, color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Cellules rejointes', value: 62, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Certificats', value: 245, color: 'text-pink-500', bgColor: 'bg-pink-50 dark:bg-pink-900/20' }
  ];

  const formatAnnouncementDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffHours < 1) return "À l'instant";
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleGenerateQr = async () => {
    if (!storeUser?.user_id) return;
    try {
      setQrData({ loading: true, qrcode: null, error: null });
      const resp = await getQrCode(storeUser.user_id);
      setQrData({ loading: false, qrcode: resp.qrcode, error: null });
    } catch (err) {
      setQrData({ loading: false, qrcode: null, error: err?.message || 'Erreur lors de la génération' });
    }
  };

  const handleDownloadQr = () => {
    if (!qrData.qrcode) return;
    const link = document.createElement('a');
    link.href = qrData.qrcode;
    link.download = `qrcode_${storeUser?.user_id || 'user'}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-6">
      {/* Overview */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, i) => (
            <div key={i} className={`${stat.bgColor} rounded-2xl p-6 border border-gray-100 dark:border-gray-800`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</span>
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className={`h-1 ${stat.color.replace('text-', 'bg-')} rounded-full w-8`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements - full width */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Annonces</h2>
          {announcements.length > 0 && (
            <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold">{announcements.length} NOUVELLE{announcements.length > 1 ? 'S' : ''}</span>
          )}
        </div>

        {isLoadingAnnouncements ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Chargement des annonces...</p>
          </div>
        ) : announcements.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {announcements.map(a => (
              <div key={a.id} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer flex-shrink-0 w-full lg:w-[600px] snap-start" onClick={() => a.url && window.open(a.url, '_blank')}>
                <div className="flex items-start space-x-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-2xl p-4 flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{a.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{a.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Publié {formatAnnouncementDate(a.published_at)}</span>
                      </div>
                      {a.url && (<span className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center">En savoir plus<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Aucune annonce</h3>
            <p className="text-gray-500 dark:text-gray-400">Il n'y a pas d'annonces pour le moment.</p>
          </div>
        )}
      </div>

      {/* Events and QR side-by-side (50/50) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events (left) */}
        <div>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Événements à venir</h2>
            </div>

            {isLoadingEvents ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Chargement des événements...</p>
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className="space-y-6">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col lg:flex-row">
                      <div className="w-full lg:w-1/3 relative h-48 lg:h-auto lg:min-h-[200px]">
                        {event.image ? (
                          <Image src={event.image} alt={event.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                            <div className="text-6xl opacity-80">{event.icon}</div>
                          </div>
                        )}
                      </div>

                      <div className="w-full lg:w-2/3 p-6 relative flex flex-col">
                        <div className="pr-16 mb-4">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">{event.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{event.subtitle}</p>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4-4a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          </div>
                          <div className="min-w-0">
                            <div className="text-lg font-bold text-pink-500 truncate">{event.location}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 truncate">ISS École, Maroc</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                          <div className="min-w-0">
                            <div className="text-lg font-bold text-pink-500">{event.date}</div>
                            {event.time && <div className="text-sm text-gray-600 dark:text-gray-400">{event.time}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Aucun événement à venir</h3>
                <p className="text-gray-500 dark:text-gray-400">Les prochains événements apparaîtront ici.</p>
              </div>
            )}
          </div>
        </div>

        {/* QR Card (right) */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2">Mon QR Code</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Montrez cette image lors de votre arrivée à un événement.</p>

            <div className="flex items-center justify-center mb-4">
              {qrData.qrcode ? (
                <img src={qrData.qrcode} alt="QR Code" className="w-40 h-40 object-contain" />
              ) : (
                <div className="w-40 h-40 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">No QR</div>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={handleGenerateQr} className="flex-1 py-2 px-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50">
                {qrData.loading ? 'Génération...' : 'Générer / Actualiser'}
              </button>
              <button onClick={handleDownloadQr} disabled={!qrData.qrcode} className="py-2 px-3 bg-gray-200 dark:bg-gray-700 rounded-md">
                Télécharger
              </button>
            </div>

            {qrData.error && <p className="text-sm text-red-500 mt-3">{qrData.error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}