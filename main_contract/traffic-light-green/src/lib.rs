
#![no_std]
use gstd::{errors::Result, msg , prelude::*,ActorId};
use gmeta::{Metadata};
use hashbrown::HashMap;
use io::*;


// agregar esta linea manualmente
#[cfg(feature = "binary-vendor")]
include!(concat!(env!("OUT_DIR"), "/wasm_binary.rs"));



static mut STATE:Option<HashMap<ActorId, String>> = None;



fn state_mut() -> &'static mut HashMap<ActorId,String> { // &' es para delegar la propiedad , es decir para pasar el valor de una variable a otra.

    let state = unsafe { STATE.as_mut()};

    unsafe { state.unwrap_unchecked() }


}


#[no_mangle]
extern "C" fn init () {

   unsafe { STATE = Some(HashMap::new())}


}

#[no_mangle]
extern "C" fn handle(){


    handle_state().expect("Execution Error")


}

    

fn handle_state() -> Result<()> {
    let payload = msg::load()?;

    match payload {
        ActionMessage::Message1 => {
            let current_state = state_mut();
            current_state.insert(msg::source(), "Mensaje 1 procesado".to_string());
            msg::reply(EventMessage::Response1, 0)?;
        },
        ActionMessage::Message2 => {
            let current_state = state_mut();
            current_state.insert(msg::source(), "Mensaje 2 procesado".to_string());
            msg::reply(EventMessage::Response2, 0)?;
        },
        ActionMessage::Message3 => {
            let current_state = state_mut();
            current_state.insert(msg::source(), "Mensaje 3 procesado".to_string());
            msg::reply(EventMessage::Response3, 0)?;
        },
    }

    Ok(())
}



    #[no_mangle]
    extern "C" fn state() {
        let state: <ContractMetadata as Metadata>::State =
            state_mut().iter().map(|(k, v)| (*k, v.clone())).collect();
    
        msg::reply(state, 0).expect("failed to encode or reply from `state()`");
    }
