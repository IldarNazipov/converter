const state = {
  isChecked: false,
  isFee: true,
};

const calculateRateKzt = (bhtInput, usdThbRate, usdKztRate, kztRubRate) => {
  let bhtWithCommision;
  if (state.isFee) {
    bhtWithCommision =
      bhtInput <= 30000
        ? bhtInput + 220
        : bhtInput + Math.ceil(bhtInput / 30000) * 220;
  } else {
    bhtWithCommision = bhtInput;
  }
  const bhtInUsd = bhtWithCommision / usdThbRate;
  const usdInKzt = usdKztRate * bhtInUsd;
  const kztInRub = usdInKzt / kztRubRate;
  const result = kztInRub / bhtInput;
  return result.toFixed(2);
};

const calculateRateRub = (bhtInput, usdThbRate, usdRubRate) => {
  let bhtWithCommision;
  if (state.isFee) {
    bhtWithCommision =
      bhtInput <= 30000
        ? bhtInput + 220
        : bhtInput + Math.ceil(bhtInput / 30000) * 220;
  } else {
    bhtWithCommision = bhtInput;
  }
  const bhtInUsd = bhtWithCommision / usdThbRate;
  const usdInRub = usdRubRate * bhtInUsd;
  const result = usdInRub / bhtInput;
  return result.toFixed(2);
};

const form = document.getElementById('conversionForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const bhtInput = Number(formData.get('bhtInput'));
  const usdThbRate = Number(formData.get('usdThbRate'));
  const usdRubRate = Number(formData.get('usdRubRate'));
  const usdKztRate = Number(formData.get('usdKztRate'));
  const kztRubRate = Number(formData.get('kztRubRate'));
  const result = state.isChecked
    ? calculateRateKzt(bhtInput, usdThbRate, usdKztRate, kztRubRate)
    : calculateRateRub(bhtInput, usdThbRate, usdRubRate);
  const h2 = document.querySelector('#result');
  h2.textContent = `Курс бата к рублю: ${result}`;
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
            <label for="bhtInput">Требуемая сумма (в THB):</label>
            <input type="number" step="0.01" class="form-control" id="bhtInput" name="bhtInput" required>
      </div>
      <div class="form-group">
            <label for="usdThbRate">Курс THB > USD (<a target="_blank" href="https://www.visa.co.th/en_TH/support/consumer/travel-support/exchange-rate-calculator.html">Visa</a>):</label>
            <input type="number" step="0.01" class="form-control" id="usdThbRate" name="usdThbRate" required>
      </div>
      <div class="form-group">
            <label for="usdKztRate">Курс KZT > USD (<a target="_blank" href="https://t.me/KZrobot">БЦК</a>):</label>
            <input type="number" step="0.01" class="form-control" id="usdKztRate" name="usdKztRate" required>
      </div>
      <div class="form-group">
            <label for="kztRubRate">Курс KZT > RUB (<a target="_blank" href="https://www.finsend.io">finsend</a>):</label>
            <input type="number" step="0.01" class="form-control" id="kztRubRate" name="kztRubRate" required>
      </div>
      <button type="submit" class="btn btn-primary mt-4 mb-4">Рассчитать</button>
      <h2 id="result"></h2>
      `;
  } else {
    state.isChecked = false;
    form.innerHTML = `
      <div class="form-group">
            <label for="bhtInput">Требуемая сумма (в THB):</label>
            <input type="number" step="0.01" class="form-control" id="bhtInput" name="bhtInput" required>
      </div>
      <div class="form-group">
            <label for="usdThbRate">Курс THB > USD (<a href="https://usa.visa.com/support/consumer/travel-support/exchange-rate-calculator.html">Visa</a>):</label>
            <input type="number" step="0.01" class="form-control" id="usdThbRate" name="usdThbRate" required>
      </div>
      <div class="form-group">
            <label for="usdRubRate">Курс RUB > USD (<a target="_blank" href="https://t.me/KZrobot">БЦК</a>):</label>
            <input type="number" step="0.01" class="form-control" id="usdRubRate" name="usdRubRate" required>
      </div>
      <button type="submit" class="btn btn-primary mt-4 mb-4">Рассчитать</button>
      <h2 id="result"></h2>
      `;
  }
});
