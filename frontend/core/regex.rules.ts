export const priceRegex = '^[0-9]{1,3}(,[0-9]{1,2})*(\\.[0-9]{1,2})?$';
export const priceError = 'Kwota powinna być w przedziale: od 0.00 do 999.99.';

export const mediaRegex = '^[0-9]{1,4}$';
export const mediaError = 'Zużycie powinno być w przedziale: od 0 do 9999.';

export const zipCodeRegex = '^[0-9]{2}-[0-9]{3}$';
export const zipCodeError = 'Niepoprawny format kodu pocztowego.';
