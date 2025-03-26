// src/index.ts
import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { join } from "node:path";
var protoPath = loadSync(join(import.meta.dirname, "keymapp.proto"));
var packageDefinition = loadPackageDefinition(protoPath);

class Client {
  socket;
  service;
  constructor(socket) {
    this.socket = socket;
    this.service = new packageDefinition.api.KeyboardService(socket, credentials.createInsecure());
  }
  GetStatus = () => new Promise((resolve, reject) => {
    this.service.GetStatus({}, (error, data) => {
      if (error)
        reject(error);
      resolve(data);
    });
  });
  GetKeyboards = () => new Promise((resolve, reject) => {
    this.service.GetKeyboards({}, (error, data) => {
      if (error)
        reject(error);
      resolve(data.keyboards);
    });
  });
  ConnectKeyboard = (id) => new Promise((resolve, reject) => {
    this.service.ConnectKeyboard({ id }, (error, data) => {
      if (error)
        reject(error);
      resolve(data.success);
    });
  });
  ConnectAnyKeyboard = () => new Promise((resolve, reject) => {
    this.service.ConnectAnyKeyboard({}, (error, data) => {
      if (error)
        reject(error);
      resolve(data.success);
    });
  });
  DisconnectKeyboard = () => new Promise((resolve, reject) => {
    this.service.DisconnectKeyboard({}, (error, data) => {
      if (error)
        reject(error);
      resolve(data.success);
    });
  });
  SetLayer = (layer) => new Promise((resolve, reject) => {
    this.service.SetLayer({ layer }, (error, data) => {
      if (error)
        reject(error);
      resolve(data.success);
    });
  });
  UnSetLayer = () => new Promise((resolve, reject) => {
    this.service.SetLayer({ layer: 0 }, (error, data) => {
      if (error)
        reject(error);
      resolve(data.success);
    });
  });
  SetRGBAll = (color, sustain) => new Promise((resolve, reject) => {
    const rgb = Bun.color(color, "[rgb]");
    if (!rgb)
      throw new Error("Color not valid");
    this.service.SetRGBAll({ red: rgb[0], green: rgb[1], blue: rgb[2], sustain }, (error, data) => {
      if (error)
        reject(error);
      resolve(data.success);
    });
  });
  SetRGBLed = (led, color, sustain) => new Promise((resolve, reject) => {
    const rgb = Bun.color(color, "[rgb]");
    if (!rgb)
      throw new Error("Color not valid");
    this.service.SetRGBLed({ led, red: rgb[0], green: rgb[1], blue: rgb[2], sustain }, (error, data) => {
      if (error)
        reject(error);
      resolve(data.success);
    });
  });
  SetStatusLed = (led, on, sustain) => new Promise((resolve, reject) => {
    this.service.SetStatusLed({ led, on, sustain }, (error, data) => {
      if (error)
        reject(error);
      resolve(data.success);
    });
  });
}
export {
  Client
};
