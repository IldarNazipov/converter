const state = {
  isKzt: false,
  isFee: true,
};

const calculateRateKzt = (curInput, usdCurRate, usdKztRate, kztRubRate) => {
  let curWithCommision;
  if (state.isFee) {
    curWithCommision =
      curInput <= 30000
        ? curInput + 220
        : curInput + Math.ceil(curInput / 30000) * 220;
  } else {
    curWithCommision = curInput;
  }
  const curInUsd = curWithCommision / usdCurRate;
  const usdInKzt = usdKztRate * curInUsd;
  const kztInRub = usdInKzt / kztRubRate;
  const result = kztInRub;
  return result;
};

const calculateRateRub = (curInput, usdCurRate, usdRubRate) => {
  let curWithCommision;
  if (state.isFee) {
    curWithCommision =
      curInput <= 30000
        ? curInput + 220
        : curInput + Math.ceil(curInput / 30000) * 220;
  } else {
    curWithCommision = curInput;
  }
  const curInUsd = curWithCommision / usdCurRate;
  const usdInRub = usdRubRate * curInUsd;
  const result = usdInRub;
  return result;
};

const form = document.getElementById('conversionForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const curInput = Number(formData.get('curInput'));
  const usdCurRate = Number(formData.get('usdCurRate'));
  const usdRubRate = Number(formData.get('usdRubRate'));
  const usdKztRate = Number(formData.get('usdKztRate'));
  const kztRubRate = Number(formData.get('kztRubRate'));
  const result = state.isChecked
    ? calculateRateKzt(curInput, usdCurRate, usdKztRate, kztRubRate)
    : calculateRateRub(curInput, usdCurRate, usdRubRate);
  const h2rate = document.querySelector('#result');
  h2rate.textContent = `Курс к рублю: ${(result / curInput).toFixed(2)}`;
  const h2sum = document.querySelector('#result-2');
  h2sum.textContent = `Сумма в рублях: ${result.toFixed(2)}`;
});

const feeCheckbox = document.getElementById('feeCheckbox');
feeCheckbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    state.isFee = true;
  } else {
    state.isFee = false;
  }
});

const checkbox = document.getElementById('kztCheckbox');
checkbox.addEventListener('change', (e) => {
  const usdRubDiv = document.querySelector('.usd-rub');
  const usdRubInput = document.getElementById('usdRubRate');
  const usdKztDiv = document.querySelector('.usd-kzt');
  const usdKztInput = document.getElementById('usdKztRate');
  const kztRubDiv = document.querySelector('.kzt-rub');
  const kztRubInput = document.getElementById('kztRubRate');
  if (e.target.checked) {
    state.isChecked = true;
    usdRubDiv.style.display = 'none';
    usdRubInput.removeAttribute('required');
    usdKztDiv.style.display = 'block';
    usdKztInput.setAttribute('required', '');
    kztRubDiv.style.display = 'block';
    kztRubInput.setAttribute('required', '');
  } else {
    state.isChecked = false;
    usdRubDiv.style.display = 'block';
    usdRubInput.setAttribute('required', '');
    usdKztDiv.style.display = 'none';
    usdKztInput.removeAttribute('required');
    kztRubDiv.style.display = 'none';
    kztRubInput.removeAttribute('required');
  }
});
