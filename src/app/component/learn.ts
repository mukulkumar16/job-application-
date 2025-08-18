let x : boolean | string | string[] = "uwehuih";

let y : number =98943;

let s : 20 | 10 | "string" = "string"

let numStrArr : (number | string)[] = [1,3,5,"string"];

let tuple : [string ,string , string] = ["string" , "string" , "string"];


type userobj = {
    name : string,
    age : number,
    college? : string 
}


const obj : {
    name : string,
    age : number,
    college? : string 

} = {
    name : "mukul",
    age : 20
}


obj.address = "somewhere"  // it will works but this will thrown an error at build time 

const obj2 : userobj = {
    name : "mukul",
    age : 20
}


type user = {
    name : string,
    age : number,
    college? : string 

}

type student = {
    rollNo : number
}

type studentUser = user & student


const Student : studentUser ={
    name : "mukul",
    age : 20,
    college : "MIT",
    rollNo : 30
}
