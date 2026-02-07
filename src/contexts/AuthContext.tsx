import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface Admin {
  id?: string;
  username?: string;
  email?: string;
  role?: string;
  lastLogin?: string;
  twoFactorEnabled?: boolean;
}

interface AuthState {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (_username: string, _password: string) => Promise<{ requiresTwoFactor?: boolean; adminId?: string; email?: string }>;
  verify2FA: (_adminId: string, _otp: string) => Promise<void>;
  toggle2FA: (_enable: boolean) => Promise<void>;
  logout: () => void;
  updateProfile: (_data: Partial<Admin>) => Promise<void>;
  changePassword: (_currentPassword: string, _newPassword: string) => Promise<void>;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { admin: Admin; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Admin }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  admin: null,
  token: localStorage.getItem('adminToken'),
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        admin: action.payload.admin,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        admin: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        admin: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        admin: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Verify token validity by fetching profile
      fetch('/api/admin/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Invalid token');
        })
        .then((data) => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { admin: data.admin, token },
          });
        })
        .catch(() => {
          localStorage.removeItem('adminToken');
          dispatch({ type: 'SET_LOADING', payload: false });
        });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (_username: string, _password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: _username, password: _password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const responseData = await response.json();
      
      if (responseData.requiresTwoFactor) {
        return {
          requiresTwoFactor: true,
          adminId: responseData.adminId,
          email: responseData.email
        };
      }

      localStorage.setItem('adminToken', responseData.token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { admin: responseData.admin, token: responseData.token },
      });
      
      return {};
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('adminToken');
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (_profileData: Partial<Admin>): Promise<void> => {
    if (!state.token) throw new Error('Not authenticated');

    const response = await fetch('/api/admin/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify(_profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Profile update failed');
    }

    const updatedProfileData = await response.json();
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: updatedProfileData.admin,
    });
  };

  const changePassword = async (
    _oldPassword: string,
    _newPassword: string
  ): Promise<void> => {
    if (!state.token) throw new Error('Not authenticated');

    const response = await fetch('/api/admin/change-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify({ currentPassword: _oldPassword, newPassword: _newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Password change failed');
    }
  };

  const verify2FA = async (_adminId: string, _otp: string): Promise<void> => {
    const response = await fetch('/api/admin/verify-2fa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ adminId: _adminId, otp: _otp }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '2FA verification failed');
    }

    const responseData = await response.json();
    localStorage.setItem('adminToken', responseData.token);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { admin: responseData.admin, token: responseData.token },
    });
  };

  const toggle2FA = async (_enable: boolean): Promise<void> => {
    if (!state.token) throw new Error('Not authenticated');

    const response = await fetch('/api/admin/toggle-2fa', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify({ enable: _enable }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '2FA toggle failed');
    }

    const responseData = await response.json();
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: { ...state.admin, twoFactorEnabled: responseData.twoFactorEnabled },
    });
  };

  const value: AuthContextType = {
    ...state,
    login,
    verify2FA,
    toggle2FA,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
