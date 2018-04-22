export class Address {
    stree : String
    suite : String;
    city : String;
    zipcode : String;
}
export class User {
    id : Number;
    name : String;
    email : String;
    phone : Number;
    address = new Address();
}

