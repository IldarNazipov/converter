const state = {
  isKzt: false,
  isFee: false,
};

const calculateRate = (curInput, usdCurRate, usdRate, kztRubRate, outputCurrency, feeSum) => {
  let curWithCommision;
  if (state.isFee) {
    curWithCommision = curInput + feeSum; 
  } else {
    curWithCommision = curInput;
  }
  const curInUsd = curWithCommision / usdCurRate;

  const usdInOutputCurrency = usdRate * curInUsd;
  let result;
  if (outputCurrency === 'kzt') {
    const kztInRub = usdInOutputCurrency / kztRubRate;
    result = kztInRub;
  } else if (outputCurrency === 'rub') {
    result = usdInOutputCurrency;
  } else {
    throw new Error('Invalid output currency');
  }

  return result;
};

const form = document.getElementById('conversionForm');
const select = document.getElementById('select-addon');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const curInput = Number(formData.get('curInput'));
  const usdCurRate = Number(formData.get('usdCurRate'));
  const usdRubRate = Number(formData.get('usdRubRate'));
  const usdKztRate = Number(formData.get('usdKztRate'));
  const kztRubRate = Number(formData.get('kztRubRate'));
  const feeInput = Number(formData.get('feeInput'));
  const feeSum = select.value === 'sum' ? feeInput : feeInput * curInput / 100;
  const result = state.isKzt
    ? calculateRate(curInput, usdCurRate, usdKztRate, kztRubRate, 'kzt', feeSum)
    : calculateRate(curInput, usdCurRate, usdRubRate, kztRubRate, 'rub', feeSum);
  const rateResultEl = document.querySelector('#result');
  rateResultEl.textContent = `Курс к рублю: ${(result / curInput).toFixed(2)}`;
  const sumResultEl = document.querySelector('#result-2');
  sumResultEl.textContent = `Сумма в рублях: ${result.toFixed(2)}`;
});

const feeCheckbox = document.getElementById('feeCheckbox');
feeCheckbox.addEventListener('change', (e) => {
  const feeDiv = document.querySelector('.fee');
  const feeInput = document.getElementById('feeInput');
  if (e.target.checked) {
    state.isFee = true;
    feeDiv.style.display = 'flex';
    feeInput.setAttribute('required', '');
  } else {
    state.isFee = false;
    feeDiv.style.display = 'none';
    feeInput.removeAttribute('required');
  }
});

const kztCheckbox = document.getElementById('kztCheckbox');
kztCheckbox.addEventListener('change', (e) => {
  const usdRubDiv = document.querySelector('.usd-rub');
  const usdRubInput = document.getElementById('usdRubRate');
  const usdKztDiv = document.querySelector('.usd-kzt');
  const usdKztInput = document.getElementById('usdKztRate');
  const kztRubDiv = document.querySelector('.kzt-rub');
  const kztRubInput = document.getElementById('kztRubRate');
  if (e.target.checked) {
    state.isKzt = true;
    usdRubDiv.style.display = 'none';
    usdRubInput.removeAttribute('required');
    usdKztDiv.style.display = 'block';
    usdKztInput.setAttribute('required', '');
    kztRubDiv.style.display = 'block';
    kztRubInput.setAttribute('required', '');
  } else {
    state.isKzt = false;
    usdRubDiv.style.display = 'block';
    usdRubInput.setAttribute('required', '');
    usdKztDiv.style.display = 'none';
    usdKztInput.removeAttribute('required');
    kztRubDiv.style.display = 'none';
    kztRubInput.removeAttribute('required');
  }
});
