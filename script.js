const values = {
  sliderPresensiScore: document.getElementById('sliderPresensiScore').value,
  sliderTugasScore: document.getElementById('sliderTugasScore').value,
  sliderUTSScore: document.getElementById('sliderUTSScore').value,
  sliderUASScore: document.getElementById('sliderUASScore').value,

  sliderPresensiContract: document.getElementById('sliderPresensiContract').value,
  sliderTugasContract: document.getElementById('sliderTugasContract').value,
  sliderUTSContract: document.getElementById('sliderUTSContract').value,
  sliderUASContract: document.getElementById('sliderUASContract').value,
};

const resultNumber = document.getElementById('resultNumber');
const resultPredicate = document.getElementById('resultPredicate');

document.querySelectorAll('.slider').forEach((slider) => {
  const sliderField = document.querySelector(slider.getAttribute('data-field'));
  slider.addEventListener('input', (e) => {
    sliderField.value = e.target.value;
    values[slider.getAttribute('id')] = e.target.value;

    calculateGrade();
  });

  sliderField.addEventListener('keyup', (e) => {
    slider.value = Number(e.target.value) || 0;
    values[slider.getAttribute('id')] = Math.min(slider.value, 100);

    calculateGrade();
  });
});

function calculateGrade() {
  const finalScore = 
    values['sliderPresensiScore'] * values['sliderPresensiContract'] / 100 +
    values['sliderTugasScore'] * values['sliderTugasContract'] / 100 +
    values['sliderUTSScore'] * values['sliderUTSContract'] / 100 +
    values['sliderUASScore'] * values['sliderUASContract'] / 100;

  resultNumber.innerText = roundDecimal(finalScore);
  resultPredicate.innerText = determineGrade(finalScore);
  resultPredicate.setAttribute('class', determineColor(finalScore));
}

function determineColor(finalScore) {
  if (finalScore >= 75) {
    return 'color-green';
  }

  if (finalScore >= 60) {
    return 'color-yellow';
  }

  return 'color-red';
}

function determineGrade(finalScore) {
  if (finalScore >= 85) {
    return 'A';
  }

  if (finalScore >= 80) {
    return 'A-';
  }

  if (finalScore >= 75) {
    return 'B+';
  }

  if (finalScore >= 70) {
    return 'B';
  }

  if (finalScore >= 65) {
    return 'B-';
  }

  if (finalScore >= 60) {
    return 'C+';
  }

  if (finalScore >= 55) {
    return 'C';
  }

  if (finalScore >= 50) {
    return 'C-';
  }

  if (finalScore >= 45) {
    return 'D';
  }

  return 'E';
}

function roundDecimal(number) {
  return Math.round(number * 100) / 100;
}
