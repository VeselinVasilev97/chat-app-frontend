// src/services/socketService.ts
import { io, Socket } from "socket.io-client";
import config from "../config";
import { Message } from "../types/types";



class SocketService {
  private socket: Socket | null = null;
  
  connect(): void {
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

    this.setupEventListeners();
  }
  private handleNewMessage(message: Message): void {
    // console.log("Here should be the logic for adding new messages to global STATE", message);

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

    this.socket.on("new_message", (messageData: Message) => {
      this.handleNewMessage(messageData); 
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
      return;
    }
    this.socket.emit(event, ...args);
  }

  sendPrivateMessage(
    sender_id: string,
    receiver_id: string,
    content: string
  ): void {
    const message: Message = {
      message_id: Math.random().toString(36).substring(2, 15),
      sender_id,
      receiver_id,
      content,
      sent_at: new Date().toISOString(),
    };
    this.emit("send_message", message);
    this.handleNewMessage(message);
  }
  requestFriendsWithStatuses(): void {
    this.emit("requestFriendsListWithStatuses");
  }
  reconnect(): void {
    console.log("Attempting to reconnect...");
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
