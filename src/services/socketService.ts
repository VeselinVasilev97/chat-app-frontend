// src/services/socketService.ts
import { io, Socket } from 'socket.io-client';
import config from '../config';

class SocketService {
  private socket: Socket | null = null;

  connect(): void {
    console.log('Attempting to connect to:', config.SOCKET_URL);
    if (this.socket) {    
      console.warn('Socket already connected');
      return; // Prevent duplicate connections
    }
    // Create socket connection with withCredentials set to true
    // This ensures cookies are sent with the connection request
    this.socket = io(`${config.SOCKET_URL}`, {
      withCredentials: true, // Enable sending cookies with the request
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket', 'polling'] // Try both transport methods
    });

    // Debug all socket events
    this.socket.onAny((event, ...args) => {
      console.log(`Socket event: ${event}`, args);
    });

    // Setup event listeners
    this.setupEventListeners();
  }

  // Setup default event handlers
  private setupEventListeners(): void {
    if (!this.socket) return;
    this.socket.on('connect', () => {
      console.log('Socket connected!', this.socket?.id);
    });
    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      console.error('Error details:', {
        message: error.message,
        description: (error as any).description, // Cast to 'any' if 'description' is custom
        context: (error as any).context || 'No context available'
      });
    });
    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      
      // Reconnect if the server closed the connection
      if (reason === 'io server disconnect') {
        this.reconnect();
      }
    });
    // Add listener for new messages
    this.socket.on('new_message', (messageData) => {
      console.log('New message received:', messageData);
      // Handle the message (e.g., update UI, notify user)
    });
  }
  // Add a listener for a specific event
  on(event: string, callback: (...args: any[]) => void): void {
    if (!this.socket) return;
    this.socket.on(event, callback);
  }
  // Remove a listener for a specific event
  off(event: string, callback?: (...args: any[]) => void): void {
    if (!this.socket) return;
    this.socket.off(event, callback);
  }
  // Emit an event to the server
  emit(event: string, ...args: any[]): void {
    if (!this.socket) {
      console.warn('Socket not connected. Attempting to connect...');
      this.connect();
      // You might want to queue the event and retry after connection
      return;
    }
    this.socket.emit(event, ...args);
  }
  sendPrivateMessage(receiverId: string, text: string): void {
    this.emit('send_message', { receiverId, text });
  }
  reconnect(): void {
    console.log('Attempting to reconnect...');
    this.disconnect();
    this.connect();
  }
  disconnect(): void {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket = null;
    console.log('Socket disconnected manually');
  }
  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
export default socketService;