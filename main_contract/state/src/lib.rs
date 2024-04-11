
#![no_std]

use io::*;
use gmeta::{ Metadata, metawasm};
use gstd::{ ActorId, prelude::*};


#[cfg(feature = "binary-vendor")]
include!(concat!(env!("OUT_DIR"), "/wasm_binary.rs"));

#[metawasm]
pub mod metafns {
    pub type State = <ContractMetadata as Metadata>::State;


    // Add your State functions
    pub fn get_state(state: State) -> io::IoGreendlyState {
        let (_, io_greendly_state) = state;
        io_greendly_state 
    }



}