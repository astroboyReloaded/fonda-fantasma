const icon = document.querySelector('.drop-downIcon_svg');
const svg = document.querySelector('.drop-downIcon_path');
document
  .getElementById('openAddress_form')
  .addEventListener('click', function () {
    console.log('CalcDelivery_Btn clicked');
    const addressInputsContainer = document.getElementById(
      'addressInputsContainer',
    );
    switch (addressInputsContainer.style.display === 'none') {
      case true:
        addressInputsContainer.style.display = 'flex';
        svg.classList.remove('closed');
        svg.classList.add('open');
        icon.classList.remove('closed');
        icon.classList.add('open');
        break;
      case false:
        addressInputsContainer.style.display = 'none';
        svg.classList.add('closed');
        svg.classList.remove('open');
        icon.classList.remove('open');
        icon.classList.add('closed');
        break;
    }
  });
