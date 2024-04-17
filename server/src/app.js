// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes.js'
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const userActivity = require('./routes/userActivity.js')
// test de firebase jwt
// require('./services/firebaseAdminConfig.js');
const jwtTestRoute = require('./routes/jwtTestRoute.js')
const {GearApi , ProgramMetadata , decodeAddress, GearKeyring} = require('@gear-js/api')





dotenv.config();

const app = express();
app.use(express.json());



// Conexión a la base de datos
const mongoDb= process.env.MONGODB_URI;
if (!mongoDb) {
  console.error('La variable MONGODB_URI no está definida en las variables de entorno.');
  process.exit(1); // Detiene la ejecución del programa
}
mongoose.connect(mongoDb)
  .then(() => console.log('Connection with MongoDB success'))
  .catch((err) => console.error(err));

  // Rutas
app.use('/users', userRoutes);
app.use('/activities', userActivity)
// test jwt firebase
app.use('/verifyToken', jwtTestRoute);

app.use((req, res, next) => {
  console.log(`Recibida solicitud: ${req.method} ${req.url}`);
  next();
});


app.get('/', (req, res) => {
  res.send('Hello World from green steps server!');
});

app.get('/hola',async (req,res)=>{
  const gearApi = await GearApi.create({ providerAddress: 'wss://testnet.vara-network.io' });
  const programIDFT =
  "0xc470a22d79d90991a3b45d381c7cd863bd4f883364bdff49819fe775eb518375";

// Add your metadata.txt
const meta ="0002000100000000000104000000010b0000000000000000010c0000002d1654000808696f18496e69744654000004013466745f70726f6772616d5f696404011c4163746f72496400000410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004000801205b75383b2033325d000008000003200000000c000c0000050300100808696f48416374696f6e4761696145636f747261636b00011c304e657747656e657261746f72080004011c4163746f724964000014012447656e657261746f720000003847656e6572617465456e6572677904001801107531323800010028476574526577617264730400180110753132380002002c5472616e736665727265640c0004011c4163746f724964000004011c4163746f72496400001801107531323800030018526577617264100004011c4163746f724964000004011c4163746f72496400001801107531323800001c01405472616e73616374696f6e73496e666f000400244e65774465766963650800200118537472696e67000024012c44657669636573496e666f000500485472616e73616374696f6e505f74776f5f50080004011c4163746f724964000028013c5472616e73616374696f6e7350325000060000140808696f2447656e657261746f72000014010869641801107531323800011877616c6c657404011c4163746f72496400013c746f74616c5f67656e65726174656418011075313238000138617665726167655f656e657267791801107531323800011c726577617264731801107531323800001800000507001c0808696f405472616e73616374696f6e73496e666f00000c0108746f04011c4163746f724964000118616d6f756e74180110753132380001086b77180110753132380000200000050200240808696f2c44657669636573496e666f00001001086964180110753132380001106e616d65200118537472696e6700012c747970655f656e65726779200118537472696e6700011873657269616c200118537472696e670000280808696f3c5472616e73616374696f6e73503250000014011066726f6d200118537472696e67000108746f200118537472696e670001086b771801107531323800011064617465200118537472696e6700011476616c75651801107531323800002c0808696f484576656e74734761696145636f747261636b00011c28526567697374657265640000002447656e657261746564000100405265776172647347656e65726174656400020044546f6b656e735472616e736665727265640c011066726f6d04011c4163746f724964000108746f04011c4163746f724964000118616d6f756e74180110753132380003001c436c61696d65640c0108746f04011c4163746f724964000118616d6f756e74180110753132380001086b77180110753132380004003844657669636552656769737465720400200118537472696e670005003c5472616e73616374696f6e735032500400200118537472696e6700060000300808696f38496f4761696145636f747261636b00001c0158746f74616c5f656e657267795f67656e6572617465641801107531323800012c746f74616c5f757365727318011075313238000140746f74616c5f67656e657261746f72731801107531323800012867656e657261746f72733401645665633c284163746f7249642c2047656e657261746f72293e00011c646576696365733c01685665633c28537472696e672c2044657669636573496e666f293e0001307472616e73616374696f6e734401805665633c284163746f7249642c205472616e73616374696f6e73496e666f293e0001407032705f7472616e73616374696f6e734c017c5665633c284163746f7249642c205472616e73616374696f6e73503250293e000034000002380038000004080414003c000002400040000004082024004400000248004800000408041c004c00000250005000000408042800"
const metadata = ProgramMetadata.from(meta);

const message= {
  destination: programIDFT, // programId
  payload: {
    generateenergy: 1,
  },
  gasLimit: 9999819245,
  value: 0,
};

async function signer() {
    // Create a message extrinsic
    const transferExtrinsic = await gearApi.message.send(message, metadata);
    const keyring = await GearKeyring.fromSuri("//Bob");

    await transferExtrinsic.signAndSend(keyring, (event) => {
      console.log(event);

      try {
        alert.success("Successful transaction");
      } catch (error) {
        alert.error("Error");
      }
    });

}
try {
  await signer()
  console.log("se firmo correctamente");
  res.send("bien hecho")
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}



})


module.exports = app;
