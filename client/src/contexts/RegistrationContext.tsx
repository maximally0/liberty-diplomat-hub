import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface RegistrationContextType {
  currentUser: User | null;
  registrations: Registration[];
  saveUser: (userData: User) => void;
  addRegistration: (registration: Registration) => void;
  getUserRegistration: (munId: string) => Registration | null;
  getAllRegistrations: () => Registration[];
  getUserRegistrations: () => Registration[];
  updateRegistrationStatus: (registrationId: string, status: string, reason?: string) => void;
  assignCountry: (registrationId: string, country: string) => void;
  withdrawRegistration: (registrationId: string) => void;
  recordPayment: (registrationId: string, amount: number) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: ReactNode }) {
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
    return registrations.find(r => r.userId === currentUser.id && r.munId === munId) || null;
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

  return (
    <RegistrationContext.Provider
      value={{
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
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
}
