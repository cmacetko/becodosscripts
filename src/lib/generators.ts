// CPF generation logic
function randomDigit() {
  return Math.floor(Math.random() * 10);
}

function calculateVerifierDigit(digits: number[]): number {
  let sum = 0;
  let multiplier = digits.length + 1;
  for (const digit of digits) {
    sum += digit * multiplier;
    multiplier--;
  }
  const remainder = sum % 11;
  const digit = remainder < 2 ? 0 : 11 - remainder;
  return digit;
}

export function generateCpf(withPunctuation = true): string {
  const baseDigits = Array.from({ length: 9 }, randomDigit);
  const firstVerifier = calculateVerifierDigit(baseDigits);
  const secondVerifier = calculateVerifierDigit([...baseDigits, firstVerifier]);
  const cpfArray = [...baseDigits, firstVerifier, secondVerifier];
  const cpfString = cpfArray.join('');

  if (withPunctuation) {
    return cpfString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  return cpfString;
}

// CNPJ generation logic
export function generateCnpj(withPunctuation = true): string {
    const baseDigits = Array.from({ length: 8 }, randomDigit);
    const branchDigits = [0, 0, 0, 1];
    const firstPart = [...baseDigits, ...branchDigits];

    const calculateCnpjVerifier = (digits: number[]): number => {
        let sum = 0;
        let multiplier = 2;
        for (let i = digits.length - 1; i >= 0; i--) {
            sum += digits[i] * multiplier;
            multiplier++;
            if (multiplier > 9) {
                multiplier = 2;
            }
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstVerifier = calculateCnpjVerifier(firstPart);
    const secondVerifier = calculateCnpjVerifier([...firstPart, firstVerifier]);

    const cnpjArray = [...firstPart, firstVerifier, secondVerifier];
    const cnpjString = cnpjArray.join('');

    if (withPunctuation) {
        return cnpjString.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return cnpjString;
}


// Password generation logic
const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export function generatePassword(options: PasswordOptions): string {
  const { length, uppercase, lowercase, numbers, symbols } = options;
  let charset = '';
  let password = '';
  
  const selectedSets = [];

  if (uppercase) {
    charset += CHAR_SETS.uppercase;
    selectedSets.push(CHAR_SETS.uppercase);
  }
  if (lowercase) {
    charset += CHAR_SETS.lowercase;
    selectedSets.push(CHAR_SETS.lowercase);
  }
  if (numbers) {
    charset += CHAR_SETS.numbers;
    selectedSets.push(CHAR_SETS.numbers);
  }
  if (symbols) {
    charset += CHAR_SETS.symbols;
    selectedSets.push(CHAR_SETS.symbols);
  }

  if (charset === '') {
    return ''; // Retorna string vazia se nenhum tipo de caractere for selecionado
  }
  
  for (const set of selectedSets) {
      password += set[Math.floor(Math.random() * set.length)];
  }

  const remainingLength = length - password.length;
  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password.split('').sort(() => 0.5 - Math.random()).join('');
}

// Credit Card generation logic
function luhnCheck(cardNumber: string): boolean {
  let sum = 0;
  let double = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);
    if (double) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    double = !double;
  }
  return (sum % 10) === 0;
}

function generatePartialNumber(prefix: string, totalLength: number): string {
  let partial = prefix;
  while (partial.length < totalLength - 1) { // -1 for the Luhn check digit
    partial += Math.floor(Math.random() * 10);
  }
  return partial;
}

function generateValidCardNumber(prefix: string, totalLength: number): string {
  let partial = generatePartialNumber(prefix, totalLength);
  let checkDigit = 0;
  for (let i = 0; i < 10; i++) { // Iterate through possible check digits (0-9)
    const tempCard = partial + i;
    if (luhnCheck(tempCard)) {
      checkDigit = i;
      break;
    }
  }
  return partial + checkDigit;
}

interface CreditCardBrand {
  name: string;
  prefixes: string[];
  lengths: number[];
}

const CREDIT_CARD_BRANDS: CreditCardBrand[] = [
  { name: "Visa", prefixes: ["4"], lengths: [16] },
  { name: "Mastercard", prefixes: ["51", "52", "53", "54", "55"], lengths: [16] },
  { name: "American Express", prefixes: ["34", "37"], lengths: [15] },
  { name: "Discover", prefixes: ["6011", "644", "645", "646", "647", "648", "649", "65"], lengths: [16] },
  { name: "Diners Club", prefixes: ["300", "301", "302", "303", "304", "305", "36", "38", "39"], lengths: [14, 16] },
  { name: "JCB", prefixes: ["3528", "3529", "353", "354", "355", "356", "357", "358"], lengths: [16] },
];

export function generateCreditCard(brandName: string): string {
  const brand = CREDIT_CARD_BRANDS.find(b => b.name.toLowerCase() === brandName.toLowerCase());
  if (!brand) {
    console.warn(`Brand "${brandName}" not found. Cannot generate card.`);
    return "";
  }

  const prefix = brand.prefixes[Math.floor(Math.random() * brand.prefixes.length)];
  const length = brand.lengths[Math.floor(Math.random() * brand.lengths.length)];

  return generateValidCardNumber(prefix, length);
}

export function getAllCreditCardBrands(): CreditCardBrand[] {
  return CREDIT_CARD_BRANDS;
}