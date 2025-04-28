// src/services/socketService.ts
import { io, Socket } from "socket.io-client";
import config from "../config";

class SocketService {
  private socket: Socket | null = null;

  constructor() { 
    this.connect(); // Automatically connect when the service is instantiated
  }
  connect(): void {
    console.log("Attempting to connect");
    if (this.socket) {
      console.log("Already connected to socket. Skipping connection.");
      
      return; // Prevent duplicate connections
    }
    this.socket = io(`${config.SOCKET_URL}`, {
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
      transports: ["websocket", "polling"],
    });

    // this.socket.onAny((event, ...args) => {
    //   console.log(`Socket event: ${event}`, args);
    // });

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Socket connected!", this.socket?.id);
      this.requestFriendsWithStatuses(); // Request friends' statuses on connect
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    this.socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      if (reason === "io server disconnect") {
        this.reconnect();
      }
    });

    this.socket.on("new_message", (messageData) => {
      console.log("New message received:", messageData);
      // Handle the message (e.g., update UI, notify user)
    });

 
  }

  on(event: string, callback: (...args: any[]) => void): void {
    if (!this.socket) return;
    this.socket.on(event, callback);
  }

  off(event: string, callback?: (...args: any[]) => void): void {
    if (!this.socket) return;
    this.socket.off(event, callback);
  }

  emit(event: string, ...args: any[]): void {
    if (!this.socket) {
      console.warn("Socket not connected. Attempting to connect...");
      this.connect();
      return;
    }
    this.socket.emit(event, ...args);
  }

  sendPrivateMessage(receiverId: string, text: string): void {
    this.emit("send_message", { receiverId, text });
  }

  requestFriendsWithStatuses(): void {
    this.emit("requestFriendsListWithStatuses");
  }

  reconnect(): void {
    console.log("Attempting to reconnect...");
    this.disconnect();
    this.connect();
  }

  disconnect(): void {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket = null;
    console.log("Socket disconnected manually");
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
export default socketService;
