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
    return 'Select at least one character type.';
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