const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
// const userActivity = require('./routes/userActivity.js')
// const updateProfile = require('./routes/userRoutes.js')
// test de firebase jwt
// require('./services/firebaseAdminConfig.js');
// const jwtTestRoute = require('./routes/jwtTestRoute.js')
const {GearApi , ProgramMetadata , GearKeyring , decodeAddress,encodeAddress} = require('@gear-js/api')
const bodyParser = require('body-parser');





dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());





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




app.use((req, res, next) => {
  console.log(`Recibida solicitud: ${req.method} ${req.url}`);
  next();
});


app.get('/', (req, res) => {
  res.send('Hello World from green steps server!');
});

app.post('/register',async (req,res)=>{
  const gearApi = await GearApi.create({ providerAddress: 'wss://testnet.vara-network.io' });
  const programIDFT = process.env.CONTRACT_ID
  const { id,name,surname,age,country,city , addresLocal } = req.body;
  console.log('Cuerpo de la solicitud:', addresLocal);

// Add your metadata.txt
const meta = process.env.META
const metadata = ProgramMetadata.from(meta);

const message= {
  destination: programIDFT, // programId
  payload: {
    register: [
      decodeAddress(addresLocal),
      {
        id:id,
        name:name,
        surname:surname,
        age:age,
        country:country,
        city:city
      }
    ],
  },
  gasLimit: 9999819245,
  value: 0,
};

async function signer() {
    // Create a message extrinsic
    const transferExtrinsic = await gearApi.message.send(message, metadata);
    const mnemonic = 'sun pill sentence spoil ripple october funny ensure illness equal car demise';
    const { seed } = GearKeyring.generateSeed(mnemonic);
  
    const keyring = await GearKeyring.fromSeed(seed, 'admin');

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
  console.log(accountTo);
  res.status(500).send('Internal Server Error');
}



})


app.post('/claim',async (req,res)=>{
  const gearApi = await GearApi.create({ providerAddress: 'wss://testnet.vara-network.io' });
  const programIDFT = process.env.CONTRACT_ID
  const { id,name,km_travelled,time,date,city , addresLocal, tokens } = req.body;
  console.log('Cuerpo de la solicitud:', addresLocal);

// Add your metadata.txt
const meta = process.env.META
const metadata = ProgramMetadata.from(meta);

const message= {
  destination: programIDFT, // programId
  payload: {
    claim: [
      decodeAddress(addresLocal),
      {
        id:id,
        name:name,
        km_travelled:km_travelled,
        time:time,
        city:city,
        date:date
      },
      tokens
    ],
  },
  gasLimit: 9999819245,
  value: 0,
};

async function signer() {
    // Create a message extrinsic
    const transferExtrinsic = await gearApi.message.send(message, metadata);
    const mnemonic = 'sun pill sentence spoil ripple october funny ensure illness equal car demise';
    const { seed } = GearKeyring.generateSeed(mnemonic);
  
    const keyring = await GearKeyring.fromSeed(seed, 'admin');

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
  res.send("se firmo correctamente")
} catch (error) {
  console.error(error);
  console.log(accountTo);
  res.status(500).send('Internal Server Error');
}



})

app.get('/balance/:id', async (req, res) => {
  const wallet = req.params.id;
  try {
    const gearApi = await GearApi.create({ providerAddress: 'wss://testnet.vara-network.io' });
    let balance = 0;
    let fullState = {};


  const programIDFT = process.env.TOKEN_ID
  const meta = process.env.META_TOKEN

    const metadata = ProgramMetadata.from(meta);
  
    const getBalance = () => {
      if (gearApi) {
        gearApi.programState
          .read({ programId: programIDFT, payload: "" }, metadata)
          .then((result) => {
            fullState = result.toJSON();
            console.log(fullState);
            
            const Localbalances = fullState.balances || [];
            Localbalances.some(([address, balances]) => {
              if (encodeAddress(address) === wallet) {
                balance = balances;
                return true;
              }
              return false;
            });
            // Respond with the balance
            res.json({ balance });
          })
          .catch(({ message }) => console.log(message));
      }
    };

    // Call the function to get balance
    getBalance();

    // Respond with the balance
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});



module.exports = app;
