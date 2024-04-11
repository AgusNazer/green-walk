
#![no_std]
use gstd::{ prelude::*, ActorId };
use gmeta::{In,Out,InOut,Metadata};



// 1. Create your own Actions
#[derive(Encode, Decode, TypeInfo)]
pub enum Action { 
    // Add Actions
    Addiquidity(u128),
    Removeliquidity(u128),
    Register(ActorId,Runner),
    Claim(ActorId,Data,u128),
    
}




// 2. Create your own Events
#[derive(Debug, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum  Events {
    // Add Events(Example)
    Register(String),
    Claim(String),
}


// 3. Create your own Struct
#[derive(Default, Encode, Decode, Clone, TypeInfo)]
pub struct IoGreendlyState {
    pub runners: Vec<(ActorId, Runner)>,
    pub transactions: Vec<(ActorId, Data)>,
   
}

//Struct of runners
#[derive(Default, Clone, Encode, Decode, TypeInfo)]
pub struct Runner {
    pub id: String,
    pub name: String,
    pub surname: String,
    pub age:u128,
    pub country:String,
    pub city:String,
}

//Data for validate
#[derive(Default, Clone, Encode, Decode, TypeInfo)]
pub struct Data {
    pub id: String,
    pub name: String,
    pub km_travelled:u128,
    pub time:u128,
    pub city:String,
    pub date:String,
}



#[derive(Debug, Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum FTAction {
    Mint(u128),
    Burn(u128),
    Transfer {
        from: ActorId,
        to: ActorId,
        amount: u128,
    },
    Approve {
        to: ActorId,
        amount: u128,
    },
    TotalSupply,
    BalanceOf(ActorId),
}

// Este Enum define las eventos del token fungible a controlar
#[derive(Encode, Decode, TypeInfo)]
pub enum FTEvent {
    Transfer {
        from: ActorId,
        to: ActorId,
        amount: u128,
    },
    Approve {
        from: ActorId,
        to: ActorId,
        amount: u128,
    },
    Ok,
    Err,
    Balance(u128),
    PermitId(u128),
}

// Esta  estructura es para el inicio del programa: usualmente vincularemos el token fungible u otros contratos al arranque del programa.
#[derive(Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct InitFT {

    // Este será el program id del token fungible a controlar
    pub ft_program_id: ActorId,
}



pub struct ContractMetadata;

// 5. Define the structure of actions, events and state for your metadata.
impl Metadata for ContractMetadata{
     type Init = In<InitFT>;
     type Handle = InOut<Action,Events>;
     type Others = ();
     type Reply=();
     type Signal = ();
     type State = Out<IoGreendlyState>;

}