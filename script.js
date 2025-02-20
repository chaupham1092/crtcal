// Add event listeners to Calculate buttons
document.getElementById('calculateCTRBtn').addEventListener('click', calculateCTR);
document.getElementById('calculateClicksBtn').addEventListener('click', calculateClicks);
document.getElementById('calculateImpressionsBtn').addEventListener('click', calculateImpressions);


// Helper functions for formatting
function formatCurrency(value) {
  return value ? '$' + parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '';
}

function formatNumber(value) {
  return value ? parseInt(value).toLocaleString() : '';
}

function formatPercentage(value) {
  return value ? parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%' : '';
}

function removeFormatting(value) {
  return value.replace(/[^0-9.]/g, ''); // Remove all non-numeric characters except the decimal
}

// Event Handlers
function handleFocus(event) {
  const input = event.target;
  input.value = removeFormatting(input.value);
}

function handleBlur(event) {
  const input = event.target;
  const value = removeFormatting(input.value);

  if (['clicks', 'impressions', 'impressionsForClicks', 'clicksForImpressions'].includes(input.id)) {
    input.value = value ? formatNumber(value) : '';
  } else if (['ctrForClicks', 'ctrForImpressions', 'ctr'].includes(input.id)) {
    input.value = value ? formatPercentage(value) : '';
  }
}

// Add event listeners to all inputs
document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('focus', handleFocus);
  input.addEventListener('blur', handleBlur);
});

// Calculator Functions
function calculateCTR() {
  const clicks = parseFloat(removeFormatting(document.getElementById('clicks').value)) || 0;
  const impressions = parseFloat(removeFormatting(document.getElementById('impressions').value)) || 0;

  if (impressions > 0) {
    const ctr = (clicks / impressions) * 100;
    document.getElementById('ctr').value = formatPercentage(ctr);
    document.getElementById('ctrResultText').textContent = `Your CTR is ${ctr.toFixed(2)}%`;
  } else {
    document.getElementById('ctr').value = '';
    document.getElementById('ctrResultText').textContent = 'Your CTR is ...';
  }
}

function calculateClicks() {
  const ctr = parseFloat(removeFormatting(document.getElementById('ctrForClicks').value)) || 0;
  const impressions = parseFloat(removeFormatting(document.getElementById('impressionsForClicks').value)) || 0;

  const clicks = (ctr / 100) * impressions;
  document.getElementById('clicksResult').value = clicks ? formatNumber(clicks.toFixed(0)) : '';
  document.getElementById('clicksResultText').textContent = clicks
    ? `Your Total Clicks is ${clicks.toFixed(0)}`
    : 'Your Total Clicks is ...';
}

function calculateImpressions() {
  const clicks = parseFloat(removeFormatting(document.getElementById('clicksForImpressions').value)) || 0;
  const ctr = parseFloat(removeFormatting(document.getElementById('ctrForImpressions').value)) || 0;

  const impressions = clicks / (ctr / 100);
  document.getElementById('impressionsResult').value = impressions ? formatNumber(impressions.toFixed(0)) : '';
  document.getElementById('impressionsResultText').textContent = impressions
    ? `Your Total Impressions is ${impressions.toFixed(0)}`
    : 'Your Total Impressions is ...';
}

// Reset Individual Calculators
document.getElementById('resetCTRBtn').addEventListener('click', () => {
  document.getElementById('clicks').value = '';
  document.getElementById('impressions').value = '';
  document.getElementById('ctr').value = '';
  document.getElementById('ctrResultText').textContent = 'Your CTR is ...';
});

document.getElementById('resetClicksBtn').addEventListener('click', () => {
  document.getElementById('ctrForClicks').value = '';
  document.getElementById('impressionsForClicks').value = '';
  document.getElementById('clicksResult').value = '';
  document.getElementById('clicksResultText').textContent = 'Your Total Clicks is ...';
});

document.getElementById('resetImpressionsBtn').addEventListener('click', () => {
  document.getElementById('clicksForImpressions').value = '';
  document.getElementById('ctrForImpressions').value = '';
  document.getElementById('impressionsResult').value = '';
  document.getElementById('impressionsResultText').textContent = 'Your Total Impressions is ...';
});

// Reset All Calculators
document.getElementById('resetAllBtn').addEventListener('click', () => {
  document.querySelectorAll('input').forEach((input) => {
    input.value = '';
  });

  document.getElementById('ctrResultText').textContent = 'Your CTR is ...';
  document.getElementById('clicksResultText').textContent = 'Your Total Clicks is ...';
  document.getElementById('impressionsResultText').textContent = 'Your Total Impressions is ...';
});

// Add input listeners for live calculations
document.getElementById('clicks').addEventListener('input', calculateCTR);
document.getElementById('impressions').addEventListener('input', calculateCTR);
document.getElementById('ctrForClicks').addEventListener('input', calculateClicks);
document.getElementById('impressionsForClicks').addEventListener('input', calculateClicks);
document.getElementById('clicksForImpressions').addEventListener('input', calculateImpressions);
document.getElementById('ctrForImpressions').addEventListener('input', calculateImpressions);
