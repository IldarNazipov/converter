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
  const result = kztInRub / curInput;
  return result.toFixed(2);
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
  const result = usdInRub / curInput;
  return result.toFixed(2);
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
  const h2 = document.querySelector('#result');
  h2.textContent = `Курс к рублю: ${result}`;
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
  if (e.target.checked) {
    state.isChecked = true;
    form.innerHTML = `
      <div class="form-group">
            <label for="bhtInput">Требуемая сумма (в третьей валюте):</label>
            <input type="number" step="0.01" placeholder="0.00" class="form-control" id="bhtInput" name="bhtInput" required>
      </div>
      <div class="form-group">
            <label for="usdThbRate">Курс USD к третьей валюте (<a target="_blank" href="https://www.visa.co.th/en_TH/support/consumer/travel-support/exchange-rate-calculator.html">Visa</a>):</label>
            <input type="number" step="0.01" placeholder="0.00" class="form-control" id="usdThbRate" name="usdThbRate" required>
      </div>
      <div class="form-group">
            <label for="usdKztRate">Курс USD к KZT (<a target="_blank" href="https://t.me/KZrobot">БЦК</a>):</label>
            <input type="number" step="0.01" placeholder="0.00" class="form-control" id="usdKztRate" name="usdKztRate" required>
      </div>
      <div class="form-group">
            <label for="kztRubRate">Курс RUB к KZT (<a target="_blank" href="https://www.finsend.io">finsend</a>):</label>
            <input type="number" step="0.01" placeholder="0.00" class="form-control" id="kztRubRate" name="kztRubRate" required>
      </div>
      <button type="submit" class="btn btn-primary mt-4 mb-4">Рассчитать</button>
      <h2 id="result"></h2>
      `;
  } else {
    state.isChecked = false;
    form.innerHTML = `
      <div class="form-group">
            <label for="bhtInput">Требуемая сумма (в третьей валюте):</label>
            <input type="number" step="0.01" placeholder="0.00" class="form-control" id="bhtInput" name="bhtInput" required>
      </div>
      <div class="form-group">
            <label for="usdThbRate">Курс USD к третьей валюте (<a href="https://usa.visa.com/support/consumer/travel-support/exchange-rate-calculator.html">Visa</a>):</label>
            <input type="number" step="0.01" placeholder="0.00" class="form-control" id="usdThbRate" name="usdThbRate" required>
      </div>
      <div class="form-group">
            <label for="usdRubRate">Курс USD к RUB (<a target="_blank" href="https://t.me/KZrobot">БЦК</a>):</label>
            <input type="number" step="0.01" placeholder="0.00" class="form-control" id="usdRubRate" name="usdRubRate" required>
      </div>
      <button type="submit" class="btn btn-primary mt-4 mb-4">Рассчитать</button>
      <h2 id="result"></h2>
      `;
  }
});
