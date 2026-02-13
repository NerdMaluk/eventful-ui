import  { useState, useEffect } from 'react';
import { Bell } from 'lucide-react'; 
import { notificationApi } from '../api/notification.api'; 

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);


 useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      try {
        const data = await notificationApi.getAll();
        if (isMounted) {
          setNotifications(data);
        }
      } catch (error) {
        console.error("Erro ao carregar notificações:", error);
      }
    };
    fetchItems();

    const interval = setInterval(fetchItems, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []); 

  
  const handleToggle = async () => {
    const wasOpen = isOpen;
    setIsOpen(!wasOpen);

    
    const hasUnread = notifications.some(n => !n.read);
    
    if (!wasOpen && hasUnread) {
      try {
        await notificationApi.markAllAsRead();
        setNotifications(prev => 
          prev.map(n => ({ ...n, read: true }))
        );
      } catch (error) {
        console.error("Erro ao marcar notificações como lidas:", error);
      }
    }
  };
  const unreadCount = notifications.filter(n => !n.read).length;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
    if (isOpen && !(event.target as Element).closest('.notification-bell-container')) {
      setIsOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [isOpen]);
  return (
    <div className="notification-bell-container">
      <button onClick={handleToggle} className="bell-button" title="Notifications">
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="badge">{unreadCount}</span>
        )}
      </button>
      {isOpen && (
        <div className="notification-dropdown">
          <div className="dropdown-header">
            Notifications
          </div>
          
          <div className="dropdown-body">
            {notifications.length === 0 ? (
              <div className="empty-state">
                No notifications yet. 📭
              </div>
            ) : (
              notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={`notification-item ${n.read ? 'read' : 'unread'}`}
                >
                  <strong>{n.title}</strong>
                  <p>{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};