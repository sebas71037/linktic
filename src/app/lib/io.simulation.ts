import { SocketSimulation } from "./socket.simulation";

/**
 * Simulate a socket connection
 */
export const io = (url: string, options?: any): SocketSimulation => {
    const socket = new SocketSimulation();
    return socket;
};