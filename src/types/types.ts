// src/types/index.ts

export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    status?: 'online' | 'offline' | 'away';
    lastSeen?: Date;
  }
  
  export interface Message {
    id: string;
    content: string;
    senderId: string;
    receiverId?: string;
    roomId?: string;
    timestamp: Date;
    read: boolean;
  }
  
  export interface Room {
    id: string;
    name?: string;
    participants: string[];
    type: 'direct' | 'group';
    lastMessage?: Message;
    createdAt: Date;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }