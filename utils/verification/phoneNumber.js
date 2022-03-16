export function isValidPhoneNumber(identifier){
    identifier = identifier.replace(/\n/g, '');
    identifier = identifier.replace(/ /g, '');

    if(identifier.startsWith('+216')) identifier = identifier.substr(4);

    if(identifier.length !== 8) return [false, ""];
    
    return [true, identifier];
}

export function isPhoneNumber(identifier){
    identifier = identifier.replace(/\n/g, '');
    identifier = identifier.replace(/ /g, '');

    if(identifier.startsWith('+216')) identifier = identifier.substr(4);

    return identifier.search(new RegExp('^[0-9]{1,}$')) !== -1; // Just digits
}