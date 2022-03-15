export function isValidEmail(email){
    if(email.search('@') < 1){
        return false;
    }
    return true;
}