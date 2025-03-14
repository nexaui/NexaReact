import { Network } from "NexaUI";

// Contoh penggunaan API v4
const exampleV4 = async () => {
  const response = await Network({
    type: "v4",
    path: "exsampel/index",
  }).post("/", {
    id: "sa121212121sas",
    title: "ssssaaaaaaaaaaaaaaaaaassqqqqqqqso",
    deskripsi: "framework v4.0.212",
  });
  return response;
};

// Contoh penggunaan API v1
const exampleV1 = async () => {
  const response = await Network({
    type: "v1",
    credensial: "your-api-key-here",
  }).post("/users", {
    username: "john_doe",
    email: "john@example.com",
  });
  return response;
};

// Contoh penggunaan API v2 (memerlukan secret)
const exampleV2 = async () => {
  const response = await Network({
    type: "v2",
    credensial: "your-api-key-here",
    secret: "your-api-secret-here",
  }).post("/data", {
    key: "value",
    timestamp: Date.now(),
  });
  return response;
};

// Contoh penggunaan method GET
const exampleGet = async () => {
  // V1
  const v1Data = await Network({
    type: "v1",
    credensial: "your-api-key-here",
  }).get("/users/123");

  // V2
  const v2Data = await Network({
    type: "v2",
    credensial: "your-api-key-here",
    secret: "your-api-secret-here",
  }).get("/data", { filter: "active" });

  return { v1Data, v2Data };
};

// Contoh penggunaan method PUT
const examplePut = async () => {
  // V1
  const v1Update = await Network({
    type: "v1",
    credensial: "your-api-key-here",
  }).put("/users/123", {
    username: "updated_username",
  });

  // V2
  const v2Update = await Network({
    type: "v2",
    credensial: "your-api-key-here",
    secret: "your-api-secret-here",
  }).put("/data/456", {
    status: "updated",
  });

  return { v1Update, v2Update };
};

// Contoh penggunaan method DELETE
const exampleDelete = async () => {
  // V1
  const v1Delete = await Network({
    type: "v1",
    credensial: "your-api-key-here",
  }).delete("/users/123");

  // V2
  const v2Delete = await Network({
    type: "v2",
    credensial: "your-api-key-here",
    secret: "your-api-secret-here",
  }).delete("/data/456");

  return { v1Delete, v2Delete };
};

export {
  exampleV4,
  exampleV1,
  exampleV2,
  exampleGet,
  examplePut,
  exampleDelete,
};
