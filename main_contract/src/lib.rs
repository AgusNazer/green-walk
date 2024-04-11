
#![no_std]
use gstd::{async_main, msg, exec, prelude::*, ActorId};
use io::*;
use gstd::collections::HashMap;


#[cfg(feature = "binary-vendor")]
include!(concat!(env!("OUT_DIR"), "/wasm_binary.rs"));


// 1. Create the main state as a static variable.
static mut STATE:Option<GreendlyMainState> = None;

// 1.1 Create the init state.
static mut INIT:Option<InitFT> = None;

static mut ADDRESSFT:Option<InitFT> = None;

// Estado principal para el contrato de Gaia
#[derive(Clone, Default)]
pub struct GreendlyMainState {
    pub runners: HashMap<ActorId,Vec<Runner>>,
    pub transactions: HashMap<ActorId,Vec<Data>>,
   
}



// 2. Create the mutability function for your state.
fn state_mut() -> &'static mut GreendlyMainState {

    let state = unsafe { STATE.as_mut()};

    unsafe { state.unwrap_unchecked() }


}

fn addresft_state_mut() -> &'static mut InitFT {


    let addressft = unsafe { ADDRESSFT.as_mut()};

    unsafe { addressft.unwrap_unchecked() }


}


// Create a implementation on State
impl GreendlyMainState {
     // Esta función agregaria liquidez de tokens al contrato principal para posteriormente transferirla a los generadores
     async fn add_liquidity( &mut self, amount: u128){


        // Esta variable tiene la dirección del token fungible
        let address_ft = addresft_state_mut();

        // Esta payload será la acción que se mandará al token fungible.
        let payload = FTAction::Mint(amount);

        // Esta linea manda el mensaje para el cual se espera como respuesta el evento.
            
        let result =  msg::send_for_reply_as::<_, FTEvent>(address_ft.ft_program_id,payload,0,0).expect("Error in sending a message").await;
       

       // Ejemplo de como manejar errores y eventos
        let _ = match result {
            Ok(event) => match event {
                FTEvent::Ok => Ok(()),
                _ => Err(()),
            },
            Err(_) => Err(()),
        };
    }


        // Esta función removeria liquidez de tokens al contrato principal.
        #[allow(dead_code)]
        async fn remove_liquidity(&mut self, amount_tokens: u128){
    
            let address_ft = addresft_state_mut();           
            let payload = FTAction::Burn(amount_tokens);     
            let result =  msg::send_for_reply_as::<_, FTEvent>(address_ft.ft_program_id,payload,0,0).expect("Error in sending a message").await;
           
            let _ = match result {
                Ok(event) => match event {
                    FTEvent::Ok => Ok(()),
                    _ => Err(()),
                },
                Err(_) => Err(()),
            };
        }

        // Esta función transfiere tokens del contrato a los generadores de energia
    #[allow(dead_code)]
    async fn transfer_tokens_to_runners(&mut self, amount_tokens: u128) {

        let address_ft = addresft_state_mut();           
        let payload = FTAction::Transfer{from: exec::program_id(), to: msg::source() ,amount: amount_tokens};
        let _ = msg::send(address_ft.ft_program_id, payload, 0);
        
    }
}


// 3. Create the init() function of your contract.
#[no_mangle]
extern "C" fn init () {

    let config: InitFT = msg::load().expect("Unable to decode InitStruct");

    if config.ft_program_id.is_zero() {
        panic!("InitStruct program address can't be 0");
    }

    let initft = InitFT {
        ft_program_id: config.ft_program_id
    };


    let state = GreendlyMainState {
        ..Default::default()
    };

    if config.ft_program_id.is_zero() {
        panic!("FT program address can't be 0");
    }
    
    unsafe {
        ADDRESSFT = Some(initft);
    }


    unsafe { STATE = Some(state) };


}


// 4.Create the main() function of your contract.
#[async_main]
async fn main(){

        // We load the input message
        let action: Action = msg::load().expect("Could not load Action");

        // We receive an action from the user and update the state. Example:
        match &action {
            Action::Addiquidity(amount) => {
                let state = state_mut();
        
                // Accede al vector asociado a la clave msg::source() en el HashMap runners
                let runners_entry = state.runners.entry(msg::source()).or_insert(Vec::new());
        
        
                // Llama al método add_liquidity
                state.add_liquidity(*amount).await;
            }

            Action::Removeliquidity(amount) => {
                let state = state_mut();         
                // Llama al método add_liquidity
                state.remove_liquidity(*amount).await;
            }


            Action::Register(user, runner) => {
                let greendlystate = state_mut();
        
                // Accede al vector asociado a la clave msg::source() en el HashMap runners
                let runners_entry = greendlystate.runners.entry(msg::source()).or_insert(Vec::new());
        
                // Agrega un nuevo Runner al vector
                runners_entry.push(Runner {
                    id: runner.id.clone(),
                    name: runner.name.clone(),
                    surname: runner.surname.clone(),
                    // Asegúrate de actualizar aquí también si el campo age es necesario
                    age: runner.age,
                    country: runner.country.clone(),
                    city: runner.city.clone(),
                });
        
                msg::reply(Events::Register("Registered Runner".to_string()), 0)
                    .expect("failed to encode or reply from `state()`");
            }
            Action::Claim(actor, data, amount) => {
                let greendlystate = state_mut();
        
                // Accede al vector asociado a la clave msg::source() en el HashMap transactions
                let transactions_entry = greendlystate.transactions.entry(msg::source()).or_insert(Vec::new());
        
                // Agrega un nuevo Data al vector
                transactions_entry.push(Data {
                    id: data.id.clone(),
                    name: data.name.clone(),
                    km_travelled: data.km_travelled,
                    time: data.time,
                    city: data.city.clone(),
                    date: data.date.clone(),
                });
                
        
                // Llama al método transfer_tokens_to_runners
                greendlystate.transfer_tokens_to_runners(*amount).await;
        
                msg::reply(Events::Claim("Transaction Completed".to_string()), 0)
                    .expect("failed to encode or reply from `state()`");
            }
        };
    }


    impl From<GreendlyMainState> for IoGreendlyState {
        fn from(value: GreendlyMainState) -> Self {
    
    // Esta parte desestructura el contenido de GaiaEcotrackMainState
        let GreendlyMainState {
            runners,
            transactions
        } = value;
    
    // Aquí se genera el cambio de HashMap a Vector para evitar problemas de compilación por el tipo HashMap.
    // Nota: Es necesario convertir todos los Hashmaps a vectores
        let runners = runners .iter()
        .flat_map(|(k, v)| v.iter().map(move |runners| (k.clone(), runners.clone())))
        .collect();
    
        let transactions = transactions
    .iter()
    .flat_map(|(k, v)| v.iter().map(move |transactions| (k.clone(), transactions.clone())))
    .collect();

       
    
    // Se devuelve un tipo IoGaiaEcotrack
    // Nota: Este es una copia de GaiaEcotrackMainState pero con vectores en lugar de Hashmaps.
        Self {
            runners,
            transactions
        }
    
    }
    }

#[derive(Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct InitFT {
   
    pub ft_program_id: ActorId,
}

        


// 5. Create the state() function of your contract.
#[no_mangle]
extern "C" fn state() {
     
    let state = unsafe { STATE.take().expect("Unexpected error in state") };
    msg::reply::<IoGreendlyState>(state.into(), 0)
    .expect("Failed to encode`");
}