"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllAnnouncements } from '@/api/announcements';
import { getAllEvents, getQrCode } from '@/api/events';
import { getEventsAttended, getCellsJoined, getEventsRegistered, getUpcomingEvents } from '@/api/stats';

export default function DashboardHome({ user, stats = {}, recentActivities = [] }) {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState([]);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [qrCode, setQrCode] = useState(null);
  const [isLoadingQr, setIsLoadingQr] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);
  
  // Stats state
  const [overviewStats, setOverviewStats] = useState([
    { label: "Events Attended", value: 0, color: "text-base-content", bgColor: "bg-base-200 " },
    { label: "Upcoming Events", value: 0, color: "text-base-content", bgColor: "bg-base-200 " },
    { label: "Events registred", value: 0, color: "text-base-content", bgColor: "bg-base-200 " },
    { label: "Cells joined", value: 0, color: "text-base-content", bgColor: "bg-base-200 " },
  ]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Fetch statistics from API
  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.user_id) {
        setIsLoadingStats(false);
        return;
      }

      try {
        setIsLoadingStats(true);
        
        // Fetch all statistics in parallel
        const [attendedRes, cellsRes, registeredRes, upcomingRes] = await Promise.allSettled([
          getEventsAttended(user.user_id),
          getCellsJoined(user.user_id),
          getEventsRegistered(user.user_id),
          getUpcomingEvents()
        ]);

        // Update stats with API data
        setOverviewStats([
          { 
            label: "Events Attended", 
            value: attendedRes.status === 'fulfilled' ? (parseInt(attendedRes.value.totalAttended) || 0) : 0, 
            color: "text-base-content", 
            bgColor: "bg-base-200 " 
          },
          { 
            label: "Upcoming Events", 
            value: upcomingRes.status === 'fulfilled' ? (parseInt(upcomingRes.value.totalComing) || 0) : 0, 
            color: "text-base-content", 
            bgColor: "bg-base-200 " 
          },
          { 
            label: "Events registred", 
            value: registeredRes.status === 'fulfilled' ? (parseInt(registeredRes.value.totalRgistered) || 0) : 0, 
            color: "text-base-content", 
            bgColor: "bg-base-200 " 
          },
          { 
            label: "Cells joined", 
            value: cellsRes.status === 'fulfilled' ? (parseInt(cellsRes.value.totalCells) || 0) : 0, 
            color: "text-base-content", 
            bgColor: "bg-base-200 " 
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch statistics:', error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchStats();
  }, [user?.user_id]);

  // Fetch announcements from API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoadingAnnouncements(true);
        const response = await getAllAnnouncements();
        
        // Sort by date (newest first) and take only 5 most recent
        const sortedAnnouncements = (response.announcements || [])
          .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
          .slice(0, 5);
        
        setAnnouncements(sortedAnnouncements);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
        setAnnouncements([]);
      } finally {
        setIsLoadingAnnouncements(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Fetch upcoming events from API
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setIsLoadingEvents(true);
        const response = await getAllEvents();
        
        // Filter events with dates yet to come
        const now = new Date();
        const futureEvents = (response.event || [])
          .filter(event => {
            if (!event.date) return false;
            const eventDate = new Date(event.date);
            return eventDate > now;
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3) // Take only first 3 upcoming events
          .map(event => ({
            id: event.id,
            title: event.title,
            subtitle: event.type === 'workshop' ? 'Workshop' : 
                     event.type === 'conference' ? 'Conference' :
                     event.type === 'hackathon' ? 'Hackathon' :
                     event.type === 'training' ? 'Training' : 'Event',
            date: new Date(event.date).toLocaleDateString('fr-FR', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            }),
            time: event.time_start || '',
            location: event.location || 'To be determined',
            icon: event.type === 'workshop' ? '🎓' :
                  event.type === 'conference' ? '🎤' :
                  event.type === 'hackathon' ? '💻' :
                  event.type === 'training' ? '📚' : '📅',
            image: event.image_url
          }));
        
        setUpcomingEvents(futureEvents);
      } catch (error) {
        console.error('Failed to fetch upcoming events:', error);
        setUpcomingEvents([]);
      } finally {
        setIsLoadingEvents(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  // Fetch QR code from API
  useEffect(() => {
    const fetchQrCode = async () => {
      if (!user?.user_id) {
        setIsLoadingQr(false);
        return;
      }

      try {
        setIsLoadingQr(true);
        const response = await getQrCode(user.user_id);
        setQrCode(response.qrcode); // API returns { message: "...", qrcode: "data:image/png;base64,..." }
      } catch (error) {
        console.error('Failed to fetch QR code:', error);
        setQrCode(null);
      } finally {
        setIsLoadingQr(false);
      }
    };

    fetchQrCode();
  }, [user?.user_id]);

  // Helper function to format announcement date
  const formatAnnouncementDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  // Helper function to download QR code
  const handleDownloadQr = () => {
    if (!qrCode) return;

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `qr-code-${user?.first_name || 'user'}-${user?.last_name || ''}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-3 sm:p-4 md:p-6">
      {/* Overview Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-base-content mb-6">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {overviewStats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-2xl p-4 sm:p-6 border border-base-300`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-base-content ">{stat.label}</span>
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className={`h-1 ${stat.color.replace('text-', 'bg-')} rounded-full w-8`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Code Section */}
      {user && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-base-content mb-6">My QR Code</h2>
          <div className="bg-base-200  rounded-2xl p-4 sm:p-6     shadow-lg">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* QR Code Display */}
              <div className="shrink-0">
                {isLoadingQr ? (
                  <div className="w-48 h-48 bg-base-100 rounded-2xl flex items-center justify-center border-4 border-primary  ">
                    <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
                  </div>
                ) : qrCode ? (
                  <div className="relative group">
                    <div className="w-48 h-48 bg-base-100 rounded-2xl p-4 border-4 border-primary   shadow-lg">
                      <img
                        src={qrCode}
                        alt="QR Code"
                        className="w-full h-full object-contain cursor-pointer"
                        onClick={() => setShowQrModal(true)}
                      />
                    </div>
                    <button
                      onClick={() => setShowQrModal(true)}
                      className="absolute inset-0 bg-black  rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-base-100 rounded-2xl flex items-center justify-center border-4 border-base-300">
                    <div className="text-center p-4">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1-1.968-1-2.732 0L3.732 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-xs text-gray-500">Unavailable</p>
                    </div>
                  </div>
                )}
              </div>

              {/* QR Code Info */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-base-content dark:text-white mb-2">
                  Your Access QR Code
                </h3>
                <p className="text-base-content  mb-4">
                  Present this QR code at the event entrance to confirm your attendance.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-base-content ">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Valid for all events</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-base-content ">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Unique and secure code</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <button
                    onClick={handleDownloadQr}
                    disabled={!qrCode}
                    className="px-6 py-3 bg-primary hover:bg-primary  text-primary-content rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download QR Code
                  </button>
                  <button
                    onClick={() => setShowQrModal(true)}
                    disabled={!qrCode}
                    className="px-6 py-3 bg-base-100 text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-content  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    View Full Size
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Announcements and Events */}
      <div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-base-content">Announcements</h2>
              {announcements.length > 0 && (
                <span className="bg-error text-error-content px-4 py-1.5 rounded-full text-xs font-bold">
                  {announcements.length} NEW
                </span>
              )}
            </div>
            
            {isLoadingAnnouncements ? (
              <div className="bg-base-100 rounded-3xl p-8 shadow-sm border border-base-300 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-base-content ">Loading announcements...</p>
              </div>
            ) : announcements.length > 0 ? (
              <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent -mx-3 sm:mx-0 px-3 sm:px-0">
                {announcements.map((announcement) => (
                  <div 
                    key={announcement.id} 
                    className="bg-base-100 rounded-3xl p-6 sm:p-8 shadow-sm border border-base-300 hover:shadow-lg transition-all duration-300 cursor-pointer shrink-0 w-[90vw] sm:w-full lg:w-[600px] snap-start"
                    onClick={() => announcement.url && window.open(announcement.url, '_blank')}
                  >
                    <div className="flex items-start space-x-3 sm:space-x-6">
                      {/* Icon - Hidden on small devices */}
                      <div className="hidden sm:flex bg-primary  rounded-2xl p-4 items-center justify-center shrink-0">
                        <svg className="w-8 h-8 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-3">
                          {announcement.title}
                        </h3>
                        <p className="text-base-content  leading-relaxed mb-4 text-sm sm:text-base">
                          {announcement.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center text-sm text-base-content ">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Published {formatAnnouncementDate(announcement.published_at)}</span>
                          </div>
                          {announcement.url && (
                            <span className="text-info hover:text-info  text-sm font-medium flex items-center">
                              Learn more
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-base-100 rounded-3xl p-8 shadow-sm border border-base-300 text-center">
                <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-base-content " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-base-content mb-2">No announcements</h3>
                <p className="text-base-content ">There are no announcements at the moment.</p>
              </div>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-base-content">Upcoming Events</h2>
              
            </div>
            
            {isLoadingEvents ? (
              <div className="bg-base-100 rounded-2xl p-8 shadow-sm border border-base-300 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-base-content ">Loading events...</p>
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className="space-y-4 sm:space-y-6">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id} 
                    onClick={() => window.open(`/event/${event.id}`, '_blank')}
                    className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Left side - Event Image */}
                      <div className="w-full lg:w-1/3 relative h-48 lg:h-auto lg:min-h-[280px]">
                        {event.image ? (
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-linear-to-br from-primary  to-secondary  flex items-center justify-center">
                            <div className="text-6xl opacity-80">{event.icon}</div>
                          </div>
                        )}
                      </div>

                      {/* Right side - Event Details */}
                      <div className="w-full lg:w-2/3 p-4 sm:p-6 relative flex flex-col">
                        

                        {/* Event Title and Type */}
                        <div className="pr-4 sm:pr-16 mb-4">
                          <h3 className="text-lg sm:text-xl font-bold text-base-content mb-1 line-clamp-2">
                            {event.title}
                          </h3>
                          <p className="text-base-content  text-sm">
                            {event.subtitle}
                          </p>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 bg-base-200 rounded-full flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-base-content " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4-4a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <div className="text-base sm:text-lg font-bold text-secondary truncate">{event.location}</div>
                            
                          </div>
                        </div>

                        {/* Event Date */}
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-8 h-8 bg-base-200 rounded-full flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-base-content " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <div className="text-base sm:text-lg font-bold text-secondary">
                              {event.date}
                            </div>
                            {event.time && (
                              <div className="text-sm text-base-content ">
                                {event.time.substring(0, 5)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-base-100 rounded-2xl p-8 shadow-sm border border-base-300 text-center">
                <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-base-content " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-base-content mb-2">No upcoming events</h3>
                <p className="text-base-content ">Upcoming events will appear here.</p>
              </div>
            )}
          </div>
        </div>

      {/* QR Code Modal */}
      {showQrModal && qrCode && (
        <div className="fixed inset-0 bg-black  backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-base-100 rounded-2xl max-w-2xl w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-base-content">
                Your Access QR Code
              </h2>
              <button
                onClick={() => setShowQrModal(false)}
                className="p-2 hover:bg-base-200 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-base-content " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* QR Code Image */}
            <div className="flex justify-center mb-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <img
                  src={qrCode}
                  alt="QR Code"
                  className="w-80 h-80 object-contain"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-6">
              <p className="text-lg font-semibold text-base-content mb-1">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-sm text-base-content ">
                {user?.email}
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-primary  rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Instructions
              </h3>
              <ul className="text-sm text-base-content  space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Present this QR code at the entrance of each event</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>The code will be scanned to confirm your attendance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Download it or take a screenshot for offline access</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownloadQr}
                className="flex-1 px-6 py-3 bg-primary hover:bg-primary  text-primary-content rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button
                onClick={() => setShowQrModal(false)}
                className="flex-1 px-6 py-3 bg-base-200 text-base-content rounded-lg font-semibold hover:bg-base-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
  </div>
  );
}