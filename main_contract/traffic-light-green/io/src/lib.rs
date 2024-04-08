
#![no_std]
use gstd::{ prelude::*, ActorId };
use gmeta::{InOut,Metadata};


#[derive(Encode, Decode, TypeInfo, Hash, PartialEq, PartialOrd, Eq, Ord, Clone, Copy, Debug)]
pub enum ActionMessage{
    Message1,
    Message2,
    Message3
}

#[derive(Encode, Decode, TypeInfo, Hash, PartialEq, PartialOrd, Eq, Ord, Clone, Copy, Debug)]
pub enum EventMessage {
     Response1,
     Response2,
     Response3
}


pub struct ContractMetadata;


impl Metadata for ContractMetadata{
     type Init = ();
     // type Handle = InOut<ActionTrafficLight,EventTrafficLight>;
     // argego esto
     type Handle = InOut<ActionMessage, EventMessage>;
     type Others = ();
     type Reply=();
     type Signal = ();
     type State = Vec<(ActorId, String)>;

}