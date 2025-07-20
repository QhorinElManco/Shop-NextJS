/* eslint-disable no-console */
import mongoose from 'mongoose';
import { envVariables } from '@/utils';

let isConnected = false;

export const connect = async () => {
  if (isConnected) return;

  try {
    if (mongoose.connections.length > 0) {
      const connectionState = mongoose.connections[0].readyState;
      if (connectionState === 1) {
        isConnected = true;
        return;
      }
    }

    await mongoose.connect(envVariables.getMongoUrl() || '');
    isConnected = true;
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    throw error;
  }
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') return;

  // Solo desconectamos si no estamos en proceso de build
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PHASE) {
    try {
      await mongoose.disconnect();
      isConnected = false;
      console.log('Desconectado de MongoDB');
    } catch (error) {
      console.error('Error al desconectar de MongoDB:', error);
    }
  }
};
