// Quantity buttons functionality
document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', function () {
        const input = this.parentNode.querySelector('.quantity-input');
        input.value = parseInt(input.value) + 1;
    });
});

document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', function () {
        const input = this.parentNode.querySelector('.quantity-input');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    });
});

// OTP Verification Flow
const sendOtpBtn = document.getElementById('sendOtpBtn');
const otpField = document.getElementById('otpField');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
const addressContainer = document.getElementById('addressContainer');
const resendOtp = document.getElementById('resendOtp');
const changeNumber = document.getElementById('changeNumber');
const mobileNumber = document.getElementById('mobileNumber');
const otpTimer = document.getElementById('otpTimer');

sendOtpBtn.addEventListener('click', function () {
    const phoneNumber = mobileNumber.value;
    if (phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)) {
        // Show OTP field and verify button
        otpField.classList.remove('hidden');
        verifyOtpBtn.classList.remove('hidden');
        sendOtpBtn.classList.add('hidden');

        // Start timer (2 minutes)
        let timeLeft = 120;
        const timer = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            otpTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                otpTimer.textContent = "Expired";
            }
        }, 1000);

        // Set the mobile number in address form
        document.getElementById('addressPhone').value = phoneNumber;

        // Mock OTP (in real app, this would be sent to the user's phone)
        console.log(`Mock OTP sent to ${phoneNumber}: 1234`);
    } else {
        alert('Please enter a valid 10-digit mobile number');
    }
});

verifyOtpBtn.addEventListener('click', function () {
    const otp = document.getElementById('otp').value;
    if (otp === '1234') { // Mock verification
        addressContainer.classList.remove('hidden');
        document.getElementById('mobileVerificationSection').classList.add('hidden');
    } else {
        alert('Invalid OTP. Please try again.');
    }
});

resendOtp.addEventListener('click', function (e) {
    e.preventDefault();
    // Resend OTP logic would go here
    alert('OTP resent to your mobile number');
});

changeNumber.addEventListener('click', function (e) {
    e.preventDefault();
    otpField.classList.add('hidden');
    verifyOtpBtn.classList.add('hidden');
    sendOtpBtn.classList.remove('hidden');
    mobileNumber.value = '';
});

// Address selection
document.querySelectorAll('.address-card').forEach(card => {
    card.addEventListener('click', function () {
        document.querySelectorAll('.address-card').forEach(c => {
            c.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

// Add new address toggle
document.getElementById('addNewAddress').addEventListener('click', function () {
    this.classList.add('hidden');
    document.getElementById('newAddressForm').classList.remove('hidden');
});

document.getElementById('cancelNewAddress').addEventListener('click', function () {
    document.getElementById('newAddressForm').classList.add('hidden');
    document.getElementById('addNewAddress').classList.remove('hidden');
});

// Save new address (mock functionality)
document.getElementById('saveNewAddress').addEventListener('click', function () {
    alert('New address saved successfully!');
    document.getElementById('newAddressForm').classList.add('hidden');
    document.getElementById('addNewAddress').classList.remove('hidden');
    // In a real app, you would add the new address to the saved addresses list
});

// Proceed to checkout button
document.getElementById('proceedToCheckout').addEventListener('click', function () {
    if (!addressContainer.classList.contains('hidden')) {
        const selectedAddress = document.querySelector('.address-card.selected');
        if (selectedAddress) {
            // In a real app, this would redirect to the checkout page with the selected address
            alert('Proceeding to checkout with address:\n' +
                selectedAddress.querySelector('.address-details').innerText.replace(/\n/g, ', '));
        } else {
            alert('Please select a delivery address');
        }
    } else {
        alert('Please complete mobile number verification first');
    }
});