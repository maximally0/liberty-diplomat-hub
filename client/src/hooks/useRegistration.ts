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

  const getAllRegistrations = () => {
    return registrations;
  };

  const getUserRegistrations = () => {
    if (!currentUser) return [];
    return registrations.filter(r => r.userId === currentUser.id);
  };

  const updateRegistrationStatus = (registrationId: string, status: string, reason?: string) => {
    const updatedRegistrations = registrations.map(r => {
      if (r.id === registrationId) {
        return {
          ...r,
          status,
          rejectionReason: reason || r.rejectionReason,
          updatedAt: new Date().toISOString(),
        };
      }
      return r;
    });
    setRegistrations(updatedRegistrations);
    localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
  };

  const assignCountry = (registrationId: string, country: string) => {
    const updatedRegistrations = registrations.map(r => {
      if (r.id === registrationId) {
        return {
          ...r,
          assignedCountry: country,
          updatedAt: new Date().toISOString(),
        };
      }
      return r;
    });
    setRegistrations(updatedRegistrations);
    localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
  };

  const withdrawRegistration = (registrationId: string) => {
    updateRegistrationStatus(registrationId, 'withdrawn');
  };

  const recordPayment = (registrationId: string, amount: number) => {
    const updatedRegistrations = registrations.map(r => {
      if (r.id === registrationId) {
        const newAmountPaid = (r.amountPaid || 0) + amount;
        return {
          ...r,
          amountPaid: newAmountPaid,
          status: newAmountPaid >= r.amountDue ? 'confirmed' : r.status,
          updatedAt: new Date().toISOString(),
        };
      }
      return r;
    });
    setRegistrations(updatedRegistrations);
    localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
  };

  return {
    currentUser,
    registrations,
    saveUser,
    addRegistration,
    getUserRegistration,
    getAllRegistrations,
    getUserRegistrations,
    updateRegistrationStatus,
    assignCountry,
    withdrawRegistration,
    recordPayment,
  };
}
