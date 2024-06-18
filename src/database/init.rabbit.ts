'use strict';

import amqp, { Channel, Connection } from 'amqplib';
const { RABBITMQ_URL } = process.env;

class RabbitMQ {
  static instance: RabbitMQ;
  connection: Connection;
  channel: Channel;

  private constructor() {}

  async connect() {
    try {
      this.connection = await amqp.connect(RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  closeConnection() {
    try {
      setTimeout(() => {
        this.connection.close();
        process.exit(0);
      }, 500);
    } catch (error) {
      console.log('Error closing RabbitMQ connection', error);
      throw error;
    }
  }

  static async getInstance(): Promise<RabbitMQ> {
    if (!RabbitMQ.instance) {
      RabbitMQ.instance = new RabbitMQ();
      await RabbitMQ.instance.connect();
    }
    return RabbitMQ.instance;
  }
}

export { RabbitMQ };
