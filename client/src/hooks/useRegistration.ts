import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

interface Registration {
  id: string;
  userId: string;
  munId: string;
  status: string;
  [key: string]: any;
}

export function useRegistration() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    const storedRegistrations = localStorage.getItem('registrations');
    if (storedRegistrations) {
      setRegistrations(JSON.parse(storedRegistrations));
    }
  }, []);

  const saveUser = (userData: User) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const addRegistration = (registration: Registration) => {
    const newRegistrations = [...registrations, registration];
    setRegistrations(newRegistrations);
    localStorage.setItem('registrations', JSON.stringify(newRegistrations));
  };

  const getUserRegistration = (munId: string) => {
    if (!currentUser) return null;
    return registrations.find(r => r.userId === currentUser.id && r.munId === munId);
  };

  return {
    currentUser,
    registrations,
    saveUser,
    addRegistration,
    getUserRegistration,
  };
}
